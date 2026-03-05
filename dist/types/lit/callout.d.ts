import { LitElement } from 'lit';
export declare class CaCallout extends LitElement {
    static styles: import("lit").CSSResult;
    variant: 'highlight' | 'info';
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-callout': CaCallout;
    }
}
