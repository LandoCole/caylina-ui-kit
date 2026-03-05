import { LitElement } from 'lit';
export interface BreadcrumbItem {
    label: string;
    href?: string;
    id?: string;
}
export declare class CaBreadcrumb extends LitElement {
    static styles: import("lit").CSSResult;
    items: BreadcrumbItem[];
    separator: string;
    private _handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-breadcrumb': CaBreadcrumb;
    }
}
