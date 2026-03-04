import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * `<ca-estimation-input>` — Compact numeric input with unit label.
 *
 * @fires ca-change - Dispatched when the value changes. detail: `{ value: number }`
 */
@customElement('ca-estimation-input')
export class CaEstimationInput extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      font-family: var(--ca-font-family);
    }

    .field {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      border: 1px solid var(--ca-border-input);
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-surface);
      transition: border-color var(--ca-transition-fast);
      box-sizing: border-box;
      padding: 6px 8px;
      font-size: var(--ca-font-size-sm);
    }
    .field:focus-within {
      border: 2px solid var(--ca-text-primary);
    }

    :host([borderless]) .field {
      border-color: transparent;
      background-color: transparent;
    }
    :host([borderless]) .field:focus-within {
      border: 2px solid var(--ca-text-primary);
    }

    /* Size: xs */
    :host([size='xs']) .field {
      padding: 3px 6px;
      font-size: var(--ca-font-size-xs);
      border-radius: 6px;
      gap: 3px;
    }
    /* Size: sm */
    :host([size='sm']) .field {
      padding: 4px 6px;
      font-size: var(--ca-font-size-xs);
      border-radius: 6px;
    }
    /* Size: md — default, handled by base .field */
    /* Size: lg */
    :host([size='lg']) .field {
      padding: 10px 12px;
      font-size: var(--ca-font-size-md);
      border-radius: 10px;
      gap: 6px;
    }

    .native {
      width: 48px;
      min-width: 0;
      border: none;
      outline: none;
      background: transparent;
      color: var(--ca-text-primary);
      font-family: inherit;
      font-size: inherit;
      line-height: 1;
      text-align: right;
      -moz-appearance: textfield;
    }
    .native::-webkit-inner-spin-button,
    .native::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .unit {
      font-size: inherit;
      color: var(--ca-text-muted);
      white-space: nowrap;
      user-select: none;
      line-height: 1;
    }
  `;

  @property({ type: Number }) value = 0;
  @property({ type: String, reflect: true }) unit: 'hours' | 'points' | 'days' = 'hours';
  @property({ type: Boolean, reflect: true }) borderless = false;
  @property({ type: String, reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

  private get _unitLabel(): string {
    switch (this.unit) {
      case 'hours': return 'h';
      case 'points': return 'pts';
      case 'days': return 'd';
      default: return this.unit;
    }
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const parsed = parseFloat(input.value);
    this.value = Number.isNaN(parsed) ? 0 : parsed;
  }

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const parsed = parseFloat(input.value);
    this.value = Number.isNaN(parsed) ? 0 : parsed;
    this.dispatchEvent(
      new CustomEvent('ca-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="field">
        <input
          class="native"
          type="number"
          .value=${String(this.value)}
          min="0"
          step="any"
          @input=${this._handleInput}
          @change=${this._handleChange}
        />
        <span class="unit">${this._unitLabel}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-estimation-input': CaEstimationInput;
  }
}
