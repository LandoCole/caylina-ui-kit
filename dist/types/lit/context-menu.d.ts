import { LitElement, nothing } from 'lit';
export interface ContextMenuItem {
    id: string;
    label: string;
    icon?: string;
    danger?: boolean;
    divider?: boolean;
}
export declare class CaContextMenu extends LitElement {
    static styles: import("lit").CSSResult;
    items: ContextMenuItem[];
    open: boolean;
    x: number;
    y: number;
    private _handleSelect;
    private _close;
    private _handleOverlayClick;
    render(): typeof nothing | import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-context-menu': CaContextMenu;
    }
}
