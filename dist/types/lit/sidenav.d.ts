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
    /** Optional right-aligned accessory — raw HTML string (badge, icon, etc.) */
    accessory?: string;
}
export interface SideNavSection {
    title?: string;
    items: SideNavItem[];
    grow?: boolean;
}
export interface SideNavProfileAction {
    id: string;
    label: string;
    icon?: string;
    danger?: boolean;
}
export declare class CaSidenav extends LitElement {
    static styles: import("lit").CSSResult;
    collapsed: boolean;
    activeId: string;
    sections: SideNavSection[];
    profileActions: SideNavProfileAction[];
    private _openDropdowns;
    private _tooltip;
    private _popover;
    private _profilePopover;
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
    private _toggleProfilePopover;
    private _handleProfileAction;
    private _renderSubItems;
    private _renderItem;
    private _renderSection;
    private _renderTooltip;
    private _renderPopover;
    private _renderProfilePopover;
    private _getItemLabel;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-sidenav': CaSidenav;
    }
}
