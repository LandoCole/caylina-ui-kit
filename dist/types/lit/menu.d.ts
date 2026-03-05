import { LitElement } from 'lit';
export interface MenuItem {
    label: string;
    href?: string;
    bold?: boolean;
    action?: string;
}
export interface MenuSection {
    items: MenuItem[];
}
export declare class CaMenu extends LitElement {
    static styles: import("lit").CSSResult;
    sections: MenuSection[];
    private _handleItemClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-menu': CaMenu;
    }
}
