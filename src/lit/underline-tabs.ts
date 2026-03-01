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
      align-items: center;
      gap: 0;
    }
    .tab {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
      padding: 0;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: 14px;
      line-height: 1;
      color: var(--ca-text-muted);
      font-weight: 400;
      position: relative;
      box-sizing: border-box;
      border-radius: var(--ca-radius-md);
    }
    .tab:focus-visible {
      outline: 2px solid var(--ca-color-focus-ring);
      outline-offset: 4px;
      border-radius: var(--ca-radius-md);
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
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
    }
    .tab-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
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
      display: block;
      width: 100%;
      height: 2px;
      background-color: transparent;
      border-radius: 1px;
    }
    .tab.active .indicator {
      background-color: var(--ca-text-primary);
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
