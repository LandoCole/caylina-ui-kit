import { LitElement } from 'lit';
export interface LabelOption {
    value: string;
    label: string;
    color: string;
}
/**
 * `<ca-label-selector>` — Color-coded label multi-select with create-inline.
 * Trigger shows colored chips; dropdown has checkboxes + "Create label" with mini color picker.
 *
 * @fires ca-change - Dispatched when selection changes. detail: `{ value: string[] }`
 * @fires ca-create - Dispatched when a new label is created. detail: `{ label: string, color: string }`
 */
export declare class CaLabelSelector extends LitElement {
    static styles: import("lit").CSSResult;
    labels: LabelOption[];
    value: string[];
    allowCreate: boolean;
    size: 'xs' | 'sm' | 'md' | 'lg';
    borderless: boolean;
    private _isOpen;
    private _searchQuery;
    private _showCreate;
    private _newLabelName;
    private _newLabelColor;
    private _boundClickOutside;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleClickOutside;
    private _close;
    private _toggle;
    private _handleToggleLabel;
    private _handleCreateLabel;
    private get _filteredLabels();
    private get _selectedLabels();
    render(): import("lit-html").TemplateResult<1>;
    private _renderDropdown;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-label-selector': CaLabelSelector;
    }
}
