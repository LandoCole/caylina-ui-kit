import { LitElement } from 'lit';
export declare class CaDivider extends LitElement {
    static styles: import("lit").CSSResult;
    orientation: 'horizontal' | 'vertical';
    spacing: 'sm' | 'md' | 'lg' | '';
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-divider': CaDivider;
    }
}
