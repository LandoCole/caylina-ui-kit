import { LitElement } from 'lit';
export interface TaskTableColumn {
    key: string;
    heading: string;
    type?: 'text' | 'bold-text' | 'badge' | 'editable' | 'editable-select';
    width?: string;
    sortable?: boolean;
    /** Defaults to true — set false to opt out */
    filterable?: boolean;
    badgeMap?: Record<string, string>;
    options?: {
        value: string;
        label: string;
    }[];
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
export declare class CaTaskTable extends LitElement {
    static styles: import("lit").CSSResult;
    columns: TaskTableColumn[];
    groups: TaskTableGroup[];
    heading: string;
    supportingText: string;
    draggable: boolean;
    expandable: boolean;
    inlineAdd: boolean;
    clickableRows: boolean;
    selectable: boolean;
    private _expandedIds;
    private _filterModalOpen;
    private _activeFilters;
    private _sort;
    private get _tableColumns();
    private get _allRows();
    private _uniqueValuesForColumn;
    private get _filterableColumns();
    private get _activeFilterCount();
    private get _filteredGroups();
    private _rowMatchesFilters;
    private get _sortedGroups();
    private get _processedGroups();
    private _findGroupForRow;
    private _onReorder;
    private _onCellEdit;
    private _onRowCreate;
    private _onRowClick;
    private _onExpand;
    private _onGroupToggle;
    private _onSort;
    private _dispatch;
    private _openFilterModal;
    private _closeFilterModal;
    private _toggleFilterValue;
    private _clearAllFilters;
    private _renderFilterModal;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-task-table': CaTaskTable;
    }
}
