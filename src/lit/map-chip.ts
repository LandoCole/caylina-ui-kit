import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ca-map-chip')
export class CaMapChip extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
    .map-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 8px;
      border-radius: 43px;
      background-color: var(--ca-surface);
      box-shadow: var(--ca-shadow-chip);
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-semibold);
      font-size: 14px;
      line-height: 1;
      color: var(--ca-text-primary);
      cursor: pointer;
      white-space: nowrap;
      border: 1px solid transparent;
      transition: background-color var(--ca-transition-fast), color var(--ca-transition-fast);
    }
    .map-chip:hover {
      transform: scale(1.05);
    }
    .map-chip.selected {
      background-color: var(--ca-color-secondary);
      color: var(--ca-color-secondary-text, var(--ca-color-white));
    }
    .map-chip.viewed {
      background-color: var(--ca-surface-active);
      border-color: var(--ca-border-strong);
    }
    .icon {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      color: var(--ca-color-primary);
      display: flex;
      align-items: center;
    }
    .icon ::slotted(svg) {
      width: 100%;
      height: 100%;
    }
    :host([disabled]) .map-chip {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  `;

  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean, reflect: true }) viewed = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _handleClick() {
    if (this.disabled) return;
    this.selected = !this.selected;
    this.dispatchEvent(
      new CustomEvent('ca-change', {
        detail: { selected: this.selected },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <button
        class=${classMap({
          'map-chip': true,
          selected: this.selected,
          viewed: this.viewed && !this.selected,
        })}
        ?disabled=${this.disabled}
        aria-pressed=${this.selected}
        @click=${this._handleClick}
      >
        <slot></slot>
        <span class="icon"><slot name="icon-after"></slot></span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-map-chip': CaMapChip;
  }
}
