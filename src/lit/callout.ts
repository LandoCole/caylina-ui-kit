import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ca-callout')
export class CaCallout extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .callout {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 24px;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-lg);
      background-color: var(--ca-surface);
      font-family: var(--ca-font-family);
    }
    .icon-slot {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon-slot ::slotted(svg) {
      width: 32px;
      height: 32px;
    }
    .content {
      flex: 1;
      min-width: 0;
    }

    /* Highlight variant */
    :host([variant='highlight']) .content {
      font-size: 16px;
      font-weight: 400;
      line-height: 1.4;
      color: var(--ca-text-primary);
    }

    /* Info variant */
    :host([variant='info']) .content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  `;

  @property({ type: String, reflect: true }) variant: 'highlight' | 'info' = 'highlight';

  render() {
    return html`
      <div class="callout">
        <span class="icon-slot"><slot name="icon"></slot></span>
        <div class="content"><slot></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-callout': CaCallout;
  }
}
