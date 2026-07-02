import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface UnderlineTab {
  id: string;
  label: string;
  icon?: string;
}

@customElement('ca-underline-tabs')
export class CaUnderlineTabs extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: stretch;
      gap: 2px;
      border-bottom: 1px solid var(--ca-border);
    }
    .tab {
      display: flex;
      align-items: center;
      padding: 0;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      line-height: 1;
      color: var(--ca-text-muted);
      font-weight: var(--ca-font-weight-medium);
      position: relative;
      box-sizing: border-box;
      transition: color var(--ca-transition-fast);
    }
    .tab:focus-visible {
      outline: none;
      border-radius: var(--ca-radius-sm);
      box-shadow: var(--ca-shadow-focus);
    }
    .tab:hover {
      color: var(--ca-text-primary);
    }
    .tab.active {
      color: var(--ca-text-primary);
      font-weight: var(--ca-font-weight-semibold);
    }
    .tab-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
      padding: 0 12px 11px;
    }
    .tab-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      color: inherit;
    }
    .tab-icon svg {
      width: 100%;
      height: 100%;
    }
    .tab-label {
      white-space: nowrap;
    }
    .indicator {
      position: absolute;
      left: 0;
      right: 0;
      bottom: -1px;
      height: 2px;
      background-color: transparent;
      border-radius: 1px 1px 0 0;
    }
    .tab.active .indicator {
      background-color: var(--ca-color-primary);
    }
  `;

  @property({ type: Array }) tabs: UnderlineTab[] = [];
  @property({ type: String, attribute: 'active-id' }) activeId = '';

  private _handleClick(tab: UnderlineTab) {
    this.activeId = tab.id;
    this.dispatchEvent(
      new CustomEvent('ca-change', {
        detail: { id: tab.id },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      ${this.tabs.map(
        (tab) => html`
          <button
            class=${classMap({ tab: true, active: tab.id === this.activeId })}
            role="tab"
            aria-selected=${tab.id === this.activeId}
            @click=${() => this._handleClick(tab)}
          >
            <span class="tab-content">
              ${tab.icon ? html`<span class="tab-icon">${unsafeHTML(tab.icon)}</span>` : nothing}
              <span class="tab-label">${tab.label}</span>
            </span>
            <span class="indicator"></span>
          </button>
        `
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-underline-tabs': CaUnderlineTabs;
  }
}
