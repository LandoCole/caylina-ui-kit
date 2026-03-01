import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ca-drawer')
export class CaDrawer extends LitElement {
  static styles = css`
    :host { display: contents; }

    .overlay {
      position: fixed;
      inset: 0;
      z-index: 9000;
      display: flex;
      animation: overlay-fade-in 0.3s ease;
    }
    .overlay.with-backdrop {
      background-color: rgba(0, 0, 0, 0.4);
    }

    .panel {
      position: fixed;
      display: flex;
      flex-direction: column;
      background-color: var(--ca-surface-elevated);
      box-shadow: var(--ca-shadow-lg);
      font-family: var(--ca-font-family);
      color: var(--ca-text-primary);
      box-sizing: border-box;
      overflow: hidden;
    }

    /* Right position */
    .panel.right {
      top: 0;
      right: 0;
      height: 100%;
      width: var(--drawer-size, 40%);
      max-width: 100%;
      animation: slide-in-right 0.3s ease;
    }

    /* Bottom position */
    .panel.bottom {
      bottom: 0;
      left: 0;
      width: 100%;
      height: var(--drawer-size, 40%);
      max-height: 100%;
      animation: slide-in-bottom 0.3s ease;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ca-space-md) var(--ca-space-lg);
      border-bottom: 1px solid var(--ca-border);
      flex-shrink: 0;
      gap: 12px;
    }
    .header-left {
      font-weight: var(--ca-font-weight-semibold);
      font-size: var(--ca-font-size-lg);
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      color: var(--ca-text-secondary);
      border-radius: var(--ca-radius-sm);
      line-height: 0;
    }
    .close-btn:hover {
      color: var(--ca-text-primary);
      background: var(--ca-surface-hover);
    }

    .body {
      flex: 1;
      overflow-y: auto;
      padding: var(--ca-space-lg);
    }

    .footer {
      border-top: 1px solid var(--ca-border);
      padding: var(--ca-space-md) var(--ca-space-lg);
      flex-shrink: 0;
    }
    .footer-empty { display: none; }

    @keyframes overlay-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slide-in-right {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    @keyframes slide-in-bottom {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
  `;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) position: 'right' | 'bottom' = 'right';
  @property({ type: String }) size = '40%';
  @property({ type: String }) heading = '';
  @property({ type: Boolean }) backdrop = true;

  @query('.panel') private _panel!: HTMLElement;

  private _previouslyFocused: HTMLElement | null = null;
  private _boundKeydown = this._handleKeydown.bind(this);
  private _hasFooter = false;

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

    const shadowEls = root.querySelectorAll(selector);
    shadowEls.forEach((el) => elements.push(el as HTMLElement));

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
    if (this.backdrop && e.target === e.currentTarget) {
      this._emitClose();
    }
  }

  private _emitClose() {
    this.dispatchEvent(new CustomEvent('ca-close', { bubbles: true, composed: true }));
  }

  private _handleFooterSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasFooter = slot.assignedElements({ flatten: true }).length > 0;
    this.requestUpdate();
  }

  render() {
    if (!this.open) return nothing;

    return html`
      <div
        class=${classMap({ overlay: true, 'with-backdrop': this.backdrop })}
        @click=${this._handleOverlayClick}
      >
        <aside
          class=${classMap({ panel: true, [this.position]: true })}
          style="--drawer-size: ${this.size}"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
        >
          <div class="header">
            <span class="header-left">${this.heading}</span>
            <div class="header-right">
              <slot name="header-actions"></slot>
              <button class="close-btn" type="button" aria-label="Close" @click=${this._emitClose}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="body">
            <slot></slot>
          </div>
          <div class=${this._hasFooter ? 'footer' : 'footer-empty'}>
            <slot name="footer" @slotchange=${this._handleFooterSlotChange}></slot>
          </div>
        </aside>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-drawer': CaDrawer;
  }
}
