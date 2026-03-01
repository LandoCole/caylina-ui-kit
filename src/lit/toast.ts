import { LitElement, html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

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

let _nextId = 0;

@customElement('ca-toast-container')
export class CaToastContainer extends LitElement {
  static styles = css`
    :host { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 9500; display: flex; flex-direction: column; gap: 8px; align-items: center; pointer-events: none; }
    .toast { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: var(--ca-radius-md); font-family: var(--ca-font-family); font-size: 13px; box-shadow: var(--ca-shadow-md); pointer-events: auto; animation: toast-slide-in 0.25s ease; white-space: nowrap; }
    .toast.exiting { animation: toast-slide-out 0.2s ease forwards; }
    .info { background-color: var(--ca-text-primary); color: var(--ca-surface); }
    .success { background-color: var(--ca-color-success); color: white; }
    .error { background-color: var(--ca-color-danger); color: white; }
    .warning { background-color: var(--ca-color-warning); color: white; }
    .message { flex: 1; line-height: 1.4; }
    .close { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 0; border: none; background: none; color: inherit; cursor: pointer; opacity: 0.7; transition: opacity 0.15s ease; }
    .close:hover { opacity: 1; }
    @keyframes toast-slide-in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes toast-slide-out { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(16px); } }
  `;

  @state() private _toasts: ToastItem[] = [];

  private _timers = new Map<number, ReturnType<typeof setTimeout>>();

  disconnectedCallback() {
    super.disconnectedCallback();
    this._timers.forEach((timer) => clearTimeout(timer));
    this._timers.clear();
  }

  toast(message: string, options?: ToastOptions) {
    const id = _nextId++;
    const type = options?.type ?? 'info';
    const duration = options?.duration ?? 5000;

    const item: ToastItem = { id, message, type, duration, exiting: false };
    this._toasts = [...this._toasts, item];

    const timer = setTimeout(() => {
      this._dismiss(id);
    }, duration);
    this._timers.set(id, timer);
  }

  private _dismiss(id: number) {
    // Clear auto-dismiss timer if it exists
    const timer = this._timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this._timers.delete(id);
    }

    // Set exiting flag for animation
    this._toasts = this._toasts.map((t) =>
      t.id === id ? { ...t, exiting: true } : t
    );

    // Remove after exit animation completes
    setTimeout(() => {
      this._toasts = this._toasts.filter((t) => t.id !== id);
    }, 200);
  }

  private _renderCloseIcon() {
    return html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
  }

  render() {
    if (this._toasts.length === 0) return nothing;

    return html`
      ${this._toasts.map(
        (t) => html`
          <div class=${classMap({ toast: true, [t.type]: true, exiting: t.exiting })}>
            <span class="message">${t.message}</span>
            <button class="close" @click=${() => this._dismiss(t.id)} aria-label="Close">
              ${this._renderCloseIcon()}
            </button>
          </div>
        `
      )}
    `;
  }
}

/**
 * Standalone toast function that finds or creates the container element.
 */
export function toast(message: string, options?: { type?: 'success' | 'error' | 'info' | 'warning'; duration?: number }) {
  let container = document.querySelector('ca-toast-container') as CaToastContainer | null;
  if (!container) {
    container = document.createElement('ca-toast-container') as CaToastContainer;
    document.body.appendChild(container);
  }
  container.toast(message, options);
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-toast-container': CaToastContainer;
  }
}
