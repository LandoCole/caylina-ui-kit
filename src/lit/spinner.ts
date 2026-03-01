import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ca-spinner')
export class CaSpinner extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    /* Dots */
    .dots {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .dot {
      border-radius: 50%;
      background-color: var(--ca-text-secondary);
      animation: pulse 1.4s ease-in-out infinite;
    }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }

    /* Circular */
    .circle {
      display: block;
      border-radius: 50%;
      border: 2px solid var(--ca-text-secondary);
      border-top-color: transparent;
      animation: spin 0.8s linear infinite;
    }

    /* Sizes - dots */
    :host([size='sm']) .dot { width: 5px; height: 5px; }
    :host, :host([size='md']) { }
    :host([size='md']) .dot, .dot { width: 8px; height: 8px; }
    :host([size='lg']) .dot { width: 10px; height: 10px; }

    /* Sizes - circle */
    :host([size='sm']) .circle { width: 14px; height: 14px; }
    :host([size='md']) .circle, .circle { width: 20px; height: 20px; }
    :host([size='lg']) .circle { width: 28px; height: 28px; border-width: 3px; }

    @keyframes pulse {
      0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
      40% { opacity: 1; transform: scale(1); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: String, reflect: true }) variant: 'dots' | 'circular' = 'dots';

  render() {
    if (this.variant === 'circular') {
      return html`<span class="circle"></span>`;
    }
    return html`
      <span class="dots">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-spinner': CaSpinner;
  }
}
