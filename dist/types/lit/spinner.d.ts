import { LitElement } from 'lit';
export declare class CaSpinner extends LitElement {
    static styles: import("lit").CSSResult;
    size: 'sm' | 'md' | 'lg';
    variant: 'dots' | 'circular';
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-spinner': CaSpinner;
    }
}
