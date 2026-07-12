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
      gap: 12px;
      padding: 20px 24px;
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
      color: var(--ca-text-secondary);
    }
    .icon-slot ::slotted(svg) {
      width: 28px;
      height: 28px;
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

    /* Tone variants — CA alert style: thick colored left rule, no fill/box.
       A whisper of tint keeps the bar legible on the page surface. */
    :host([tone='warning']) .callout,
    :host([tone='success']) .callout,
    :host([tone='danger']) .callout,
    :host([tone='info']) .callout {
      border: none;
      border-radius: 0;
      border-left: 3px solid var(--ca-divider);
      background-color: transparent;
      padding: 12px 16px;
    }
    :host([tone='warning']) .callout {
      border-left-color: var(--ca-color-warning);
      background-color: color-mix(in srgb, var(--ca-color-warning) 5%, transparent);
    }
    :host([tone='warning']) .icon-slot { color: var(--ca-color-warning); }
    :host([tone='success']) .callout {
      border-left-color: var(--ca-color-success);
      background-color: color-mix(in srgb, var(--ca-color-success) 5%, transparent);
    }
    :host([tone='success']) .icon-slot { color: var(--ca-color-success); }
    :host([tone='danger']) .callout {
      border-left-color: var(--ca-color-danger);
      background-color: color-mix(in srgb, var(--ca-color-danger) 5%, transparent);
    }
    :host([tone='danger']) .icon-slot { color: var(--ca-color-danger); }
    :host([tone='info']) .callout {
      border-left-color: var(--ca-color-info);
      background-color: color-mix(in srgb, var(--ca-color-info) 5%, transparent);
    }
    :host([tone='info']) .icon-slot { color: var(--ca-color-info); }
  `;

  @property({ type: String, reflect: true }) variant: 'highlight' | 'info' = 'highlight';
  @property({ type: String, reflect: true }) tone: 'neutral' | 'warning' | 'success' | 'danger' | 'info' = 'neutral';

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
