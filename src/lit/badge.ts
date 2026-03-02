import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ca-badge')
export class CaBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--ca-radius-full);
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-semibold);
      line-height: 1;
      white-space: nowrap;
      box-sizing: border-box;
      color: var(--ca-color-white);
      background-color: var(--ca-color-secondary);
    }

    /* Sizes */
    :host([size='sm']) {
      font-size: var(--ca-font-size-xs);
      min-width: 18px;
      height: 18px;
      padding: 2px 6px;
    }
    :host, :host([size='md']) {
      font-size: var(--ca-font-size-sm);
      min-width: 22px;
      height: 22px;
      padding: 2px 8px;
    }

    /* Dot mode */
    :host([dot]) {
      padding: 0;
    }
    :host([dot][size='sm']) {
      width: 8px;
      height: 8px;
      min-width: 8px;
    }
    :host([dot]), :host([dot][size='md']) {
      width: 10px;
      height: 10px;
      min-width: 10px;
    }

    /* Variants */
    :host([variant='success']) { background-color: var(--ca-color-success); }
    :host([variant='warning']) { background-color: var(--ca-color-warning); }
    :host([variant='danger']) { background-color: var(--ca-color-danger); }
  `;

  @property({ type: String, reflect: true }) variant: 'default' | 'success' | 'warning' | 'danger' = 'default';
  @property({ type: String, reflect: true }) size: 'sm' | 'md' = 'md';
  @property({ type: Boolean, reflect: true }) dot = false;

  render() {
    return this.dot ? html`` : html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-badge': CaBadge;
  }
}
