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
      color: var(--ca-color-secondary);
      background-color: color-mix(in srgb, var(--ca-color-secondary) 15%, transparent);
      border: 1px solid color-mix(in srgb, var(--ca-color-secondary) 40%, transparent);
    }

    /* Sizes */
    :host([size='sm']) {
      font-size: var(--ca-font-size-xs);
      min-width: 18px;
      height: 18px;
      padding: 2px 10px;
    }
    :host, :host([size='md']) {
      font-size: var(--ca-font-size-sm);
      min-width: 22px;
      height: 22px;
      padding: 2px 12px;
    }

    /* Dot mode */
    :host([dot]) {
      padding: 0;
      border: none;
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
    :host([variant='success']) {
      color: var(--ca-color-success);
      background-color: color-mix(in srgb, var(--ca-color-success) 15%, transparent);
      border-color: color-mix(in srgb, var(--ca-color-success) 40%, transparent);
    }
    :host([variant='warning']) {
      color: var(--ca-color-warning);
      background-color: color-mix(in srgb, var(--ca-color-warning) 15%, transparent);
      border-color: color-mix(in srgb, var(--ca-color-warning) 40%, transparent);
    }
    :host([variant='danger']) {
      color: var(--ca-color-danger);
      background-color: color-mix(in srgb, var(--ca-color-danger) 15%, transparent);
      border-color: color-mix(in srgb, var(--ca-color-danger) 40%, transparent);
    }
  `;

  @property({ type: String, reflect: true }) variant: 'default' | 'success' | 'warning' | 'danger' = 'default';
  @property({ type: String, reflect: true }) size: 'sm' | 'md' = 'md';
  @property({ type: Boolean, reflect: true }) dot = false;

  /** Arbitrary background color (overrides variant). */
  @property({ type: String }) color = '';

  updated(changedProperties: Map<string, unknown>) {
    super.updated?.(changedProperties);
    if (changedProperties.has('color')) {
      if (this.color) {
        this.style.color = this.color;
        this.style.backgroundColor = `color-mix(in srgb, ${this.color} 15%, transparent)`;
        this.style.borderColor = `color-mix(in srgb, ${this.color} 40%, transparent)`;
      } else {
        this.style.removeProperty('color');
        this.style.removeProperty('background-color');
        this.style.removeProperty('border-color');
      }
    }
  }

  render() {
    return this.dot ? html`` : html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-badge': CaBadge;
  }
}
