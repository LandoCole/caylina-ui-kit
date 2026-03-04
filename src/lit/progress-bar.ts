import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface ProgressSegment {
  value: number;
  color: string;
  label?: string;
}

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
      height: 8px;
      border-radius: var(--ca-radius-full);
      background-color: var(--ca-surface-active);
      overflow: hidden;
      display: flex;
    }
    :host([size='sm']) .track {
      height: 6px;
    }
    .fill {
      height: 100%;
      background-color: var(--ca-color-primary);
      transition: width var(--ca-transition-normal);
      min-width: 0;
    }
    .fill:first-child {
      border-radius: var(--ca-radius-full) 0 0 var(--ca-radius-full);
    }
    .fill:last-child {
      border-radius: 0 var(--ca-radius-full) var(--ca-radius-full) 0;
    }
    .fill:only-child {
      border-radius: var(--ca-radius-full);
    }
    .label {
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-secondary);
      white-space: nowrap;
      flex-shrink: 0;
    }
    :host([size='sm']) .label {
      font-size: var(--ca-font-size-xs);
    }
  `;

  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Boolean, reflect: true, attribute: 'show-label' }) showLabel = false;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' = 'md';
  @property({ type: String }) labelSuffix = '';

  /** Dynamic fill color (overrides default primary). */
  @property({ type: String }) color = '';

  /** Stacked mode: array of segments for multi-segment progress (e.g. group headers). */
  @property({ type: Array, attribute: false }) segments: ProgressSegment[] = [];

  private get _percent(): number {
    if (this.max <= 0) return 0;
    return Math.min(100, Math.max(0, (this.value / this.max) * 100));
  }

  render() {
    const isStacked = this.segments.length > 0;

    return html`
      <div class="track" role="progressbar" aria-valuenow=${this.value} aria-valuemin="0" aria-valuemax=${this.max}>
        ${isStacked
          ? this.segments.map((seg) => {
              const pct = this.max > 0 ? Math.min(100, Math.max(0, (seg.value / this.max) * 100)) : 0;
              return html`<div class="fill" style="width:${pct}%; background-color:${seg.color}"></div>`;
            })
          : html`<div class="fill" style="width:${this._percent}%${this.color ? `; background-color:${this.color}` : ''}"></div>`}
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
