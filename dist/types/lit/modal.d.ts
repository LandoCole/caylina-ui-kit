import { LitElement, nothing } from 'lit';
export declare class CaModal extends LitElement {
    static styles: import("lit").CSSResult;
    open: boolean;
    size: 'sm' | 'md' | 'lg' | 'full';
    private _panel;
    private _previouslyFocused;
    private _boundKeydown;
    updated(changed: Map<string, unknown>): void;
    disconnectedCallback(): void;
    private _onOpen;
    private _onClose;
    private _handleKeydown;
    private _trapFocus;
    private _getFocusableElements;
    private _handleOverlayClick;
    private _emitClose;
    render(): typeof nothing | import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-modal': CaModal;
    }
}
