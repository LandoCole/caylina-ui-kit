import { LitElement } from 'lit';
export declare class CaMapChip extends LitElement {
    static styles: import("lit").CSSResult;
    selected: boolean;
    viewed: boolean;
    disabled: boolean;
    private _handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-map-chip': CaMapChip;
    }
}
