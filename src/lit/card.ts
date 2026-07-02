import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ca-card')
export class CaCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-lg);
      background-color: var(--ca-surface);
      font-family: var(--ca-font-family);
      padding: 24px;
      box-shadow: var(--ca-shadow-sm);
      box-sizing: border-box;
    }
    :host([padding='none']) { padding: 0; }
    :host([padding='sm']) { padding: 16px; }
    :host([padding='md']) { padding: 24px; }
    :host([padding='lg']) { padding: 32px; }

    :host([elevated]) {
      box-shadow: var(--ca-shadow-sm);
    }
    :host([flat]) {
      box-shadow: none;
    }
    :host([interactive]) {
      cursor: pointer;
      transition: border-color var(--ca-transition-fast), box-shadow var(--ca-transition-fast), transform var(--ca-transition-fast);
    }
    :host([interactive]:hover) {
      border-color: var(--ca-border-strong);
      box-shadow: var(--ca-shadow-sm);
    }
  `;

  @property({ type: String, reflect: true }) padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, reflect: true }) elevated = false;
  @property({ type: Boolean, reflect: true }) flat = false;
  @property({ type: Boolean, reflect: true }) interactive = false;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-card': CaCard;
  }
}
