import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  danger?: boolean;
  divider?: boolean;
}

@customElement('ca-context-menu')
export class CaContextMenu extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
    }
    .menu {
      position: fixed;
      z-index: 10000;
      background-color: var(--ca-surface-elevated);
      border-radius: var(--ca-radius-md);
      box-shadow: var(--ca-shadow-menu);
      padding: 6px 0;
      min-width: 180px;
      font-family: var(--ca-font-family);
      animation: fade-in 0.12s ease;
    }
    .item {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 8px 16px;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      text-align: left;
      line-height: 1;
      box-sizing: border-box;
    }
    .item:hover {
      background-color: var(--ca-surface-hover);
    }
    .item:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: -2px;
    }
    .item.danger {
      color: var(--ca-color-danger);
    }
    .item.danger:hover {
      background-color: var(--ca-color-danger);
      color: var(--ca-color-white);
    }
    .icon {
      display: inline-flex;
      width: 16px;
      height: 16px;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 16px;
    }
    .divider {
      height: 1px;
      background-color: var(--ca-border);
      margin: 4px 0;
      border: none;
    }
    @keyframes fade-in {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;

  @property({ type: Array }) items: ContextMenuItem[] = [];
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Number }) x = 0;
  @property({ type: Number }) y = 0;

  private _handleSelect(item: ContextMenuItem) {
    this.dispatchEvent(
      new CustomEvent('ca-select', {
        detail: { id: item.id },
        bubbles: true,
        composed: true,
      })
    );
    this._close();
  }

  private _close() {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('ca-close', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleOverlayClick() {
    this._close();
  }

  render() {
    if (!this.open) return nothing;

    return html`
      <div class="overlay" @click=${this._handleOverlayClick} @contextmenu=${(e: Event) => { e.preventDefault(); this._close(); }}></div>
      <div class="menu" style="left:${this.x}px;top:${this.y}px;">
        ${this.items.map(
          (item) => html`
            ${item.divider ? html`<hr class="divider" />` : nothing}
            <button
              class="item ${item.danger ? 'danger' : ''}"
              @click=${() => this._handleSelect(item)}
            >
              ${item.icon ? html`<span class="icon">${unsafeHTML(item.icon)}</span>` : nothing}
              ${item.label}
            </button>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-context-menu': CaContextMenu;
  }
}
