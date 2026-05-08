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

    /* Tone variants — tinted soft backgrounds with matching icon color */
    :host([tone='warning']) .callout {
      background-color: var(--ca-color-priority-medium-bg, #F8EFD7);
      border-color: color-mix(in srgb, var(--ca-color-warning) 30%, transparent);
    }
    :host([tone='warning']) .icon-slot {
      color: var(--ca-color-priority-medium-fg, var(--ca-color-warning));
    }
    :host([tone='success']) .callout {
      background-color: var(--ca-color-status-done-bg, #E0F2E7);
      border-color: color-mix(in srgb, var(--ca-color-success) 25%, transparent);
    }
    :host([tone='success']) .icon-slot {
      color: var(--ca-color-status-done-fg, var(--ca-color-success));
    }
    :host([tone='danger']) .callout {
      background-color: var(--ca-color-priority-urgent-bg, #FBE5E5);
      border-color: color-mix(in srgb, var(--ca-color-danger) 25%, transparent);
    }
    :host([tone='danger']) .icon-slot {
      color: var(--ca-color-priority-urgent-fg, var(--ca-color-danger));
    }
    :host([tone='info']) .callout {
      background-color: var(--ca-color-status-in-progress-bg, #E5EEF7);
      border-color: color-mix(in srgb, var(--ca-color-status-in-progress, #4F7AB8) 25%, transparent);
    }
    :host([tone='info']) .icon-slot {
      color: var(--ca-color-status-in-progress-fg, #2C5F8E);
    }
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
