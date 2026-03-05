import { LitElement, nothing } from 'lit';
export interface ToastItem {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    duration: number;
    exiting: boolean;
}
export interface ToastOptions {
    type?: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
}
export declare class CaToastContainer extends LitElement {
    static styles: import("lit").CSSResult;
    private _toasts;
    private _timers;
    disconnectedCallback(): void;
    toast(message: string, options?: ToastOptions): void;
    private _dismiss;
    private _renderCloseIcon;
    render(): typeof nothing | import("lit-html").TemplateResult<1>;
}
/**
 * Standalone toast function that finds or creates the container element.
 */
export declare function toast(message: string, options?: {
    type?: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
}): void;
declare global {
    interface HTMLElementTagNameMap {
        'ca-toast-container': CaToastContainer;
    }
}
