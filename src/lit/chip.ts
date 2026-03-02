import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ca-chip')
export class CaChip extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 20px;
      border-radius: 50px;
      border: 1px solid var(--ca-border);
      background-color: var(--ca-surface);
      font-family: var(--ca-font-family);
      font-weight: 400;
      font-size: 14px;
      line-height: 1;
      color: var(--ca-text-primary);
      cursor: pointer;
      white-space: nowrap;
      transition: background-color var(--ca-transition-fast), border-color var(--ca-transition-fast), color var(--ca-transition-fast), transform 0.1s ease;
      box-sizing: border-box;
    }
    /* Size: sm */
    :host([size='sm']) .chip {
      padding: 6px 12px;
      font-size: 12px;
    }
    .chip:hover {
      border-color: var(--ca-text-primary);
    }
    .chip:active {
      border-color: var(--ca-text-primary);
      transform: scale(0.96);
    }
    .chip:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--ca-surface), 0 0 0 5px var(--ca-text-primary);
      border-color: var(--ca-text-primary);
    }
    .chip.selected {
      background-color: var(--ca-color-secondary);
      border-color: var(--ca-color-secondary);
      color: var(--ca-color-white);
    }
    :host([disabled]) .chip {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  `;

  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' = 'md';

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
        class=${classMap({ chip: true, selected: this.selected })}
        ?disabled=${this.disabled}
        aria-pressed=${this.selected}
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-chip': CaChip;
  }
}
