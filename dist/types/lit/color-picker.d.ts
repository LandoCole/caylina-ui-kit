import { LitElement } from 'lit';
export declare class CaColorPicker extends LitElement {
    static styles: import("lit").CSSResult;
    value: string;
    presets: string[];
    size: 'sm' | 'md';
    allowCustom: boolean;
    private _customHex;
    private _selectColor;
    private _handleCustomInput;
    private _handleCustomKeydown;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-color-picker': CaColorPicker;
    }
}
