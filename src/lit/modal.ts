import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ca-modal')
export class CaModal extends LitElement {
  static styles = css`
    :host { display: contents; }
    .overlay { position: fixed; inset: 0; z-index: 9000; display: flex; align-items: center; justify-content: center; background-color: rgba(0,0,0,0.5); animation: overlay-fade-in 0.2s ease; }
    .panel { position: relative; background-color: var(--ca-surface-elevated); border-radius: var(--ca-radius-lg); box-shadow: var(--ca-shadow-lg); max-height: 90vh; overflow-y: auto; animation: panel-slide-up 0.25s ease; box-sizing: border-box; font-family: var(--ca-font-family); color: var(--ca-text-primary); }
    .sm { width: 90%; max-width: 400px; }
    .md { width: 90%; max-width: 560px; }
    .lg { width: 90%; max-width: 720px; }
    .full { width: 100%; height: 100%; max-width: none; max-height: none; border-radius: 0; }
    .header { display: flex; align-items: center; justify-content: space-between; padding: var(--ca-space-md) var(--ca-space-lg); font-weight: var(--ca-font-weight-semibold); font-size: var(--ca-font-size-lg); }
    .header .close-btn { background: none; border: none; cursor: pointer; padding: 4px; color: var(--ca-text-secondary); border-radius: var(--ca-radius-sm); line-height: 0; }
    .header .close-btn:hover { color: var(--ca-text-primary); background: var(--ca-surface-hover); }
    .body { padding: var(--ca-space-lg); }
    .footer { display: flex; align-items: center; justify-content: flex-end; gap: var(--ca-space-sm); padding: var(--ca-space-md) var(--ca-space-lg); }
    .footer ::slotted(*) { margin: 0; }
    @keyframes overlay-fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes panel-slide-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  `;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) size: 'sm' | 'md' | 'lg' | 'full' = 'md';

  @query('.panel') private _panel!: HTMLElement;

  private _previouslyFocused: HTMLElement | null = null;
  private _boundKeydown = this._handleKeydown.bind(this);

  updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      if (this.open) {
        this._onOpen();
      } else {
        this._onClose();
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._onClose();
  }

  private _onOpen() {
    this._previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this._boundKeydown);

    this.updateComplete.then(() => {
      this._panel?.focus();
    });
  }

  private _onClose() {
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this._boundKeydown);

    if (this._previouslyFocused) {
      this._previouslyFocused.focus();
      this._previouslyFocused = null;
    }
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      this._emitClose();
      return;
    }

    if (e.key === 'Tab') {
      this._trapFocus(e);
    }
  }

  private _trapFocus(e: KeyboardEvent) {
    const panel = this._panel;
    if (!panel) return;

    // Gather focusable elements within both shadow DOM and slotted content
    const focusable = this._getFocusableElements(panel);
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first || this.shadowRoot?.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last || this.shadowRoot?.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  private _getFocusableElements(root: HTMLElement): HTMLElement[] {
    const selector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const elements: HTMLElement[] = [];

    // Check shadow DOM children
    const shadowEls = root.querySelectorAll(selector);
    shadowEls.forEach((el) => elements.push(el as HTMLElement));

    // Check slotted content
    const slots = root.querySelectorAll('slot');
    slots.forEach((slot) => {
      const assigned = (slot as HTMLSlotElement).assignedElements({ flatten: true });
      assigned.forEach((el) => {
        if ((el as HTMLElement).matches?.(selector)) {
          elements.push(el as HTMLElement);
        }
        const nested = el.querySelectorAll(selector);
        nested.forEach((n) => elements.push(n as HTMLElement));
      });
    });

    return elements;
  }

  private _handleOverlayClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      this._emitClose();
    }
  }

  private _emitClose() {
    this.dispatchEvent(new CustomEvent('ca-close', { bubbles: true, composed: true }));
  }

  render() {
    if (!this.open) return nothing;

    return html`
      <div class="overlay" @click=${this._handleOverlayClick}>
        <div
          class=${classMap({ panel: true, [this.size]: true })}
          role="dialog"
          aria-modal="true"
          tabindex="-1"
        >
          <div class="header">
            <slot name="header"></slot>
            <button class="close-btn" type="button" aria-label="Close" @click=${this._emitClose}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </button>
          </div>
          <div class="body">
            <slot></slot>
          </div>
          <div class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-modal': CaModal;
  }
}
