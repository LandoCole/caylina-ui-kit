import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface BulkAction {
  id: string;
  label: string;
  icon?: string;
}

@customElement('ca-bulk-action-bar')
export class CaBulkActionBar extends LitElement {
  static styles = css`
    :host {
      display: contents;
      font-family: var(--ca-font-family);
    }
    .bar {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 8000;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
      background-color: var(--ca-color-secondary);
      color: var(--ca-color-secondary-text, var(--ca-color-white));
      border-radius: var(--ca-radius-lg);
      box-shadow: var(--ca-shadow-lg);
      white-space: nowrap;
      animation: bar-slide-up 0.25s ease forwards;
    }
    .bar.closing {
      animation: bar-slide-down 0.2s ease forwards;
    }
    @keyframes bar-slide-up {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
    @keyframes bar-slide-down {
      from {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      to {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
      }
    }
    .count {
      font-size: 14px;
      font-weight: var(--ca-font-weight-semibold, 600);
      padding-right: 4px;
    }
    .divider {
      width: 1px;
      height: 20px;
      background-color: currentColor;
      opacity: 0.3;
      flex-shrink: 0;
    }
    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border: none;
      border-radius: var(--ca-radius-sm);
      background-color: rgba(255, 255, 255, 0.15);
      color: inherit;
      font-family: var(--ca-font-family);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      line-height: 1;
      white-space: nowrap;
      transition: background-color var(--ca-transition-fast);
    }
    .action-btn:hover {
      background-color: rgba(255, 255, 255, 0.25);
    }
    .action-btn:active {
      background-color: rgba(255, 255, 255, 0.35);
    }
    .action-btn:focus-visible {
      outline: 2px solid var(--ca-color-white);
      outline-offset: 1px;
    }
    .action-icon {
      display: inline-flex;
      align-items: center;
      width: 14px;
      height: 14px;
    }
    .action-icon ::slotted(svg),
    .action-icon svg {
      width: 100%;
      height: 100%;
    }
    .clear-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      margin-left: 4px;
      border: none;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.15);
      color: inherit;
      cursor: pointer;
      line-height: 0;
      transition: background-color var(--ca-transition-fast);
    }
    .clear-btn:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
    .clear-btn:active {
      background-color: rgba(255, 255, 255, 0.4);
    }
    .clear-btn:focus-visible {
      outline: 2px solid var(--ca-color-white);
      outline-offset: 1px;
    }
  `;

  @property({ type: Number }) count = 0;
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Array }) actions: BulkAction[] = [];

  private _closing = false;

  private _handleAction(id: string) {
    this.dispatchEvent(
      new CustomEvent('ca-action', {
        detail: { id },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleClear() {
    this._closing = true;
    this.requestUpdate();

    // Wait for slide-down animation to finish before emitting clear
    const bar = this.shadowRoot?.querySelector('.bar');
    const onEnd = () => {
      bar?.removeEventListener('animationend', onEnd);
      this._closing = false;
      this.dispatchEvent(
        new CustomEvent('ca-clear', {
          bubbles: true,
          composed: true,
        })
      );
    };
    bar?.addEventListener('animationend', onEnd);
  }

  render() {
    if (!this.open && !this._closing) return nothing;

    return html`
      <div class="bar ${this._closing ? 'closing' : ''}">
        <span class="count">${this.count} selected</span>
        <span class="divider"></span>
        ${this.actions.map(
          (action) => html`
            <button
              class="action-btn"
              @click=${() => this._handleAction(action.id)}
              aria-label=${action.label}
            >
              ${action.icon
                ? html`<span class="action-icon" .innerHTML=${action.icon}></span>`
                : nothing}
              ${action.label}
            </button>
          `
        )}
        <span class="divider"></span>
        <button
          class="clear-btn"
          @click=${this._handleClear}
          aria-label="Clear selection"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-bulk-action-bar': CaBulkActionBar;
  }
}
