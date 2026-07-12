import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ca-badge')
export class CaBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      border-radius: var(--ca-radius-sm);
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-bold);
      text-transform: uppercase;
      letter-spacing: var(--ca-tracking-label);
      line-height: 1;
      white-space: nowrap;
      box-sizing: border-box;
      /* Default = solid navy (brand) */
      color: var(--ca-color-on-primary);
      background-color: var(--ca-color-primary);
      border: none;
    }

    /* Sizes */
    :host([size='sm']) {
      font-size: 10px;
      min-width: 18px;
      height: 18px;
      padding: 0 7px;
    }
    :host, :host([size='md']) {
      font-size: 11px;
      min-width: 20px;
      height: 20px;
      padding: 0 8px;
    }

    /* Dot mode — solid round marker */
    :host([dot]) {
      padding: 0;
      border: none;
      border-radius: var(--ca-radius-full);
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

    /* Variants — solid semantic fills, white text (CA badge style) */
    :host([variant='success']) {
      color: #fff;
      background-color: var(--ca-color-success);
    }
    :host([variant='warning']) {
      color: #fff;
      background-color: var(--ca-color-warning);
    }
    :host([variant='danger']) {
      color: #fff;
      background-color: var(--ca-color-danger);
    }

    /* Dot variant retains solid color */
    :host([dot][variant='success']) {
      background-color: var(--ca-color-success);
    }
    :host([dot][variant='warning']) {
      background-color: var(--ca-color-warning);
    }
    :host([dot][variant='danger']) {
      background-color: var(--ca-color-danger);
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
        if (this.dot) {
          this.style.backgroundColor = this.color;
          this.style.removeProperty('color');
          this.style.removeProperty('border-color');
        } else {
          /* Solid fill from the data palette, white text (CA badge style) */
          this.style.color = '#fff';
          this.style.backgroundColor = this.color;
          this.style.removeProperty('border-color');
        }
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
