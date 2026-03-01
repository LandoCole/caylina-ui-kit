import { LitElement, html, css, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/* ── Public type definitions ── */

export interface TableColumn {
  key: string;
  heading: string;
  type?: 'text' | 'bold-text' | 'badge' | 'toggle' | 'progress' | 'custom';
  width?: string;
  sortable?: boolean;
  /** Map cell value → badge variant  e.g. { Active: 'success', Inactive: 'danger' } */
  badgeMap?: Record<string, string>;
  /** For progress columns: property key holding max value */
  progressMax?: string;
  /** For progress columns: suffix shown after label e.g. "times" */
  progressSuffix?: string;
  /** Custom render function returning a Lit TemplateResult */
  render?: (value: unknown, row: TableRow) => TemplateResult;
}

export interface TableRow {
  id: string;
  children?: TableRow[];
  [key: string]: unknown;
}

export interface TableFilterTab {
  id: string;
  label: string;
  count?: number;
}

export interface TableAction {
  label: string;
  action: string;
}

export interface TablePagination {
  page: number;
  pageSize: number;
  totalItems: number;
}

export interface TableSort {
  key: string;
  direction: 'asc' | 'desc';
}

/* ── Component ── */

@customElement('ca-table')
export class CaTable extends LitElement {
  static styles = css`
    /* ── Host ── */
    :host {
      display: block;
      font-family: var(--ca-font-family);
      color: var(--ca-text-primary);
    }

    /* ── Card wrapper ── */
    .wrapper {
      background-color: var(--ca-surface);
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-lg);
      overflow: hidden;
    }

    /* ── Card header ── */
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      gap: 12px;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }
    .heading {
      font-size: var(--ca-font-size-lg);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
      line-height: 1.2;
    }
    .supporting-text {
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-secondary);
      margin-top: 2px;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    /* ── Toolbar ── */
    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px 12px;
      gap: 12px;
    }
    .toolbar-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .toolbar-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .filter-tab {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border-radius: var(--ca-radius-full);
      border: 1px solid var(--ca-border);
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-secondary);
      transition: background-color var(--ca-transition-fast), color var(--ca-transition-fast), border-color var(--ca-transition-fast);
      white-space: nowrap;
    }
    .filter-tab:hover {
      background-color: var(--ca-surface-hover);
    }
    .filter-tab.active {
      background-color: var(--ca-color-secondary);
      color: var(--ca-color-white);
      border-color: var(--ca-color-secondary);
    }
    .filter-tab-count {
      font-size: var(--ca-font-size-xs);
      opacity: 0.7;
    }
    .search-box {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      background: var(--ca-surface);
      min-width: 180px;
    }
    .search-box svg {
      flex-shrink: 0;
      color: var(--ca-text-muted);
    }
    .search-input {
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      width: 100%;
    }
    .search-input::placeholder {
      color: var(--ca-text-muted);
    }
    .filters-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
    }
    .filters-btn:hover {
      background-color: var(--ca-surface-hover);
    }

    /* ── Grid ── */
    .grid {
      display: grid;
      width: 100%;
      overflow-x: auto;
    }

    /* ── Header row ── */
    .grid-header {
      display: contents;
    }
    .grid-header .cell {
      display: flex;
      align-items: center;
      padding: 10px 12px;
      font-size: var(--ca-font-size-xs);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.03em;
      background-color: var(--ca-surface-active);
      border-bottom: 1px solid var(--ca-border);
      border-top: 1px solid var(--ca-border);
      user-select: none;
      white-space: nowrap;
      gap: 4px;
    }
    .grid-header .cell.sortable {
      cursor: pointer;
    }
    .grid-header .cell.sortable:hover {
      color: var(--ca-text-primary);
    }
    .sort-icon {
      display: inline-flex;
      flex-shrink: 0;
      opacity: 0.4;
      transition: opacity var(--ca-transition-fast);
    }
    .sort-icon.active {
      opacity: 1;
    }

    /* ── Data rows ── */
    .grid-row {
      display: contents;
    }
    .grid-row .cell {
      display: flex;
      align-items: center;
      padding: 12px;
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-secondary);
      border-bottom: 1px solid var(--ca-border);
      background-color: var(--ca-surface);
      transition: background-color var(--ca-transition-fast);
      min-width: 0;
    }
    .grid-row:hover .cell {
      background-color: var(--ca-surface-hover);
    }
    .grid-row.selected .cell {
      background-color: var(--ca-surface-hover);
    }
    .grid-row.dragging .cell {
      opacity: 0.4;
    }
    .grid-row.drag-over-above .cell {
      box-shadow: inset 0 2px 0 0 var(--ca-color-primary);
    }
    .grid-row.drag-over-below .cell {
      box-shadow: inset 0 -2px 0 0 var(--ca-color-primary);
    }

    /* ── Expand toggle ── */
    .expand-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border: none;
      border-radius: var(--ca-radius-sm);
      background: none;
      cursor: pointer;
      color: var(--ca-text-muted);
      padding: 0;
      transition: color var(--ca-transition-fast), background-color var(--ca-transition-fast);
    }
    .expand-btn:hover {
      color: var(--ca-text-primary);
      background-color: var(--ca-surface-active);
    }
    .expand-icon {
      display: inline-flex;
      transition: transform 0.2s ease;
    }
    .expand-icon.expanded {
      transform: rotate(90deg);
    }
    .cell-expand {
      justify-content: center;
    }

    /* ── Child rows container ── */
    .child-rows {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s ease;
      grid-column: 1 / -1;
    }
    .child-rows.open {
      grid-template-rows: 1fr;
    }
    .child-rows-inner {
      overflow: hidden;
      display: contents;
    }
    .child-rows:not(.open) .child-rows-inner {
      display: grid;
      grid-template-rows: 0fr;
      overflow: hidden;
    }

    /* Child row styling */
    .grid-row.child-row .cell {
      background-color: var(--ca-surface-active);
    }
    .grid-row.child-row:hover .cell {
      background-color: var(--ca-surface-hover);
    }
    .child-indent {
      padding-left: 28px;
    }

    /* Row height variants */
    :host([row-height='compact']) .grid-row .cell { padding-top: 6px; padding-bottom: 6px; }
    :host([row-height='relaxed']) .grid-row .cell { padding-top: 18px; padding-bottom: 18px; }

    /* ── Cell content types ── */
    .cell-bold {
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
    }
    .cell-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* ── Drag handle ── */
    .drag-handle {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      color: var(--ca-text-muted);
      padding: 0;
      flex-shrink: 0;
    }
    .drag-handle:active {
      cursor: grabbing;
    }

    /* ── Checkbox cell ── */
    .cell-checkbox {
      justify-content: center;
    }

    /* ── Actions cell ── */
    .cell-actions {
      justify-content: center;
      position: relative;
    }
    .actions-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: var(--ca-radius-sm);
      background: none;
      cursor: pointer;
      color: var(--ca-text-muted);
      padding: 0;
    }
    .actions-btn:hover {
      background-color: var(--ca-surface-active);
      color: var(--ca-text-primary);
    }

    /* ── Row actions dropdown ── */
    .actions-dropdown {
      position: absolute;
      top: 100%;
      right: 8px;
      z-index: 20;
      background-color: var(--ca-surface-elevated);
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      box-shadow: var(--ca-shadow-menu);
      padding: 4px 0;
      min-width: 140px;
    }
    .actions-dropdown button {
      display: block;
      width: 100%;
      padding: 8px 14px;
      border: none;
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      text-align: left;
    }
    .actions-dropdown button:hover {
      background-color: var(--ca-surface-hover);
    }

    /* ── Pagination ── */
    .pagination {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-secondary);
    }
    .pagination-btns {
      display: flex;
      gap: 4px;
    }
    .page-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
    }
    .page-btn:hover:not(:disabled) {
      background-color: var(--ca-surface-hover);
    }
    .page-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* ── Empty state ── */
    .empty {
      padding: 40px 20px;
      text-align: center;
      color: var(--ca-text-muted);
      font-size: var(--ca-font-size-sm);
      border-bottom: 1px solid var(--ca-border);
    }
  `;

  /* ── Properties ── */
  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Array }) rows: TableRow[] = [];
  @property({ type: String }) heading = '';
  @property({ type: String, attribute: 'heading-badge' }) headingBadge = '';
  @property({ type: String, attribute: 'supporting-text' }) supportingText = '';
  @property({ type: Boolean, reflect: true }) selectable = false;
  @property({ type: Boolean, reflect: true }) draggable = false;
  @property({ type: Boolean, reflect: true, attribute: 'show-search' }) showSearch = false;
  @property({ type: Boolean, reflect: true, attribute: 'show-filters' }) showFilters = false;
  @property({ type: Array, attribute: false }) filterTabs: TableFilterTab[] = [];
  @property({ type: String, attribute: 'active-filter-tab' }) activeFilterTab = '';
  @property({ type: Array, attribute: false }) rowActions: TableAction[] = [];
  @property({ type: Object, attribute: false }) pagination: TablePagination | undefined;
  @property({ type: Object, attribute: false }) sort: TableSort | undefined;
  @property({ type: Array, attribute: false }) selectedIds: string[] = [];
  @property({ type: String, reflect: true, attribute: 'row-height' }) rowHeight: 'compact' | 'default' | 'relaxed' = 'default';
  @property({ type: Boolean, reflect: true }) expandable = false;
  @property({ type: Array, attribute: false }) expandedIds: string[] = [];

  /* ── Internal state ── */
  @state() private _openMenuRowId: string | null = null;
  @state() private _searchQuery = '';
  @state() private _dragRowId: string | null = null;
  @state() private _dragOverRowId: string | null = null;
  @state() private _dragOverPosition: 'above' | 'below' | null = null;

  private _searchTimeout: ReturnType<typeof setTimeout> | null = null;
  private _boundCloseMenu = this._closeMenu.bind(this);
  private _dragStartY = 0;
  private _dragRowIndex = -1;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._boundCloseMenu);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._boundCloseMenu);
    if (this._searchTimeout) clearTimeout(this._searchTimeout);
  }

  /* ── Grid template columns computation ── */
  private get _gridTemplateCols(): string {
    const parts: string[] = [];
    if (this.expandable) parts.push('32px');
    if (this.draggable) parts.push('40px');
    if (this.selectable) parts.push('48px');
    for (const col of this.columns) {
      parts.push(col.width || 'minmax(120px, 1fr)');
    }
    if (this.rowActions.length > 0) parts.push('48px');
    return parts.join(' ');
  }

  /* ── Select-all logic ── */
  private get _allSelected(): boolean {
    return this.rows.length > 0 && this.rows.every((r) => this.selectedIds.includes(r.id));
  }

  private get _someSelected(): boolean {
    return this.rows.some((r) => this.selectedIds.includes(r.id)) && !this._allSelected;
  }

  /* ── Pagination helpers ── */
  private get _pageStart(): number {
    if (!this.pagination) return 0;
    return (this.pagination.page - 1) * this.pagination.pageSize + 1;
  }

  private get _pageEnd(): number {
    if (!this.pagination) return 0;
    return Math.min(this.pagination.page * this.pagination.pageSize, this.pagination.totalItems);
  }

  private get _totalPages(): number {
    if (!this.pagination) return 0;
    return Math.ceil(this.pagination.totalItems / this.pagination.pageSize);
  }

  /* ── Event emitters ── */
  private _emit(name: string, detail: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  /* ── Sort handler ── */
  private _handleSort(col: TableColumn) {
    if (!col.sortable) return;
    let direction: 'asc' | 'desc' = 'asc';
    if (this.sort && this.sort.key === col.key) {
      direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
    }
    this._emit('ca-sort', { key: col.key, direction });
  }

  /* ── Selection handlers ── */
  private _handleSelectAll() {
    const newIds = this._allSelected ? [] : this.rows.map((r) => r.id);
    this._emit('ca-select', { selectedIds: newIds });
  }

  private _handleSelectRow(row: TableRow) {
    const idx = this.selectedIds.indexOf(row.id);
    const newIds = [...this.selectedIds];
    if (idx >= 0) {
      newIds.splice(idx, 1);
    } else {
      newIds.push(row.id);
    }
    this._emit('ca-select', { selectedIds: newIds });
  }

  /* ── Row actions ── */
  private _toggleMenu(e: Event, rowId: string) {
    e.stopPropagation();
    this._openMenuRowId = this._openMenuRowId === rowId ? null : rowId;
  }

  private _closeMenu() {
    this._openMenuRowId = null;
  }

  private _handleRowAction(action: TableAction, row: TableRow) {
    this._openMenuRowId = null;
    this._emit('ca-row-action', { action: action.action, row });
  }

  /* ── Toolbar handlers ── */
  private _handleFilterTab(tab: TableFilterTab) {
    this._emit('ca-filter-tab', { id: tab.id });
  }

  private _handleSearchInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this._searchQuery = value;
    if (this._searchTimeout) clearTimeout(this._searchTimeout);
    this._searchTimeout = setTimeout(() => {
      this._emit('ca-search', { query: value });
    }, 300);
  }

  private _handleFilterClick() {
    this._emit('ca-filter-click', {});
  }

  /* ── Pagination handlers ── */
  private _handlePrevPage() {
    if (!this.pagination || this.pagination.page <= 1) return;
    this._emit('ca-page', { page: this.pagination.page - 1, pageSize: this.pagination.pageSize });
  }

  private _handleNextPage() {
    if (!this.pagination || this.pagination.page >= this._totalPages) return;
    this._emit('ca-page', { page: this.pagination.page + 1, pageSize: this.pagination.pageSize });
  }

  /* ── Toggle handler ── */
  private _handleToggle(col: TableColumn, row: TableRow, e: Event) {
    const checked = (e as CustomEvent).detail?.checked ?? false;
    this._emit('ca-cell-toggle', { key: col.key, row, checked });
  }

  /* ── Expand/collapse handler ── */
  private _handleExpand(row: TableRow) {
    const idx = this.expandedIds.indexOf(row.id);
    const newIds = [...this.expandedIds];
    if (idx >= 0) {
      newIds.splice(idx, 1);
    } else {
      newIds.push(row.id);
    }
    this._emit('ca-expand', { id: row.id, expanded: idx < 0, expandedIds: newIds });
  }

  /* ── Drag-and-drop (pointer events) ── */
  private _handleDragStart(e: PointerEvent, rowId: string, rowIndex: number) {
    this._dragRowId = rowId;
    this._dragStartY = e.clientY;
    this._dragRowIndex = rowIndex;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  private _handleDragMove(e: PointerEvent) {
    if (!this._dragRowId) return;
    // Find row under pointer
    const el = this.shadowRoot?.elementFromPoint(e.clientX, e.clientY);
    const rowEl = el?.closest('[data-row-id]') as HTMLElement | null;
    if (rowEl) {
      const rowId = rowEl.dataset.rowId!;
      if (rowId !== this._dragRowId) {
        const rect = rowEl.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        this._dragOverRowId = rowId;
        this._dragOverPosition = e.clientY < mid ? 'above' : 'below';
      } else {
        this._dragOverRowId = null;
        this._dragOverPosition = null;
      }
    }
  }

  private _handleDragEnd(_e: PointerEvent) {
    if (!this._dragRowId || !this._dragOverRowId) {
      this._dragRowId = null;
      this._dragOverRowId = null;
      this._dragOverPosition = null;
      return;
    }

    const fromIndex = this._dragRowIndex;
    const targetIndex = this.rows.findIndex((r) => r.id === this._dragOverRowId);
    let toIndex = targetIndex;
    if (this._dragOverPosition === 'below') toIndex += 1;
    if (fromIndex < toIndex) toIndex -= 1;

    if (fromIndex !== toIndex && toIndex >= 0) {
      const newRows = [...this.rows];
      const [moved] = newRows.splice(fromIndex, 1);
      newRows.splice(toIndex, 0, moved);
      this._emit('ca-reorder', { rowId: this._dragRowId, fromIndex, toIndex, rows: newRows });
    }

    this._dragRowId = null;
    this._dragOverRowId = null;
    this._dragOverPosition = null;
  }

  /* ── Cell renderers ── */
  private _renderCell(col: TableColumn, row: TableRow): TemplateResult | typeof nothing {
    const value = row[col.key];
    const type = col.type || 'text';

    switch (type) {
      case 'bold-text':
        return html`<span class="cell-bold cell-text">${value ?? ''}</span>`;

      case 'badge': {
        const variant = col.badgeMap?.[String(value)] || 'default';
        return html`<ca-badge variant=${variant} size="sm">${value}</ca-badge>`;
      }

      case 'toggle':
        return html`<ca-toggle size="sm" ?checked=${!!value} @ca-change=${(e: Event) => this._handleToggle(col, row, e)}></ca-toggle>`;

      case 'progress': {
        const max = col.progressMax ? (row[col.progressMax] as number) || 100 : 100;
        return html`<ca-progress-bar value=${Number(value) || 0} max=${max} show-label labelSuffix=${col.progressSuffix || ''}></ca-progress-bar>`;
      }

      case 'custom':
        return col.render ? col.render(value, row) : html`${value ?? ''}`;

      default:
        return html`<span class="cell-text">${value ?? ''}</span>`;
    }
  }

  /* ── Sort icon ── */
  private _renderSortIcon(col: TableColumn) {
    if (!col.sortable) return nothing;
    const isActive = this.sort?.key === col.key;
    const isDesc = isActive && this.sort?.direction === 'desc';
    return html`
      <span class=${classMap({ 'sort-icon': true, active: !!isActive })}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          ${isDesc
            ? html`<path d="M6 2v8M3 7l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
            : html`<path d="M6 10V2M3 5l3-3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`}
        </svg>
      </span>
    `;
  }

  /* ── Main render ── */
  render() {
    const hasHeader = this.heading || this.supportingText;
    const hasToolbar = this.filterTabs.length > 0 || this.showSearch || this.showFilters;
    const hasActions = this.rowActions.length > 0;

    return html`
      <div class="wrapper">
        ${hasHeader ? this._renderHeader() : nothing}
        ${hasToolbar ? this._renderToolbar() : nothing}
        ${this._renderGrid(hasActions)}
        ${this.pagination ? this._renderPagination() : nothing}
      </div>
    `;
  }

  private _renderHeader() {
    return html`
      <div class="header">
        <div class="header-left">
          <div>
            <div style="display:flex;align-items:center;gap:8px">
              <span class="heading">${this.heading}</span>
              ${this.headingBadge ? html`<ca-badge variant="success" size="sm">${this.headingBadge}</ca-badge>` : nothing}
            </div>
            ${this.supportingText ? html`<div class="supporting-text">${this.supportingText}</div>` : nothing}
          </div>
        </div>
        <div class="header-actions">
          <slot name="header-actions"></slot>
        </div>
      </div>
    `;
  }

  private _renderToolbar() {
    return html`
      <div class="toolbar">
        <div class="toolbar-left">
          ${this.filterTabs.map(
            (tab) => html`
              <button
                class=${classMap({ 'filter-tab': true, active: tab.id === this.activeFilterTab })}
                @click=${() => this._handleFilterTab(tab)}
              >
                ${tab.label}${tab.count != null ? html`<span class="filter-tab-count">${tab.count}</span>` : nothing}
              </button>
            `
          )}
        </div>
        <div class="toolbar-right">
          ${this.showSearch
            ? html`
                <div class="search-box">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input class="search-input" type="text" placeholder="Search..." .value=${this._searchQuery} @input=${this._handleSearchInput} />
                </div>
              `
            : nothing}
          ${this.showFilters
            ? html`
                <button class="filters-btn" @click=${this._handleFilterClick}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                  Filters
                </button>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  private _renderGrid(hasActions: boolean) {
    return html`
      <div class="grid" style="grid-template-columns:${this._gridTemplateCols}"
        @pointermove=${this._handleDragMove}
        @pointerup=${this._handleDragEnd}
      >
        <!-- Header row -->
        <div class="grid-header">
          ${this.expandable ? html`<div class="cell"></div>` : nothing}
          ${this.draggable ? html`<div class="cell"></div>` : nothing}
          ${this.selectable
            ? html`
                <div class="cell cell-checkbox">
                  <ca-checkbox
                    size="xs"
                    ?checked=${this._allSelected}
                    @ca-change=${this._handleSelectAll}
                  ></ca-checkbox>
                </div>
              `
            : nothing}
          ${this.columns.map(
            (col) => html`
              <div
                class=${classMap({ cell: true, sortable: !!col.sortable })}
                @click=${() => this._handleSort(col)}
              >
                ${col.heading}${this._renderSortIcon(col)}
              </div>
            `
          )}
          ${hasActions ? html`<div class="cell"></div>` : nothing}
        </div>

        <!-- Data rows -->
        ${this.rows.length === 0
          ? html`<div class="empty" style="grid-column:1/-1">No data</div>`
          : this.rows.map((row, i) => html`
              ${this._renderRow(row, i, hasActions)}
              ${this.expandable && (row.children?.length ?? 0) > 0 && this.expandedIds.includes(row.id)
                ? row.children!.map((child, ci) => this._renderChildRow(child, ci, hasActions))
                : nothing}
            `)}
      </div>
    `;
  }

  private _renderRow(row: TableRow, index: number, hasActions: boolean) {
    const isSelected = this.selectedIds.includes(row.id);
    const isDragging = this._dragRowId === row.id;
    const isDragOverAbove = this._dragOverRowId === row.id && this._dragOverPosition === 'above';
    const isDragOverBelow = this._dragOverRowId === row.id && this._dragOverPosition === 'below';

    const hasChildren = this.expandable && (row.children?.length ?? 0) > 0;
    const isExpanded = this.expandedIds.includes(row.id);

    return html`
      <div
        class=${classMap({
          'grid-row': true,
          selected: isSelected,
          dragging: isDragging,
          'drag-over-above': isDragOverAbove,
          'drag-over-below': isDragOverBelow,
        })}
        data-row-id=${row.id}
      >
        ${this.expandable
          ? html`
              <div class="cell cell-expand">
                ${hasChildren
                  ? html`
                      <button class="expand-btn" @click=${() => this._handleExpand(row)} aria-label=${isExpanded ? 'Collapse' : 'Expand'}>
                        <span class=${classMap({ 'expand-icon': true, expanded: isExpanded })}>
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </span>
                      </button>
                    `
                  : nothing}
              </div>
            `
          : nothing}
        ${this.draggable
          ? html`
              <div class="cell cell-checkbox">
                <span
                  class="drag-handle"
                  @pointerdown=${(e: PointerEvent) => this._handleDragStart(e, row.id, index)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="5.5" cy="3.5" r="1.5"/><circle cx="10.5" cy="3.5" r="1.5"/>
                    <circle cx="5.5" cy="8" r="1.5"/><circle cx="10.5" cy="8" r="1.5"/>
                    <circle cx="5.5" cy="12.5" r="1.5"/><circle cx="10.5" cy="12.5" r="1.5"/>
                  </svg>
                </span>
              </div>
            `
          : nothing}
        ${this.selectable
          ? html`
              <div class="cell cell-checkbox">
                <ca-checkbox size="xs" ?checked=${isSelected} @ca-change=${() => this._handleSelectRow(row)}></ca-checkbox>
              </div>
            `
          : nothing}
        ${this.columns.map(
          (col) => html`
            <div class="cell">${this._renderCell(col, row)}</div>
          `
        )}
        ${hasActions
          ? html`
              <div class="cell cell-actions">
                <button class="actions-btn" @click=${(e: Event) => this._toggleMenu(e, row.id)}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="8" cy="3" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="8" cy="13" r="1.5"/>
                  </svg>
                </button>
                ${this._openMenuRowId === row.id
                  ? html`
                      <div class="actions-dropdown" @click=${(e: Event) => e.stopPropagation()}>
                        ${this.rowActions.map(
                          (action) => html`
                            <button @click=${() => this._handleRowAction(action, row)}>${action.label}</button>
                          `
                        )}
                      </div>
                    `
                  : nothing}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private _renderChildRow(child: TableRow, _index: number, hasActions: boolean) {
    return html`
      <div class="grid-row child-row" data-row-id=${child.id}>
        ${this.expandable ? html`<div class="cell cell-expand"></div>` : nothing}
        ${this.draggable ? html`<div class="cell"></div>` : nothing}
        ${this.selectable ? html`<div class="cell"></div>` : nothing}
        ${this.columns.map(
          (col, ci) => html`
            <div class="cell ${ci === 0 ? 'child-indent' : ''}">${this._renderCell(col, child)}</div>
          `
        )}
        ${hasActions ? html`<div class="cell"></div>` : nothing}
      </div>
    `;
  }

  private _renderPagination() {
    if (!this.pagination) return nothing;
    return html`
      <div class="pagination">
        <span>${this._pageStart} - ${this._pageEnd} of ${this.pagination.totalItems} items</span>
        <div class="pagination-btns">
          <button class="page-btn" ?disabled=${this.pagination.page <= 1} @click=${this._handlePrevPage}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Previous
          </button>
          <button class="page-btn" ?disabled=${this.pagination.page >= this._totalPages} @click=${this._handleNextPage}>
            Next
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-table': CaTable;
  }
}
