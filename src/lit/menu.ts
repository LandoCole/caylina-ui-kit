import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export interface MenuItem {
  label: string;
  href?: string;
  bold?: boolean;
  action?: string;
}

export interface MenuSection {
  items: MenuItem[];
}

@customElement('ca-menu')
export class CaMenu extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      background-color: var(--ca-surface);
      border-radius: 16px;
      box-shadow: var(--ca-shadow-menu);
      padding: 12px 0;
      min-width: 200px;
      overflow: hidden;
    }
    .item {
      display: block;
      width: 100%;
      padding: 12px 24px;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-weight: 400;
      font-size: 14px;
      line-height: 1;
      color: var(--ca-text-primary);
      text-align: left;
      text-decoration: none;
      box-sizing: border-box;
    }
    .item:hover {
      background-color: var(--ca-surface-hover);
    }
    .item:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: -2px;
    }
    .item.bold {
      font-weight: var(--ca-font-weight-semibold);
    }
    .divider {
      height: 1px;
      background-color: var(--ca-border);
      margin: 8px 0;
      border: none;
    }
  `;

  @property({ type: Array }) sections: MenuSection[] = [];

  private _handleItemClick(item: MenuItem) {
    this.dispatchEvent(
      new CustomEvent('ca-select', {
        detail: { label: item.label, action: item.action },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      ${this.sections.map(
        (section, sIdx) => html`
          ${sIdx > 0 ? html`<hr class="divider" />` : nothing}
          ${section.items.map((item) =>
            item.href
              ? html`<a class=${classMap({ item: true, bold: !!item.bold })} href=${item.href}>${item.label}</a>`
              : html`<button class=${classMap({ item: true, bold: !!item.bold })} @click=${() => this._handleItemClick(item)}>${item.label}</button>`
          )}
        `
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-menu': CaMenu;
  }
}
