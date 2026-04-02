import { LitElement } from 'lit';
export interface PageNavItem {
    id: string;
    label: string;
    children?: PageNavItem[];
}
export declare class CaPageNav extends LitElement {
    static styles: import("lit").CSSResult;
    items: PageNavItem[];
    activeId: string;
    scrollOffset: number;
    scrollBehavior: 'smooth' | 'auto';
    private _expandedId;
    private _observer;
    private _visibleIds;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: Map<string, unknown>): void;
    private _getAllIds;
    private _setupObserver;
    private _teardownObserver;
    private _updateActiveFromVisible;
    private _handleItemClick;
    private _handleChildClick;
    private _scrollTo;
    render(): import("lit-html").TemplateResult<1>;
    private _renderItem;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-page-nav': CaPageNav;
    }
}
