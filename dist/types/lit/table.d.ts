import { LitElement, TemplateResult } from 'lit';
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
    options?: {
        value: string;
        label: string;
    }[];
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
    progress?: {
        value: number;
        color: string;
    }[];
    progressMax?: number;
}
export declare class CaTable extends LitElement {
    static styles: import("lit").CSSResult;
    columns: TableColumn[];
    rows: TableRow[];
    heading: string;
    headingBadge: string;
    supportingText: string;
    selectable: boolean;
    draggable: boolean;
    showSearch: boolean;
    showFilters: boolean;
    filterTabs: TableFilterTab[];
    activeFilterTab: string;
    rowActions: TableAction[];
    pagination: TablePagination | undefined;
    sort: TableSort | undefined;
    selectedIds: string[];
    rowHeight: 'compact' | 'default' | 'relaxed';
    expandable: boolean;
    expandedIds: string[];
    resizable: boolean;
    columnFilters: Record<string, string[]>;
    /** Make rows clickable, emitting ca-row-click. */
    clickableRows: boolean;
    /** Grouped mode: array of groups with rows. When set, `rows` is ignored. */
    groups: TableGroup[];
    /** Show inline "Add row" input at the bottom of each group (or at the bottom when ungrouped). */
    inlineAdd: boolean;
    /** Enable virtual scrolling for large datasets (500+ rows). */
    virtualScroll: boolean;
    private _openMenuRowId;
    private _searchQuery;
    private _dragRowId;
    private _dragOverRowId;
    private _dragOverPosition;
    private _openFilterColKey;
    private _columnWidths;
    private _fullRows;
    private _collapsedGroupIds;
    private _addRowGroupId;
    private _addRowValue;
    private _virtualScrollTop;
    private _editingCell;
    private _editOriginalValue;
    private _searchTimeout;
    private _boundCloseMenu;
    private _boundCloseFilter;
    private _dragStartY;
    private _dragRowIndex;
    private _resizingColKey;
    private _resizeStartX;
    private _resizeStartWidth;
    private _filterSearchQuery;
    protected willUpdate(changedProps: Map<string, unknown>): void;
    protected updated(changedProps: Map<string, unknown>): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private get _gridTemplateCols();
    private get _allSelected();
    private get _someSelected();
    private get _pageStart();
    private get _pageEnd();
    private get _totalPages();
    private _emit;
    private _handleSort;
    private _handleSelectAll;
    private _handleSelectRow;
    private _toggleMenu;
    private _closeMenu;
    private _handleRowAction;
    private _handleFilterTab;
    private _handleSearchInput;
    private _handleFilterClick;
    private _handlePrevPage;
    private _handleNextPage;
    private _handleToggle;
    private _handleExpand;
    private _handleDragStart;
    private _handleDragMove;
    private _handleDragEnd;
    private _handleResizeStart;
    private _handleResizeMove;
    private _handleResizeEnd;
    private _toggleFilter;
    private _closeFilter;
    private _getUniqueValuesForColumn;
    private _handleFilterToggleValue;
    private _handleFilterSelectAll;
    private _handleFilterClear;
    private _handleFilterSearch;
    private _renderCell;
    private _startEditing;
    private _commitEdit;
    private _cancelEdit;
    private _handleEditKeyDown;
    private _handleEditBlur;
    private _handleSelectChange;
    private _renderSortIcon;
    private _renderFilterIcon;
    private _renderFilterDropdown;
    private _handleGroupToggle;
    private _handleRowClick;
    private _handleInlineAddKeyDown;
    private _renderGroupHeader;
    private _renderInlineAdd;
    private _renderGroupedGrid;
    render(): TemplateResult<1>;
    private _renderHeader;
    private _renderToolbar;
    private _renderGrid;
    private _renderRow;
    private _renderChildRow;
    private _renderPagination;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-table': CaTable;
    }
}
