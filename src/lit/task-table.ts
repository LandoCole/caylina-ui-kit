import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { TableColumn, TableGroup, TableRow, TableSort } from './table.js';

/* ── Public type definitions ── */

export interface TaskTableColumn {
  key: string;
  heading: string;
  type?: 'text' | 'bold-text' | 'badge' | 'editable' | 'editable-select';
  width?: string;
  sortable?: boolean;
  /** Defaults to true — set false to opt out */
  filterable?: boolean;
  badgeMap?: Record<string, string>;
  options?: { value: string; label: string }[];
  editPlaceholder?: string;
}

export interface TaskTableRow {
  id: string;
  children?: TaskTableRow[];
  [key: string]: unknown;
}

export interface TaskTableGroup {
  id: string;
  label: string;
  color?: string;
  rows: TaskTableRow[];
}

/* ── Component ── */

@customElement('ca-task-table')
export class CaTaskTable extends LitElement {
  static styles = css`
    :host { display: block; }

    .filter-btn-inner {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .filter-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      border-radius: 9px;
      background: var(--ca-primary);
      color: #fff;
      font-size: 11px;
      font-weight: 600;
      line-height: 1;
    }

    .filter-modal-body {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-height: 60vh;
      overflow-y: auto;
      padding: 4px 0;
    }

    .filter-column-section h4 {
      margin: 0 0 8px;
      font-size: 13px;
      font-weight: 600;
      color: var(--ca-text-primary);
    }

    .filter-checkboxes {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .filter-modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding-top: 12px;
      border-top: 1px solid var(--ca-border);
    }
  `;

  @property({ type: Array }) columns: TaskTableColumn[] = [];
  @property({ type: Array }) groups: TaskTableGroup[] = [];
  @property({ type: String }) heading = '';
  @property({ type: String, attribute: 'supporting-text' }) supportingText = '';
  @property({ type: Boolean }) draggable = true;
  @property({ type: Boolean }) expandable = true;
  @property({ type: Boolean, attribute: 'inline-add' }) inlineAdd = true;
  @property({ type: Boolean, attribute: 'clickable-rows' }) clickableRows = true;
  @property({ type: Boolean }) selectable = false;

  @state() private _expandedIds: string[] = [];
  @state() private _filterModalOpen = false;
  @state() private _activeFilters: Record<string, string[]> = {};
  @state() private _sort: TableSort | undefined = undefined;

  /* ── Map TaskTableColumn[] → TableColumn[] (filterable always false — we handle filtering via modal) ── */
  private get _tableColumns(): TableColumn[] {
    return this.columns.map((col) => ({
      ...col,
      filterable: false,
    }));
  }

  /* ── Collect all rows (including children) across all groups ── */
  private get _allRows(): TaskTableRow[] {
    const rows: TaskTableRow[] = [];
    for (const g of this.groups) {
      for (const r of g.rows) {
        rows.push(r);
        if (r.children) rows.push(...r.children);
      }
    }
    return rows;
  }

  /* ── Get unique values for a column across all data ── */
  private _uniqueValuesForColumn(key: string): string[] {
    const vals = new Set<string>();
    for (const row of this._allRows) {
      const v = row[key];
      if (v != null && v !== '') vals.add(String(v));
    }
    return [...vals].sort();
  }

  /* ── Filterable columns (those with filterable !== false) ── */
  private get _filterableColumns(): TaskTableColumn[] {
    return this.columns.filter((c) => c.filterable !== false);
  }

  /* ── Count of active filter selections ── */
  private get _activeFilterCount(): number {
    return Object.values(this._activeFilters).reduce((sum, arr) => sum + arr.length, 0);
  }

  /* ── Apply filters to groups ── */
  private get _filteredGroups(): TaskTableGroup[] {
    const hasFilters = this._activeFilterCount > 0;
    if (!hasFilters) return this.groups;

    return this.groups.map((g) => ({
      ...g,
      rows: g.rows.filter((row) => this._rowMatchesFilters(row)),
    }));
  }

  private _rowMatchesFilters(row: TaskTableRow): boolean {
    for (const [key, values] of Object.entries(this._activeFilters)) {
      if (values.length === 0) continue;
      const rowVal = String(row[key] ?? '');
      if (!values.includes(rowVal)) return false;
    }
    return true;
  }

  /* ── Apply sorting per-group ── */
  private get _sortedGroups(): TaskTableGroup[] {
    const groups = this._filteredGroups;
    if (!this._sort) return groups;

    const { key, direction } = this._sort;
    const dir = direction === 'asc' ? 1 : -1;

    return groups.map((g) => ({
      ...g,
      rows: [...g.rows].sort((a, b) => {
        const aVal = String(a[key] ?? '');
        const bVal = String(b[key] ?? '');
        return aVal.localeCompare(bVal) * dir;
      }),
    }));
  }

  /* ── Final processed groups: filtered → sorted → mapped to TableGroup ── */
  private get _processedGroups(): TableGroup[] {
    return this._sortedGroups.map((g) => ({
      id: g.id,
      label: g.label,
      color: g.color,
      rows: g.rows as TableRow[],
    }));
  }

  /* ── Find which group a row belongs to ── */
  private _findGroupForRow(rowId: string): string | undefined {
    for (const g of this.groups) {
      if (g.rows.some((r) => r.id === rowId)) return g.id;
      for (const r of g.rows) {
        if (r.children?.some((c) => c.id === rowId)) return g.id;
      }
    }
    return undefined;
  }

  /* ── Event handlers ── */

  private _onReorder(e: CustomEvent) {
    const { rowId, fromGroupId, toGroupId, fromIndex, toIndex } = e.detail;
    this._dispatch('ca-task-move', { rowId, fromGroupId, toGroupId, fromIndex, toIndex });
  }

  private _onCellEdit(e: CustomEvent) {
    const { rowId, key, value, oldValue } = e.detail;
    const groupId = this._findGroupForRow(rowId);
    this._dispatch('ca-task-edit', { rowId, groupId, key, value, oldValue });
  }

  private _onRowCreate(e: CustomEvent) {
    const { groupId, value } = e.detail;
    this._dispatch('ca-task-create', { groupId, value });
  }

  private _onRowClick(e: CustomEvent) {
    const { row } = e.detail;
    const groupId = this._findGroupForRow(row.id);
    this._dispatch('ca-task-click', { row, groupId });
  }

  private _onExpand(e: CustomEvent) {
    const { id, expanded, expandedIds } = e.detail;
    this._expandedIds = expandedIds;
    this._dispatch('ca-task-expand', { id, expanded });
  }

  private _onGroupToggle(e: CustomEvent) {
    this._dispatch('ca-group-toggle', e.detail);
  }

  private _onSort(e: CustomEvent) {
    e.stopPropagation();
    const { key, direction } = e.detail;
    this._sort = { key, direction };
    this._dispatch('ca-task-sort', { key, direction });
  }

  private _dispatch(name: string, detail: unknown) {
    this.dispatchEvent(
      new CustomEvent(name, { detail, bubbles: true, composed: true })
    );
  }

  /* ── Filter modal handlers ── */

  private _openFilterModal() {
    this._filterModalOpen = true;
  }

  private _closeFilterModal() {
    this._filterModalOpen = false;
  }

  private _toggleFilterValue(colKey: string, value: string) {
    const current = this._activeFilters[colKey] || [];
    const idx = current.indexOf(value);
    const updated = idx >= 0
      ? current.filter((v) => v !== value)
      : [...current, value];

    this._activeFilters = { ...this._activeFilters, [colKey]: updated };
    this._dispatch('ca-task-filter', { filters: this._activeFilters });
  }

  private _clearAllFilters() {
    this._activeFilters = {};
    this._dispatch('ca-task-filter', { filters: this._activeFilters });
  }

  /* ── Render ── */

  private _renderFilterModal() {
    const filterableCols = this._filterableColumns;
    if (filterableCols.length === 0) return nothing;

    return html`
      <ca-modal
        .open=${this._filterModalOpen}
        size="sm"
        @ca-close=${this._closeFilterModal}
      >
        <span slot="heading">Filters</span>
        <div class="filter-modal-body">
          ${filterableCols.map((col) => {
            const uniqueVals = this._uniqueValuesForColumn(col.key);
            const activeVals = this._activeFilters[col.key] || [];
            return html`
              <div class="filter-column-section">
                <h4>${col.heading}</h4>
                <div class="filter-checkboxes">
                  ${uniqueVals.map((val) => html`
                    <ca-checkbox
                      size="sm"
                      label=${val}
                      ?checked=${activeVals.includes(val)}
                      @ca-change=${() => this._toggleFilterValue(col.key, val)}
                    ></ca-checkbox>
                  `)}
                </div>
              </div>
            `;
          })}
        </div>
        <div class="filter-modal-footer">
          <ca-button variant="tertiary" size="sm" @click=${this._clearAllFilters}>Clear all</ca-button>
          <ca-button variant="primary" size="sm" @click=${this._closeFilterModal}>Done</ca-button>
        </div>
      </ca-modal>
    `;
  }

  render() {
    const filterCount = this._activeFilterCount;

    return html`
      <ca-table
        .columns=${this._tableColumns}
        .groups=${this._processedGroups}
        .heading=${this.heading}
        .supportingText=${this.supportingText}
        .expandedIds=${this._expandedIds}
        .sort=${this._sort}
        ?expandable=${this.expandable}
        ?draggable=${this.draggable}
        ?clickable-rows=${this.clickableRows}
        ?inline-add=${this.inlineAdd}
        ?selectable=${this.selectable}
        @ca-reorder=${this._onReorder}
        @ca-cell-edit=${this._onCellEdit}
        @ca-row-create=${this._onRowCreate}
        @ca-row-click=${this._onRowClick}
        @ca-expand=${this._onExpand}
        @ca-group-toggle=${this._onGroupToggle}
        @ca-sort=${this._onSort}
      >
        <ca-button slot="header-actions" variant="secondary" size="sm" @click=${this._openFilterModal}>
          <span class="filter-btn-inner">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1.5 2h13l-5 6.5v4l-3 2v-6z"/>
            </svg>
            Filters
            ${filterCount > 0 ? html`<span class="filter-badge">${filterCount}</span>` : nothing}
          </span>
        </ca-button>
      </ca-table>
      ${this._renderFilterModal()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-task-table': CaTaskTable;
  }
}
