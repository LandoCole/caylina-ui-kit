import { LitElement, nothing } from 'lit';
export declare class CaDrawer extends LitElement {
    static styles: import("lit").CSSResult;
    open: boolean;
    position: 'right' | 'bottom';
    size: string;
    heading: string;
    backdrop: boolean;
    /** Remove body padding. */
    noPadding: boolean;
    private _panel;
    private _previouslyFocused;
    private _boundKeydown;
    private _hasFooter;
    updated(changed: Map<string, unknown>): void;
    disconnectedCallback(): void;
    private _onOpen;
    private _onClose;
    private _handleKeydown;
    private _trapFocus;
    private _getFocusableElements;
    private _handleOverlayClick;
    private _emitClose;
    private _handleFooterSlotChange;
    render(): typeof nothing | import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-drawer': CaDrawer;
    }
}
