import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export interface SelectOption {
  value: string;
  label: string;
}

@customElement('ca-select')
export class CaSelect extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      position: relative;
      width: 100%;
    }
    .field {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      padding: 16px 12px;
      border: 1px solid var(--ca-border-strong);
      border-radius: 8px;
      background-color: var(--ca-surface);
      font-family: var(--ca-font-family);
      font-size: 16px;
      color: var(--ca-text-primary);
      cursor: pointer;
      box-sizing: border-box;
      transition: border-color 0.15s ease;
    }
    .field:hover {
      border-color: var(--ca-text-primary);
    }
    .field:focus-visible,
    .field:focus {
      outline: none;
      border: 2px solid var(--ca-text-primary);
    }
    .field.loading {
      justify-content: center;
      pointer-events: none;
    }
    :host([size='xs']) .field { padding: 6px 8px; gap: 8px; font-size: 11px; border-radius: 6px; }
    :host([size='xs']) .label { font-size: 9px; }
    :host([size='xs']) .value { font-size: 11px; }
    :host([size='xs']) .chevron { width: 12px; height: 12px; }
    :host([size='xs']) .dropdown { border-radius: 6px; }
    :host([size='xs']) .option { padding: 6px 8px; font-size: 11px; gap: 8px; }
    :host([size='xs']) .check-icon { width: 14px; height: 14px; }

    :host([size='sm']) .field { padding: 10px 10px; gap: 10px; font-size: 13px; border-radius: 6px; }
    :host([size='sm']) .label { font-size: 10px; }
    :host([size='sm']) .value { font-size: 13px; }
    :host([size='sm']) .chevron { width: 14px; height: 14px; }
    :host([size='sm']) .dropdown { border-radius: 6px; }
    :host([size='sm']) .option { padding: 8px 10px; font-size: 13px; gap: 10px; }
    :host([size='sm']) .check-icon { width: 18px; height: 18px; }

    :host([size='lg']) .field { padding: 18px 14px; gap: 18px; font-size: 18px; border-radius: 10px; }
    :host([size='lg']) .label { font-size: 13px; }
    :host([size='lg']) .value { font-size: 18px; }
    :host([size='lg']) .chevron { width: 18px; height: 18px; }
    :host([size='lg']) .dropdown { border-radius: 10px; }
    :host([size='lg']) .option { padding: 16px 14px; font-size: 18px; gap: 18px; }
    :host([size='lg']) .check-icon { width: 26px; height: 26px; }

    :host([size='xl']) .field { padding: 20px 16px; gap: 20px; font-size: 20px; border-radius: 12px; }
    :host([size='xl']) .label { font-size: 14px; }
    :host([size='xl']) .value { font-size: 20px; }
    :host([size='xl']) .chevron { width: 20px; height: 20px; }
    :host([size='xl']) .dropdown { border-radius: 12px; }
    :host([size='xl']) .option { padding: 18px 16px; font-size: 20px; gap: 20px; }
    :host([size='xl']) .check-icon { width: 28px; height: 28px; }
    .text-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }
    .label {
      font-family: var(--ca-font-family);
      font-weight: 400;
      font-size: 12px;
      color: var(--ca-text-muted);
      line-height: 1;
    }
    .value {
      font-family: var(--ca-font-family);
      font-weight: 400;
      font-size: 16px;
      color: var(--ca-text-primary);
      line-height: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .placeholder {
      color: var(--ca-text-secondary);
    }
    .chevron {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      color: var(--ca-text-primary);
      transition: transform 0.2s ease;
    }
    .chevron.open {
      transform: rotate(180deg);
    }
    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 10;
      margin-top: 4px;
      background-color: var(--ca-surface);
      border: 1px solid var(--ca-border-strong);
      border-radius: 8px;
      box-shadow: var(--ca-shadow-menu);
      overflow: hidden;
    }
    .option {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      padding: 16px;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: 16px;
      color: var(--ca-text-primary);
      text-align: left;
      box-sizing: border-box;
    }
    .option:hover {
      background-color: var(--ca-surface-hover);
    }
    .option.selected {
      background-color: var(--ca-surface-hover);
    }
    .option-text {
      flex: 1;
    }
    .check-icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      color: var(--ca-text-muted);
    }
    .spinner {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--ca-border-strong);
      animation: ca-select-pulse 1.4s ease-in-out infinite;
    }
    .dot:nth-child(2) {
      animation-delay: 0.2s;
    }
    .dot:nth-child(3) {
      animation-delay: 0.4s;
    }
    @keyframes ca-select-pulse {
      0%,
      80%,
      100% {
        opacity: 0.3;
        transform: scale(0.8);
      }
      40% {
        opacity: 1;
        transform: scale(1);
      }
    }
  `;

  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @property({ type: String })
  label = '';

  @property({ type: String })
  placeholder = 'Placeholder text';

  @property({ type: Array })
  options: SelectOption[] = [];

  @property({ type: String })
  value = '';

  @property({ type: Boolean })
  loading = false;

  @state()
  _isOpen = false;

  @query('.field')
  _fieldEl!: HTMLElement;

  private _boundClickOutside = this._handleClickOutside.bind(this);

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._boundClickOutside);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._boundClickOutside);
  }

  private _handleClickOutside(e: MouseEvent) {
    if (!this._isOpen) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this._isOpen = false;
    }
  }

  private _toggleOpen() {
    if (this.loading) return;
    this._isOpen = !this._isOpen;
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._toggleOpen();
    } else if (e.key === 'Escape') {
      this._isOpen = false;
    }
  }

  private _handleSelect(option: SelectOption) {
    this._isOpen = false;
    this.dispatchEvent(
      new CustomEvent('ca-change', {
        detail: { value: option.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private get _selectedLabel(): string | undefined {
    return this.options.find((o) => o.value === this.value)?.label;
  }

  render() {
    if (this.loading) {
      return html`
        <div class="field loading" tabindex="0">
          <div class="spinner">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      `;
    }

    const selectedLabel = this._selectedLabel;

    return html`
      <div
        class="field"
        tabindex="0"
        @click=${this._toggleOpen}
        @keydown=${this._handleKeyDown}
        role="combobox"
        aria-expanded=${this._isOpen}
        aria-haspopup="listbox"
      >
        <div class="text-area">
          ${this.label ? html`<span class="label">${this.label}</span>` : null}
          ${selectedLabel
            ? html`<span class="value">${selectedLabel}</span>`
            : html`<span class="value placeholder">${this.placeholder}</span>`}
        </div>
        <svg
          class=${classMap({ chevron: true, open: this._isOpen })}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      ${this._isOpen
        ? html`
            <div class="dropdown" role="listbox">
              ${this.options.map(
                (option) => html`
                  <button
                    class=${classMap({
                      option: true,
                      selected: option.value === this.value,
                    })}
                    role="option"
                    aria-selected=${option.value === this.value}
                    @click=${() => this._handleSelect(option)}
                  >
                    <span class="option-text">${option.label}</span>
                    ${option.value === this.value
                      ? html`
                          <svg
                            class="check-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 13L9 17L19 7"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        `
                      : null}
                  </button>
                `
              )}
            </div>
          `
        : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-select': CaSelect;
  }
}
