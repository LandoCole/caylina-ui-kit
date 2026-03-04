import { LitElement, html, css, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/* ── Public type definitions ── */

export interface TableColumn {
  key: string;
  heading: string;
  type?: 'text' | 'bold-text' | 'badge' | 'toggle' | 'progress' | 'custom' | 'editable' | 'editable-select';
  width?: string;
  sortable?: boolean;
  /** Enable per-column filter dropdown */
  filterable?: boolean;
  /** Map cell value → badge variant  e.g. { Active: 'success', Inactive: 'danger' } */
  badgeMap?: Record<string, string>;
  /** For progress columns: property key holding max value */
  progressMax?: string;
  /** For progress columns: suffix shown after label e.g. "times" */
  progressSuffix?: string;
  /** Custom render function returning a Lit TemplateResult */
  render?: (value: unknown, row: TableRow) => TemplateResult;
  /** For editable-select: dropdown options */
  options?: { value: string; label: string }[];
  /** For editable: placeholder text when editing */
  editPlaceholder?: string;
}

export interface TableColumnFilter {
  key: string;
  values: string[];
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

export interface TableGroup {
  id: string;
  label: string;
  color?: string;
  rows: TableRow[];
  /** Progress segments for group header bar */
  progress?: { value: number; color: string }[];
  progressMax?: number;
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
      position: relative;
    }
    .grid-header .cell.sortable {
      cursor: pointer;
    }
    .grid-header .cell.sortable:hover {
      color: var(--ca-text-primary);
    }
    .sort-icon {
      display: inline-flex;
      flex-direction: column;
      flex-shrink: 0;
      gap: 1px;
      color: var(--ca-text-muted);
      transition: color var(--ca-transition-fast);
    }
    .sort-icon .sort-asc,
    .sort-icon .sort-desc {
      display: flex;
      opacity: 0.4;
      transition: opacity var(--ca-transition-fast), color var(--ca-transition-fast);
    }
    .sort-icon .sort-asc.active,
    .sort-icon .sort-desc.active {
      opacity: 1;
      color: var(--ca-text-primary);
    }
    .grid-header .cell.sortable:hover .sort-icon .sort-asc,
    .grid-header .cell.sortable:hover .sort-icon .sort-desc {
      opacity: 0.7;
    }
    .grid-header .cell.sortable:hover .sort-icon .sort-asc.active,
    .grid-header .cell.sortable:hover .sort-icon .sort-desc.active {
      opacity: 1;
    }

    /* ── Resize handle ── */
    .resize-handle {
      position: absolute;
      top: 0;
      right: 0;
      width: 6px;
      height: 100%;
      cursor: col-resize;
      background: transparent;
      z-index: 2;
      transition: background-color var(--ca-transition-fast);
    }
    .resize-handle:hover,
    .resize-handle.resizing {
      background-color: var(--ca-color-primary);
    }

    /* ── Column filter icon ── */
    .filter-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      opacity: 0.4;
      cursor: pointer;
      transition: opacity var(--ca-transition-fast), color var(--ca-transition-fast);
      padding: 2px;
      border-radius: var(--ca-radius-sm);
    }
    .filter-icon:hover {
      opacity: 0.8;
    }
    .filter-icon.active {
      opacity: 1;
      color: var(--ca-color-primary);
    }
    .header-text {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* ── Column filter dropdown ── */
    .filter-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 30;
      background-color: var(--ca-surface-elevated);
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      box-shadow: var(--ca-shadow-menu);
      padding: 4px 0;
      min-width: 180px;
      max-height: 300px;
      display: flex;
      flex-direction: column;
      text-transform: none;
      letter-spacing: normal;
      font-weight: normal;
    }
    .filter-dropdown-search {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border-bottom: 1px solid var(--ca-border);
    }
    .filter-dropdown-search input {
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      width: 100%;
    }
    .filter-dropdown-search input::placeholder {
      color: var(--ca-text-muted);
    }
    .filter-options {
      overflow-y: auto;
      flex: 1;
      padding: 4px 0;
    }
    .filter-option {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      cursor: pointer;
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      transition: background-color var(--ca-transition-fast);
    }
    .filter-option:hover {
      background-color: var(--ca-surface-hover);
    }
    .filter-actions {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 8px;
      border-top: 1px solid var(--ca-border);
    }
    .filter-action-btn {
      flex: 1;
      padding: 4px 8px;
      border: none;
      border-radius: var(--ca-radius-sm);
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-xs);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-secondary);
      text-align: center;
      transition: background-color var(--ca-transition-fast), color var(--ca-transition-fast);
    }
    .filter-action-btn:hover {
      background-color: var(--ca-surface-hover);
      color: var(--ca-text-primary);
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
    .grid-row .cell > ca-input,
    .grid-row .cell > ca-select,
    .grid-row .cell > ca-multi-select {
      width: 100%;
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

    /* ── Group header ── */
    .group-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 20px;
      background-color: var(--ca-surface-active);
      border-bottom: 1px solid var(--ca-border);
      cursor: pointer;
      user-select: none;
      transition: background-color var(--ca-transition-fast);
    }
    .group-header:hover {
      background-color: var(--ca-surface-hover);
    }
    .group-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border: none;
      background: none;
      cursor: pointer;
      padding: 0;
      color: var(--ca-text-secondary);
      transition: transform var(--ca-transition-fast);
      flex-shrink: 0;
    }
    .group-toggle.collapsed {
      transform: rotate(-90deg);
    }
    .group-color-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .group-label {
      font-weight: var(--ca-font-weight-semibold);
      font-size: var(--ca-font-size-md);
      color: var(--ca-text-primary);
    }
    .group-count {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-secondary);
    }
    .group-progress {
      flex: 1;
      max-width: 200px;
      margin-left: auto;
    }

    /* ── Inline add row ── */
    .add-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 20px;
      border-bottom: 1px solid var(--ca-border);
    }
    .add-row-input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
    }
    .add-row-input::placeholder { color: var(--ca-text-muted); }
    .add-row-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      border: 1px dashed var(--ca-border-strong);
      border-radius: var(--ca-radius-sm);
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      transition: color var(--ca-transition-fast), border-color var(--ca-transition-fast);
    }
    .add-row-btn:hover {
      color: var(--ca-text-primary);
      border-color: var(--ca-text-primary);
    }

    /* ── Virtual scroll container ── */
    .virtual-scroll-container {
      overflow-y: auto;
      max-height: var(--ca-table-max-height, 600px);
    }

    /* ── Clickable rows ── */
    .grid-row.clickable {
      cursor: pointer;
    }
    .grid-row.clickable:hover {
      background-color: var(--ca-surface-hover);
    }

    /* ── Editable cells ── */
    .cell-editable {
      cursor: pointer;
      border-radius: var(--ca-radius-sm);
      padding: 2px 4px;
      margin: -2px -4px;
    }
    .cell-editable:hover {
      background-color: var(--ca-surface-hover);
    }
    .cell-editable-editing {
      padding: 0;
      margin: -4px -4px;
    }
    .cell-editable-editing ca-input,
    .cell-editable-editing ca-select {
      --ca-input-height: 28px;
      font-size: var(--ca-font-size-sm);
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
  @property({ type: Boolean, reflect: true }) resizable = false;
  @property({ type: Object, attribute: false }) columnFilters: Record<string, string[]> = {};
  /** Make rows clickable, emitting ca-row-click. */
  @property({ type: Boolean, reflect: true, attribute: 'clickable-rows' }) clickableRows = false;

  /** Grouped mode: array of groups with rows. When set, `rows` is ignored. */
  @property({ type: Array, attribute: false }) groups: TableGroup[] = [];

  /** Show inline "Add row" input at the bottom of each group (or at the bottom when ungrouped). */
  @property({ type: Boolean, reflect: true, attribute: 'inline-add' }) inlineAdd = false;

  /** Enable virtual scrolling for large datasets (500+ rows). */
  @property({ type: Boolean, reflect: true, attribute: 'virtual-scroll' }) virtualScroll = false;

  /* ── Internal state ── */
  @state() private _openMenuRowId: string | null = null;
  @state() private _searchQuery = '';
  @state() private _dragRowId: string | null = null;
  @state() private _dragOverRowId: string | null = null;
  @state() private _dragOverPosition: 'above' | 'below' | null = null;
  @state() private _openFilterColKey: string | null = null;
  @state() private _columnWidths: Map<string, number> = new Map();
  @state() private _fullRows: TableRow[] = [];
  @state() private _collapsedGroupIds: Set<string> = new Set();
  @state() private _addRowGroupId: string | null = null;
  @state() private _addRowValue = '';
  @state() private _virtualScrollTop = 0;
  @state() private _editingCell: { rowId: string; key: string } | null = null;
  private _editOriginalValue: unknown = null;

  private _searchTimeout: ReturnType<typeof setTimeout> | null = null;
  private _boundCloseMenu = this._closeMenu.bind(this);
  private _boundCloseFilter = this._closeFilter.bind(this);
  private _dragStartY = 0;
  private _dragRowIndex = -1;
  private _resizingColKey: string | null = null;
  private _resizeStartX = 0;
  private _resizeStartWidth = 0;
  private _filterSearchQuery: Map<string, string> = new Map();

  protected willUpdate(changedProps: Map<string, unknown>) {
    if (changedProps.has('rows')) {
      const hasActiveFilter = Object.values(this.columnFilters).some(v => v && v.length > 0);
      if (!hasActiveFilter || this._fullRows.length === 0) {
        this._fullRows = [...this.rows];
      }
    }
  }

  protected updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('_editingCell') && this._editingCell) {
      this.updateComplete.then(() => {
        const input = this.shadowRoot?.querySelector('.cell-editable-editing ca-input') as any;
        if (input) {
          input.updateComplete?.then(() => {
            const inner = input.shadowRoot?.querySelector('input');
            inner?.focus();
            inner?.select();
          });
        }
        const select = this.shadowRoot?.querySelector('.cell-editable-editing ca-select') as any;
        if (select) {
          select.updateComplete?.then(() => {
            select._isOpen = true;
          });
        }
      });
    }
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._boundCloseMenu);
    document.addEventListener('click', this._boundCloseFilter);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._boundCloseMenu);
    document.removeEventListener('click', this._boundCloseFilter);
    if (this._searchTimeout) clearTimeout(this._searchTimeout);
  }

  /* ── Grid template columns computation ── */
  private get _gridTemplateCols(): string {
    const parts: string[] = [];
    if (this.expandable) parts.push('32px');
    if (this.draggable) parts.push('40px');
    if (this.selectable) parts.push('48px');
    for (const col of this.columns) {
      const resizedWidth = this._columnWidths.get(col.key);
      if (resizedWidth) {
        parts.push(`${resizedWidth}px`);
      } else {
        parts.push(col.width || 'minmax(120px, 1fr)');
      }
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

    // Group-aware drag-and-drop
    if (this.groups.length > 0) {
      let fromGroupId = '';
      let fromIndex = -1;
      let toGroupId = '';
      let toIndex = -1;

      for (const g of this.groups) {
        const fi = g.rows.findIndex((r) => r.id === this._dragRowId);
        if (fi >= 0) { fromGroupId = g.id; fromIndex = fi; }
        const ti = g.rows.findIndex((r) => r.id === this._dragOverRowId);
        if (ti >= 0) {
          toGroupId = g.id;
          toIndex = ti;
          if (this._dragOverPosition === 'below') toIndex += 1;
        }
      }

      if (fromGroupId && toGroupId && fromIndex >= 0 && toIndex >= 0) {
        // Adjust index when moving within same group
        if (fromGroupId === toGroupId && fromIndex < toIndex) toIndex -= 1;
        if (!(fromGroupId === toGroupId && fromIndex === toIndex)) {
          this._emit('ca-reorder', {
            rowId: this._dragRowId,
            fromGroupId,
            toGroupId,
            fromIndex,
            toIndex,
          });
        }
      }
    } else {
      // Flat (ungrouped) drag-and-drop
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
    }

    this._dragRowId = null;
    this._dragOverRowId = null;
    this._dragOverPosition = null;
  }

  /* ── Column resize (pointer events) ── */
  private _handleResizeStart(e: PointerEvent, colKey: string) {
    e.stopPropagation();
    e.preventDefault();
    this._resizingColKey = colKey;
    this._resizeStartX = e.clientX;
    // Measure current column width from the header cell
    const headerCell = this.shadowRoot?.querySelector(`[data-col="${colKey}"]`) as HTMLElement | null;
    this._resizeStartWidth = headerCell ? headerCell.getBoundingClientRect().width : 120;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  private _handleResizeMove(e: PointerEvent) {
    if (!this._resizingColKey) return;
    e.preventDefault();
    const delta = e.clientX - this._resizeStartX;
    const newWidth = Math.max(60, this._resizeStartWidth + delta);
    const newMap = new Map(this._columnWidths);
    newMap.set(this._resizingColKey, newWidth);
    this._columnWidths = newMap;
  }

  private _handleResizeEnd(e: PointerEvent) {
    if (!this._resizingColKey) return;
    const width = this._columnWidths.get(this._resizingColKey) || 120;
    this._emit('ca-column-resize', { key: this._resizingColKey, width });
    this._resizingColKey = null;
  }

  /* ── Column filter handlers ── */
  private _toggleFilter(e: Event, colKey: string) {
    e.stopPropagation();
    this._openFilterColKey = this._openFilterColKey === colKey ? null : colKey;
  }

  private _closeFilter() {
    this._openFilterColKey = null;
  }

  private _getUniqueValuesForColumn(colKey: string): string[] {
    const source = this._fullRows.length > 0 ? this._fullRows : this.rows;
    const values = new Set<string>();
    for (const row of source) {
      const val = row[colKey];
      if (val != null && val !== '') {
        values.add(String(val));
      }
    }
    return Array.from(values).sort();
  }

  private _handleFilterToggleValue(colKey: string, value: string) {
    const current = this.columnFilters[colKey] || [];
    const idx = current.indexOf(value);
    let newValues: string[];
    if (idx >= 0) {
      newValues = current.filter((v) => v !== value);
    } else {
      newValues = [...current, value];
    }
    this._emit('ca-column-filter', { key: colKey, values: newValues });
  }

  private _handleFilterSelectAll(colKey: string) {
    const allValues = this._getUniqueValuesForColumn(colKey);
    this._emit('ca-column-filter', { key: colKey, values: allValues });
  }

  private _handleFilterClear(colKey: string) {
    this._emit('ca-column-filter', { key: colKey, values: [] });
  }

  private _handleFilterSearch(colKey: string, e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this._filterSearchQuery = new Map(this._filterSearchQuery);
    this._filterSearchQuery.set(colKey, value);
    this.requestUpdate();
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

      case 'editable': {
        const isEditing = this._editingCell?.rowId === row.id && this._editingCell?.key === col.key;
        if (isEditing) {
          return html`
            <div class="cell-editable-editing" @click=${(e: Event) => e.stopPropagation()}>
              <ca-input
                size="sm"
                borderless
                .value=${String(value ?? '')}
                placeholder=${col.editPlaceholder || ''}
                @keydown=${(e: KeyboardEvent) => this._handleEditKeyDown(e, row.id, col.key)}
                @blur=${(e: FocusEvent) => this._handleEditBlur(e, row.id, col.key)}
              ></ca-input>
            </div>
          `;
        }
        return html`
          <span class="cell-editable cell-text" @click=${(e: Event) => { e.stopPropagation(); this._startEditing(row.id, col.key, value); }}>
            ${value ?? ''}
          </span>
        `;
      }

      case 'editable-select': {
        const isEditing = this._editingCell?.rowId === row.id && this._editingCell?.key === col.key;
        if (isEditing) {
          return html`
            <div class="cell-editable-editing" @click=${(e: Event) => e.stopPropagation()}>
              <ca-select
                size="sm"
                borderless
                .options=${col.options || []}
                .value=${String(value ?? '')}
                @ca-change=${(e: CustomEvent) => this._handleSelectChange(e, row.id, col.key)}
                @blur=${(e: FocusEvent) => this._handleEditBlur(e, row.id, col.key)}
              ></ca-select>
            </div>
          `;
        }
        if (col.badgeMap) {
          const variant = col.badgeMap[String(value)] || 'default';
          return html`
            <span class="cell-editable" @click=${(e: Event) => { e.stopPropagation(); this._startEditing(row.id, col.key, value); }}>
              <ca-badge variant=${variant} size="sm">${value}</ca-badge>
            </span>
          `;
        }
        return html`
          <span class="cell-editable cell-text" @click=${(e: Event) => { e.stopPropagation(); this._startEditing(row.id, col.key, value); }}>
            ${value ?? ''}
          </span>
        `;
      }

      case 'custom':
        return col.render ? col.render(value, row) : html`${value ?? ''}`;

      default:
        return html`<span class="cell-text">${value ?? ''}</span>`;
    }
  }

  /* ── Inline editing handlers ── */

  private _startEditing(rowId: string, key: string, currentValue: unknown) {
    this._editOriginalValue = currentValue;
    this._editingCell = { rowId, key };
  }

  private _commitEdit(rowId: string, key: string, newValue: unknown) {
    const oldValue = this._editOriginalValue;
    this._editingCell = null;
    this._editOriginalValue = null;
    if (newValue !== oldValue) {
      this.dispatchEvent(
        new CustomEvent('ca-cell-edit', {
          detail: { rowId, key, value: newValue, oldValue },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private _cancelEdit() {
    this._editingCell = null;
    this._editOriginalValue = null;
  }

  private _handleEditKeyDown(e: KeyboardEvent, rowId: string, key: string) {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      const input = e.target as HTMLElement;
      const caInput = input.closest('ca-input') as any;
      const val = caInput?.value ?? (input as HTMLInputElement).value;
      this._commitEdit(rowId, key, val);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this._cancelEdit();
    }
  }

  private _handleEditBlur(e: FocusEvent, rowId: string, key: string) {
    // Don't commit if focus is moving to another element within the same cell (e.g. select dropdown)
    const related = e.relatedTarget as HTMLElement | null;
    if (related && (e.target as HTMLElement)?.closest('.cell-editable-editing')?.contains(related)) {
      return;
    }
    const target = e.target as any;
    const caInput = target.closest?.('ca-input') as any;
    if (caInput) {
      this._commitEdit(rowId, key, caInput.value);
    }
  }

  private _handleSelectChange(e: CustomEvent, rowId: string, key: string) {
    this._commitEdit(rowId, key, e.detail.value);
  }

  /* ── Sort icon ── */
  private _renderSortIcon(col: TableColumn) {
    if (!col.sortable) return nothing;
    const isActive = this.sort?.key === col.key;
    const isAsc = isActive && this.sort?.direction === 'asc';
    const isDesc = isActive && this.sort?.direction === 'desc';
    return html`
      <span class="sort-icon">
        <span class=${classMap({ 'sort-asc': true, active: isAsc })}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 5L5 1L9 5"/>
          </svg>
        </span>
        <span class=${classMap({ 'sort-desc': true, active: isDesc })}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 1L5 5L9 1"/>
          </svg>
        </span>
      </span>
    `;
  }

  /* ── Filter icon ── */
  private _renderFilterIcon(col: TableColumn) {
    if (!col.filterable) return nothing;
    const hasActiveFilter = (this.columnFilters[col.key]?.length ?? 0) > 0;
    return html`
      <span
        class=${classMap({ 'filter-icon': true, active: hasActiveFilter })}
        @click=${(e: Event) => { e.stopPropagation(); this._toggleFilter(e, col.key); }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
        </svg>
      </span>
    `;
  }

  /* ── Filter dropdown ── */
  private _renderFilterDropdown(col: TableColumn) {
    if (!col.filterable || this._openFilterColKey !== col.key) return nothing;
    const uniqueValues = this._getUniqueValuesForColumn(col.key);
    const activeValues = this.columnFilters[col.key] || [];
    const searchQuery = (this._filterSearchQuery.get(col.key) || '').toLowerCase();
    const filteredValues = searchQuery
      ? uniqueValues.filter((v) => v.toLowerCase().includes(searchQuery))
      : uniqueValues;
    const showSearch = uniqueValues.length > 8;

    return html`
      <div class="filter-dropdown" @click=${(e: Event) => e.stopPropagation()}>
        ${showSearch
          ? html`
              <div class="filter-dropdown-search">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input
                  type="text"
                  placeholder="Search..."
                  .value=${this._filterSearchQuery.get(col.key) || ''}
                  @input=${(e: Event) => this._handleFilterSearch(col.key, e)}
                />
              </div>
            `
          : nothing}
        <div class="filter-options">
          ${filteredValues.map(
            (val) => html`
              <div class="filter-option" @click=${() => this._handleFilterToggleValue(col.key, val)}>
                <ca-checkbox
                  size="xs"
                  ?checked=${activeValues.includes(val)}
                  @ca-change=${(e: Event) => { e.stopPropagation(); this._handleFilterToggleValue(col.key, val); }}
                ></ca-checkbox>
                <span>${val}</span>
              </div>
            `
          )}
        </div>
        <div class="filter-actions">
          <button class="filter-action-btn" @click=${() => this._handleFilterSelectAll(col.key)}>Select All</button>
          <button class="filter-action-btn" @click=${() => this._handleFilterClear(col.key)}>Clear</button>
        </div>
      </div>
    `;
  }

  /* ── Group methods ── */

  private _handleGroupToggle(group: TableGroup) {
    const newSet = new Set(this._collapsedGroupIds);
    if (newSet.has(group.id)) {
      newSet.delete(group.id);
    } else {
      newSet.add(group.id);
    }
    this._collapsedGroupIds = newSet;
    this.dispatchEvent(
      new CustomEvent('ca-group-toggle', {
        detail: { groupId: group.id, collapsed: newSet.has(group.id) },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleRowClick(row: TableRow) {
    this.dispatchEvent(
      new CustomEvent('ca-row-click', {
        detail: { row },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleInlineAddKeyDown(e: KeyboardEvent, groupId?: string) {
    if (e.key === 'Enter' && this._addRowValue.trim()) {
      this.dispatchEvent(
        new CustomEvent('ca-row-create', {
          detail: { value: this._addRowValue.trim(), groupId },
          bubbles: true,
          composed: true,
        })
      );
      this._addRowValue = '';
    } else if (e.key === 'Escape') {
      this._addRowValue = '';
      this._addRowGroupId = null;
    }
  }

  private _renderGroupHeader(group: TableGroup) {
    const isCollapsed = this._collapsedGroupIds.has(group.id);
    return html`
      <div class="group-header" @click=${() => this._handleGroupToggle(group)}>
        <span class=${classMap({ 'group-toggle': true, collapsed: isCollapsed })}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        ${group.color ? html`<span class="group-color-dot" style="background-color: ${group.color}"></span>` : nothing}
        <span class="group-label">${group.label}</span>
        <span class="group-count">${group.rows.length}</span>
        ${Array.isArray(group.progress) && group.progressMax
          ? html`<ca-progress-bar class="group-progress" .segments=${group.progress} .max=${group.progressMax} .value=${group.progress.reduce((a: number, s: {value: number}) => a + s.value, 0)} size="sm"></ca-progress-bar>`
          : nothing}
      </div>
    `;
  }

  private _renderInlineAdd(groupId?: string) {
    if (!this.inlineAdd) return nothing;
    return html`
      <div class="add-row">
        <button class="add-row-btn" @click=${() => {
          this._addRowGroupId = groupId ?? '__ungrouped__';
          this.updateComplete.then(() => {
            this.shadowRoot?.querySelector<HTMLInputElement>('.add-row-input')?.focus();
          });
        }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          Add task
        </button>
        ${this._addRowGroupId === (groupId ?? '__ungrouped__')
          ? html`
              <input
                class="add-row-input"
                type="text"
                placeholder="Task name..."
                .value=${this._addRowValue}
                @input=${(e: Event) => { this._addRowValue = (e.target as HTMLInputElement).value; }}
                @keydown=${(e: KeyboardEvent) => this._handleInlineAddKeyDown(e, groupId)}
                @blur=${() => { this._addRowGroupId = null; }}
              />
            `
          : nothing}
      </div>
    `;
  }

  private _renderGroupedGrid(hasActions: boolean) {
    return html`
      ${this.groups.map((group) => {
        const isCollapsed = this._collapsedGroupIds.has(group.id);
        return html`
          ${this._renderGroupHeader(group)}
          ${!isCollapsed
            ? html`
                <div class="grid" style="grid-template-columns:${this._gridTemplateCols}"
                  @pointermove=${this._handleDragMove}
                  @pointerup=${this._handleDragEnd}
                >
                  <!-- Header row -->
                  <div class="grid-header">
                    ${this.expandable ? html`<div class="cell"></div>` : nothing}
                    ${this.draggable ? html`<div class="cell"></div>` : nothing}
                    ${this.selectable
                      ? html`<div class="cell cell-checkbox">
                          <ca-checkbox size="xs" @ca-change=${this._handleSelectAll}></ca-checkbox>
                        </div>`
                      : nothing}
                    ${this.columns.map(
                      (col) => html`
                        <div class=${classMap({ cell: true, sortable: !!col.sortable })} data-col=${col.key} @click=${() => this._handleSort(col)}>
                          ${this._renderFilterIcon(col)}
                          <span class="header-text">${col.heading}</span>
                          ${this._renderSortIcon(col)}
                          ${this._renderFilterDropdown(col)}
                        </div>
                      `
                    )}
                    ${hasActions ? html`<div class="cell"></div>` : nothing}
                  </div>
                  <!-- Rows -->
                  ${group.rows.length === 0
                    ? html`<div class="empty" style="grid-column:1/-1">No tasks in this group</div>`
                    : group.rows.map((row, i) => html`
                        ${this._renderRow(row, i, hasActions)}
                        ${this.expandable && (row.children?.length ?? 0) > 0 && this.expandedIds.includes(row.id)
                          ? row.children!.map((child, ci) => this._renderChildRow(child, ci, hasActions))
                          : nothing}
                      `)}
                </div>
                ${this._renderInlineAdd(group.id)}
              `
            : nothing}
        `;
      })}
    `;
  }

  /* ── Main render ── */
  render() {
    const hasHeader = this.heading || this.supportingText;
    const hasToolbar = this.filterTabs.length > 0 || this.showSearch || this.showFilters;
    const hasActions = this.rowActions.length > 0;
    const isGrouped = this.groups.length > 0;

    return html`
      <div class="wrapper">
        ${hasHeader ? this._renderHeader() : nothing}
        ${hasToolbar ? this._renderToolbar() : nothing}
        ${isGrouped
          ? this._renderGroupedGrid(hasActions)
          : html`
              ${this._renderGrid(hasActions)}
              ${this.inlineAdd ? this._renderInlineAdd() : nothing}
            `}
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
                data-col=${col.key}
                @click=${() => this._handleSort(col)}
              >
                ${this._renderFilterIcon(col)}
                <span class="header-text">${col.heading}</span>
                ${this._renderSortIcon(col)}
                ${this._renderFilterDropdown(col)}
                ${this.resizable
                  ? html`<span
                      class=${classMap({ 'resize-handle': true, resizing: this._resizingColKey === col.key })}
                      @pointerdown=${(e: PointerEvent) => this._handleResizeStart(e, col.key)}
                      @pointermove=${(e: PointerEvent) => this._handleResizeMove(e)}
                      @pointerup=${(e: PointerEvent) => this._handleResizeEnd(e)}
                      @click=${(e: Event) => e.stopPropagation()}
                    ></span>`
                  : nothing}
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
          clickable: !this.selectable && !this.draggable,
        })}
        data-row-id=${row.id}
        @click=${() => this._handleRowClick(row)}
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
