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
      border-radius: var(--ca-radius-full);
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-medium, 500);
      line-height: 1;
      white-space: nowrap;
      box-sizing: border-box;
      /* Default = soft blue (info/neutral) */
      color: var(--ca-color-status-in-progress-fg, #2C5F8E);
      background-color: var(--ca-color-status-in-progress-bg, #E5EEF7);
      border: 1px solid color-mix(in srgb, var(--ca-color-status-in-progress, #4F7AB8) 30%, transparent);
    }

    /* Sizes */
    :host([size='sm']) {
      font-size: var(--ca-font-size-xs);
      min-width: 20px;
      height: 20px;
      padding: 0 8px;
    }
    :host, :host([size='md']) {
      font-size: var(--ca-font-size-xs);
      min-width: 24px;
      height: 24px;
      padding: 0 10px;
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

    /* Variants — soft tinted pills with matching colored borders */
    :host([variant='success']) {
      color: var(--ca-color-status-done-fg, var(--ca-color-success));
      background-color: var(--ca-color-status-done-bg, color-mix(in srgb, var(--ca-color-success) 14%, transparent));
      border-color: color-mix(in srgb, var(--ca-color-success) 30%, transparent);
    }
    :host([variant='warning']) {
      color: var(--ca-color-priority-medium-fg, var(--ca-color-warning));
      background-color: var(--ca-color-priority-medium-bg, color-mix(in srgb, var(--ca-color-warning) 18%, transparent));
      border-color: color-mix(in srgb, var(--ca-color-warning) 35%, transparent);
    }
    :host([variant='danger']) {
      color: var(--ca-color-priority-urgent-fg, var(--ca-color-danger));
      background-color: var(--ca-color-priority-urgent-bg, color-mix(in srgb, var(--ca-color-danger) 14%, transparent));
      border-color: color-mix(in srgb, var(--ca-color-danger) 30%, transparent);
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
          this.style.color = `color-mix(in srgb, ${this.color} 75%, var(--ca-text-primary))`;
          this.style.backgroundColor = `color-mix(in srgb, ${this.color} 14%, transparent)`;
          this.style.borderColor = `color-mix(in srgb, ${this.color} 30%, transparent)`;
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
