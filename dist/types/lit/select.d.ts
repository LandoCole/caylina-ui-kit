import { LitElement } from 'lit';
export interface SelectOption {
    value: string;
    label: string;
}
export declare class CaSelect extends LitElement {
    static styles: import("lit").CSSResult;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    label: string;
    placeholder: string;
    options: SelectOption[];
    value: string;
    loading: boolean;
    borderless: boolean;
    /** Enable search/filter in dropdown. */
    searchable: boolean;
    /** Show "Create" option when search has no match. */
    allowCreate: boolean;
    _isOpen: boolean;
    private _searchQuery;
    private _dropdownPos;
    _fieldEl: HTMLElement;
    private _boundClickOutside;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(changed: Map<string, unknown>): void;
    private _handleClickOutside;
    private _toggleOpen;
    private _updateDropdownPos;
    private _handleKeyDown;
    private _handleSelect;
    private _handleCreate;
    private _handleSearchInput;
    private get _filteredOptions();
    private get _selectedLabel();
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-select': CaSelect;
    }
}
