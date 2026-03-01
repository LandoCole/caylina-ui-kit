import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export interface PillTab {
  id: string;
  label: string;
}

@customElement('ca-pill-tabs')
export class CaPillTabs extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: flex-start;
      padding: 4px;
      background-color: var(--ca-surface-active);
      border-radius: 50px;
      width: fit-content;
    }
    .tab {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 12px;
      min-width: 100px;
      border-radius: 500px;
      border: 2px solid transparent;
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-semibold);
      font-size: 14px;
      line-height: 1;
      color: var(--ca-text-primary);
      white-space: nowrap;
      box-sizing: border-box;
      transition: background-color var(--ca-transition-fast), box-shadow var(--ca-transition-fast);
    }
    .tab:hover {
      background-color: var(--ca-surface);
    }
    .tab:focus-visible {
      outline: none;
      border-color: var(--ca-text-primary);
      background-color: var(--ca-surface-hover);
    }
    .tab.active {
      background-color: var(--ca-surface);
      box-shadow: 0px 6px 17px 0px rgba(0, 0, 0, 0.08);
    }
  `;

  @property({ type: Array }) tabs: PillTab[] = [];
  @property({ type: String, attribute: 'active-id' }) activeId = '';

  private _handleClick(tab: PillTab) {
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
            ${tab.label}
          </button>
        `
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-pill-tabs': CaPillTabs;
  }
}
