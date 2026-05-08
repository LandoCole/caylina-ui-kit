import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export interface PillTab {
  id: string;
  label: string;
  count?: string | number;
}

@customElement('ca-pill-tabs')
export class CaPillTabs extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      width: fit-content;
    }
    .tab {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 6px 12px;
      min-width: 0;
      border-radius: var(--ca-radius-full);
      border: 1px solid transparent;
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-medium, 500);
      font-size: var(--ca-font-size-sm);
      line-height: 1;
      color: var(--ca-text-secondary);
      white-space: nowrap;
      box-sizing: border-box;
      transition: background-color var(--ca-transition-fast), color var(--ca-transition-fast), border-color var(--ca-transition-fast);
    }
    .tab:hover {
      color: var(--ca-text-primary);
      background-color: var(--ca-surface-hover);
    }
    .tab:focus-visible {
      outline: none;
      border-color: var(--ca-text-primary);
    }
    .tab.active {
      background-color: var(--ca-surface);
      border-color: var(--ca-border);
      color: var(--ca-text-primary);
      font-weight: var(--ca-font-weight-semibold);
      box-shadow: var(--ca-shadow-sm);
    }
    .count {
      font-size: var(--ca-font-size-xs);
      font-weight: var(--ca-font-weight-medium, 500);
      color: var(--ca-text-muted);
    }
    .tab.active .count {
      color: var(--ca-text-secondary);
    }

    /* Filled variant — preserves the legacy segmented-control look */
    :host([filled]) {
      padding: 4px;
      background-color: var(--ca-surface-active);
      border-radius: var(--ca-radius-full);
    }
    :host([filled]) .tab {
      border-color: transparent;
    }
    :host([filled]) .tab:hover {
      background-color: var(--ca-surface);
    }
    :host([filled]) .tab.active {
      border-color: transparent;
    }
  `;

  @property({ type: Array }) tabs: PillTab[] = [];
  @property({ type: String, attribute: 'active-id' }) activeId = '';
  @property({ type: Boolean, reflect: true }) filled = false;

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
            <span>${tab.label}</span>
            ${tab.count != null ? html`<span class="count">${tab.count}</span>` : ''}
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
