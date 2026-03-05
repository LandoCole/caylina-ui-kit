import { LitElement } from 'lit';
export declare class CaCard extends LitElement {
    static styles: import("lit").CSSResult;
    padding: 'none' | 'sm' | 'md' | 'lg';
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-card': CaCard;
    }
}
