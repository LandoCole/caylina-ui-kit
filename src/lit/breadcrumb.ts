import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  id?: string;
}

@customElement('ca-breadcrumb')
export class CaBreadcrumb extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-secondary);
    }
    .separator {
      color: var(--ca-text-tertiary);
      user-select: none;
    }
    .item {
      display: inline-flex;
      align-items: center;
    }
    .link {
      color: var(--ca-text-secondary);
      text-decoration: none;
      cursor: pointer;
      border-radius: var(--ca-radius-sm);
      padding: 2px 4px;
      margin: -2px -4px;
      background: none;
      border: none;
      font: inherit;
      line-height: inherit;
    }
    .link:hover {
      color: var(--ca-text-primary);
      background-color: var(--ca-surface-hover);
    }
    .link:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: 2px;
    }
    .current {
      color: var(--ca-text-primary);
      font-weight: var(--ca-font-weight-semibold);
    }
  `;

  @property({ type: Array }) items: BreadcrumbItem[] = [];
  @property({ type: String }) separator = '/';

  private _handleClick(item: BreadcrumbItem) {
    this.dispatchEvent(
      new CustomEvent('ca-navigate', {
        detail: { item },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      ${this.items.map((item, idx) => {
        const isLast = idx === this.items.length - 1;
        return html`
          ${idx > 0 ? html`<span class="separator">${this.separator}</span>` : nothing}
          <span class="item">
            ${isLast
              ? html`<span class="current">${item.label}</span>`
              : item.href
                ? html`<a class="link" href=${item.href} @click=${(e: Event) => { e.preventDefault(); this._handleClick(item); }}>${item.label}</a>`
                : html`<button class="link" @click=${() => this._handleClick(item)}>${item.label}</button>`
            }
          </span>
        `;
      })}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-breadcrumb': CaBreadcrumb;
  }
}
