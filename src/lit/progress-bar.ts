import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ca-progress-bar')
export class CaProgressBar extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }
    .track {
      flex: 1;
      height: 6px;
      border-radius: var(--ca-radius-full);
      background-color: var(--ca-surface-active);
      overflow: hidden;
    }
    :host([size='md']) .track {
      height: 8px;
    }
    .fill {
      height: 100%;
      border-radius: var(--ca-radius-full);
      background-color: var(--ca-color-primary);
      transition: width var(--ca-transition-normal);
      min-width: 0;
    }
    .label {
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-secondary);
      white-space: nowrap;
      flex-shrink: 0;
    }
    :host([size='md']) .label {
      font-size: var(--ca-font-size-sm);
    }
  `;

  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Boolean, reflect: true, attribute: 'show-label' }) showLabel = false;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' = 'sm';
  @property({ type: String }) labelSuffix = '';

  private get _percent(): number {
    if (this.max <= 0) return 0;
    return Math.min(100, Math.max(0, (this.value / this.max) * 100));
  }

  render() {
    return html`
      <div class="track" role="progressbar" aria-valuenow=${this.value} aria-valuemin="0" aria-valuemax=${this.max}>
        <div class="fill" style="width:${this._percent}%"></div>
      </div>
      ${this.showLabel
        ? html`<span class="label">${this.value}/${this.max}${this.labelSuffix ? ` ${this.labelSuffix}` : ''}</span>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-progress-bar': CaProgressBar;
  }
}
