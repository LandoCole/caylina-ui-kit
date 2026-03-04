import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

const DEFAULT_PRESETS = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#14b8a6',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#6b7280',
  '#374151',
  '#1e3a5f',
];

@customElement('ca-color-picker')
export class CaColorPicker extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      font-family: var(--ca-font-family);
    }
    .picker {
      background-color: var(--ca-surface-elevated);
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      padding: var(--ca-space-sm);
      box-shadow: var(--ca-shadow-md);
      box-sizing: border-box;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 8px;
    }
    :host([size='sm']) .grid {
      gap: 6px;
    }
    .swatch {
      position: relative;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      padding: 0;
      outline: none;
      box-sizing: border-box;
      transition: transform 0.1s ease, border-color var(--ca-transition-fast);
    }
    :host([size='sm']) .swatch {
      width: 24px;
      height: 24px;
    }
    .swatch:hover {
      transform: scale(1.15);
    }
    .swatch:active {
      transform: scale(0.95);
    }
    .swatch:focus-visible {
      box-shadow: 0 0 0 2px var(--ca-surface), 0 0 0 4px var(--ca-text-primary);
    }
    .swatch.selected {
      border-color: var(--ca-text-primary);
      box-shadow: 0 0 0 2px var(--ca-surface), 0 0 0 4px var(--ca-text-primary);
    }
    .swatch .inner {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .custom-input-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: var(--ca-space-sm);
      padding-top: var(--ca-space-sm);
      border-top: 1px solid var(--ca-border);
    }
    .color-preview {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid var(--ca-border);
      flex-shrink: 0;
    }
    :host([size='sm']) .color-preview {
      width: 22px;
      height: 22px;
    }
    .hex-input {
      flex: 1;
      min-width: 0;
      padding: 6px 8px;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-sm);
      background-color: var(--ca-surface);
      color: var(--ca-text-primary);
      font-family: var(--ca-font-family);
      font-size: 14px;
      line-height: 1;
      outline: none;
      box-sizing: border-box;
    }
    :host([size='sm']) .hex-input {
      padding: 4px 6px;
      font-size: 12px;
    }
    .hex-input:focus {
      border-color: var(--ca-color-secondary);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--ca-color-secondary) 25%, transparent);
    }
  `;

  @property({ type: String, reflect: true }) value = '';
  @property({ type: Array }) presets: string[] = DEFAULT_PRESETS;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' = 'md';
  @property({ type: Boolean, attribute: 'allow-custom', reflect: true }) allowCustom = false;

  @state() private _customHex = '';

  private _selectColor(color: string) {
    this.value = color;
    this._customHex = color;
    this.dispatchEvent(
      new CustomEvent('ca-change', {
        detail: { value: color },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleCustomInput(e: Event) {
    const input = e.target as HTMLInputElement;
    let hex = input.value.trim();
    this._customHex = hex;

    // Normalize: add # if missing
    if (hex && !hex.startsWith('#')) {
      hex = '#' + hex;
    }

    // Validate hex format
    if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex)) {
      this._selectColor(hex.toLowerCase());
    }
  }

  private _handleCustomKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      let hex = this._customHex.trim();
      if (hex && !hex.startsWith('#')) {
        hex = '#' + hex;
      }
      if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex)) {
        this._selectColor(hex.toLowerCase());
      }
    }
  }

  render() {
    const normalizedValue = this.value?.toLowerCase() ?? '';

    return html`
      <div class="picker">
        <div class="grid">
          ${this.presets.map(
            (color) => html`
              <button
                class=${classMap({
                  swatch: true,
                  selected: normalizedValue === color.toLowerCase(),
                })}
                @click=${() => this._selectColor(color)}
                aria-label=${`Select color ${color}`}
                title=${color}
              >
                <span class="inner" style="background-color: ${color}"></span>
              </button>
            `
          )}
        </div>
        ${this.allowCustom
          ? html`
              <div class="custom-input-wrapper">
                <span
                  class="color-preview"
                  style="background-color: ${normalizedValue || '#ffffff'}"
                ></span>
                <input
                  type="text"
                  class="hex-input"
                  placeholder="#000000"
                  .value=${this._customHex || this.value || ''}
                  @input=${this._handleCustomInput}
                  @keydown=${this._handleCustomKeydown}
                  aria-label="Custom hex color"
                  maxlength="7"
                />
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-color-picker': CaColorPicker;
  }
}
