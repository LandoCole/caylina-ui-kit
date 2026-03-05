import { LitElement } from 'lit';
export declare class CaLink extends LitElement {
    static styles: import("lit").CSSResult;
    href: string;
    target: string;
    type: 'subtle' | 'legal';
    size: 'md' | 'sm';
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-link': CaLink;
    }
}
