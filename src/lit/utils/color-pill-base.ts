import { LitElement, html, css, nothing, type CSSResultGroup } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export interface ColorPillOption {
  value: string;
  label: string;
  color: string;
  icon?: string;
}

/**
 * Base class for colored pill dropdown selectors (status, priority, phase).
 * Provides: colored pill trigger, dropdown with color dots, keyboard nav, allow-create.
 * Subclasses must call `super.render()` or use `renderPill()` / `renderDropdown()`.
 */
export class ColorPillBase extends LitElement {
  static styles: CSSResultGroup = css`
    :host {
      display: inline-flex;
      position: relative;
      font-family: var(--ca-font-family);
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: var(--ca-radius-full);
      border: 1px solid transparent;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: #fff;
      cursor: pointer;
      line-height: 1.3;
      white-space: nowrap;
      transition: opacity var(--ca-transition-fast);
      user-select: none;
    }
    .pill:hover {
      opacity: 0.85;
    }
    .pill:focus-visible {
      outline: 2px solid var(--ca-color-focus-ring);
      outline-offset: 2px;
    }
    .pill:focus:not(:focus-visible) {
      outline: none;
    }

    :host([borderless]) .pill {
      background-color: transparent !important;
      color: var(--ca-text-primary);
      padding: 2px 6px;
    }
    :host([borderless]) .pill .dot {
      display: inline-block;
    }

    /* Size variants */
    :host([size='xs']) .pill { padding: 2px 6px; font-size: var(--ca-font-size-xs); gap: 4px; }
    :host([size='sm']) .pill { padding: 3px 8px; font-size: var(--ca-font-size-xs); gap: 5px; }
    :host([size='lg']) .pill { padding: 6px 14px; font-size: var(--ca-font-size-md); gap: 8px; }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .pill-icon {
      display: inline-flex;
      width: 12px;
      height: 12px;
      flex-shrink: 0;
    }

    .placeholder-text {
      color: var(--ca-text-secondary);
      font-weight: 400;
    }

    /* Dropdown */
    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 10;
      margin-top: 4px;
      min-width: 180px;
      background-color: var(--ca-surface);
      border: 1px solid var(--ca-border-strong);
      border-radius: var(--ca-radius-md);
      box-shadow: var(--ca-shadow-menu);
      overflow: hidden;
      animation: ca-pill-fade-in 0.12s ease;
    }

    @keyframes ca-pill-fade-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .option {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 8px 12px;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      text-align: left;
      box-sizing: border-box;
      transition: background-color var(--ca-transition-fast);
    }
    .option:hover,
    .option.focused {
      background-color: var(--ca-surface-hover);
    }
    .option.selected {
      font-weight: var(--ca-font-weight-semibold);
    }
    .option-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .option-label {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .check-icon {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      color: var(--ca-text-muted);
    }

    /* Create row */
    .create-row {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 8px 12px;
      background: none;
      border: none;
      border-top: 1px solid var(--ca-border);
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-color-primary);
      text-align: left;
      box-sizing: border-box;
    }
    .create-row:hover {
      background-color: var(--ca-surface-hover);
    }
    .create-icon {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
    }
  `;

  @property({ type: Array })
  options: ColorPillOption[] = [];

  @property({ type: String })
  value = '';

  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean, reflect: true })
  borderless = false;

  @property({ type: Boolean, attribute: 'allow-create' })
  allowCreate = false;

  @property({ type: String })
  placeholder = 'Select...';

  @state()
  protected _isOpen = false;

  @state()
  private _focusedIndex = -1;

  private _boundClickOutside = this._handleClickOutside.bind(this);

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this._boundClickOutside);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._boundClickOutside);
  }

  private _handleClickOutside(e: MouseEvent): void {
    if (!this._isOpen) return;
    if (!e.composedPath().includes(this)) {
      this._isOpen = false;
      this._focusedIndex = -1;
    }
  }

  private _toggle(): void {
    this._isOpen = !this._isOpen;
    if (!this._isOpen) this._focusedIndex = -1;
  }

  private _handlePillKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._toggle();
    } else if (e.key === 'Escape') {
      this._isOpen = false;
      this._focusedIndex = -1;
    } else if (e.key === 'ArrowDown' && this._isOpen) {
      e.preventDefault();
      this._focusedIndex = Math.min(this._focusedIndex + 1, this.options.length - 1);
    } else if (e.key === 'ArrowUp' && this._isOpen) {
      e.preventDefault();
      this._focusedIndex = Math.max(this._focusedIndex - 1, 0);
    } else if ((e.key === 'Enter' || e.key === ' ') && this._isOpen && this._focusedIndex >= 0) {
      e.preventDefault();
      this._selectOption(this.options[this._focusedIndex]);
    }
  }

  private _selectOption(option: ColorPillOption): void {
    this._isOpen = false;
    this._focusedIndex = -1;
    this.dispatchEvent(
      new CustomEvent('ca-change', {
        detail: { value: option.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleCreate(): void {
    this._isOpen = false;
    this.dispatchEvent(
      new CustomEvent('ca-create', {
        bubbles: true,
        composed: true,
      })
    );
  }

  protected get _selectedOption(): ColorPillOption | undefined {
    return this.options.find((o) => o.value === this.value);
  }

  /** Override in subclass for custom icon rendering */
  protected renderOptionIcon(option: ColorPillOption) {
    return html`<span class="option-dot" style="background-color: ${option.color}"></span>`;
  }

  render() {
    const selected = this._selectedOption;
    const pillBg = selected ? selected.color : 'var(--ca-border-strong)';

    return html`
      <div
        class="pill"
        style="background-color: ${this.borderless ? 'transparent' : pillBg}"
        tabindex="0"
        role="combobox"
        aria-expanded=${this._isOpen}
        aria-haspopup="listbox"
        @click=${this._toggle}
        @keydown=${this._handlePillKeyDown}
      >
        ${this.borderless && selected
          ? html`<span class="dot" style="background-color: ${selected.color}"></span>`
          : nothing}
        ${selected
          ? html`<span>${selected.label}</span>`
          : html`<span class="placeholder-text">${this.placeholder}</span>`}
      </div>
      ${this._isOpen ? this._renderDropdown() : nothing}
    `;
  }

  private _renderDropdown() {
    return html`
      <div class="dropdown" role="listbox">
        ${this.options.map((option, i) => {
          const isSelected = option.value === this.value;
          return html`
            <button
              class=${classMap({ option: true, selected: isSelected, focused: i === this._focusedIndex })}
              role="option"
              aria-selected=${isSelected}
              @click=${(e: Event) => { e.stopPropagation(); this._selectOption(option); }}
            >
              ${this.renderOptionIcon(option)}
              <span class="option-label">${option.label}</span>
              ${isSelected
                ? html`<svg class="check-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>`
                : nothing}
            </button>
          `;
        })}
        ${this.allowCreate
          ? html`
              <button class="create-row" @click=${(e: Event) => { e.stopPropagation(); this._handleCreate(); }}>
                <svg class="create-icon" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <span>Create new</span>
              </button>
            `
          : nothing}
      </div>
    `;
  }
}
