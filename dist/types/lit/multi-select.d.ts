import { LitElement } from 'lit';
export interface MultiSelectOption {
    value: string;
    label: string;
}
export declare class CaMultiSelect extends LitElement {
    static styles: import("lit").CSSResult;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    label: string;
    placeholder: string;
    options: MultiSelectOption[];
    value: string[];
    loading: boolean;
    disabled: boolean;
    searchable: boolean;
    maxVisibleChips: number;
    /** Show "Create" option when search has no exact match. */
    allowCreate: boolean;
    private _isOpen;
    private _searchQuery;
    private _fieldEl;
    private _searchInput;
    private _boundClickOutside;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleClickOutside;
    private _toggleOpen;
    private _handleFieldKeyDown;
    private _handleOptionToggle;
    private _handleRemoveChip;
    private _handleClearAll;
    private _handleSearchInput;
    private get _filteredOptions();
    private get _selectedLabels();
    render(): import("lit-html").TemplateResult<1>;
    private _renderChips;
    private _renderDropdown;
    private _handleCreate;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-multi-select': CaMultiSelect;
    }
}
