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
    }
    :host([padding='none']) { padding: 0; }
    :host([padding='sm']) { padding: 16px; }
    :host([padding='md']) { padding: 24px; }
    :host([padding='lg']) { padding: 32px; }
  `;

  @property({ type: String, reflect: true }) padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-card': CaCard;
  }
}
