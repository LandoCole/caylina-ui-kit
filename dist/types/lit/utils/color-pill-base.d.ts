import { LitElement, type CSSResultGroup } from 'lit';
export interface ColorPillOption {
    value: string;
    label: string;
    color: string;
    icon?: string;
}
/**
 * Base class for colored pill dropdown selectors (status, priority, phase).
 * Provides: colored pill trigger, dropdown with color dots, keyboard nav, allow-create.
 * Subclasses must call `super.render()` or use `renderPill()` / `renderDropdown()`.
 */
export declare class ColorPillBase extends LitElement {
    static styles: CSSResultGroup;
    options: ColorPillOption[];
    value: string;
    size: 'xs' | 'sm' | 'md' | 'lg';
    borderless: boolean;
    allowCreate: boolean;
    placeholder: string;
    protected _isOpen: boolean;
    private _focusedIndex;
    private _boundClickOutside;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleClickOutside;
    private _toggle;
    private _handlePillKeyDown;
    private _selectOption;
    private _handleCreate;
    protected get _selectedOption(): ColorPillOption | undefined;
    /** Override in subclass for custom icon rendering */
    protected renderOptionIcon(option: ColorPillOption): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
    private _renderDropdown;
}
