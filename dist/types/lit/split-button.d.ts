import { LitElement } from 'lit';
export interface SplitButtonOption {
    value: string;
    label: string;
}
export declare class CaSplitButton extends LitElement {
    static styles: import("lit").CSSResult;
    variant: 'primary' | 'secondary' | 'tertiary';
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    options: SplitButtonOption[];
    value: string;
    label: string;
    loading: boolean;
    disabled: boolean;
    private _isOpen;
    private _focusedIndex;
    private _dropdown;
    private _triggerEl;
    private _boundClickOutside;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleClickOutside;
    private _handleMainClick;
    private _toggleDropdown;
    private _selectOption;
    private _handleTriggerKeydown;
    private _handleDropdownKeydown;
    private _focusOption;
    private _renderCheckIcon;
    private _renderChevron;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-split-button': CaSplitButton;
    }
}
