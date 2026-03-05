import { LitElement } from 'lit';
export interface SideNavChild {
    id: string;
    label: string;
}
export interface SideNavItem {
    id: string;
    label: string;
    icon?: string;
    children?: SideNavChild[];
    danger?: boolean;
}
export interface SideNavSection {
    title?: string;
    items: SideNavItem[];
    grow?: boolean;
}
export interface SideNavProfile {
    name: string;
    role?: string;
    avatar?: string;
}
export declare class CaSidenav extends LitElement {
    static styles: import("lit").CSSResult;
    collapsed: boolean;
    activeId: string;
    profile: SideNavProfile | null;
    sections: SideNavSection[];
    private _openDropdowns;
    private _tooltip;
    private _popover;
    private _boundClickOutside;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleClickOutside;
    private _navigate;
    private _toggleCollapse;
    private _toggleDropdown;
    private _isItemActive;
    private _handleMouseEnter;
    private _handleMouseLeave;
    private _handleItemClick;
    private _renderProfile;
    private _renderSubItems;
    private _renderItem;
    private _renderSection;
    private _renderTooltip;
    private _renderPopover;
    private _getItemLabel;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-sidenav': CaSidenav;
    }
}
