import { LitElement } from 'lit';
export declare class CaChip extends LitElement {
    static styles: import("lit").CSSResult;
    selected: boolean;
    disabled: boolean;
    size: 'sm' | 'md';
    private _handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-chip': CaChip;
    }
}
