import { LitElement } from 'lit';
export declare class CaToggle extends LitElement {
    static styles: import("lit").CSSResult;
    checked: boolean;
    disabled: boolean;
    size: 'sm' | 'md';
    label: string;
    subtext: string;
    private _handleChange;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-toggle': CaToggle;
    }
}
