import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export interface MultiSelectOption {
  value: string;
  label: string;
}

@customElement('ca-multi-select')
export class CaMultiSelect extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      position: relative;
      width: 100%;
    }

    /* ── Field ── */
    .field {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--ca-border-strong);
      border-radius: 8px;
      background-color: var(--ca-surface);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-md);
      color: var(--ca-text-primary);
      cursor: pointer;
      box-sizing: border-box;
      transition: border-color 0.15s ease;
      min-height: 0;
    }
    .field:hover { border-color: var(--ca-text-primary); }
    .field:focus-visible,
    .field:focus { outline: none; border: 2px solid var(--ca-text-primary); }
    .field.loading { justify-content: center; pointer-events: none; }

    /* ── XS ── */
    :host([size='xs']) .field { padding: 6px 8px; gap: 8px; font-size: var(--ca-font-size-xs); border-radius: 6px; }
    :host([size='xs']) .label { font-size: 9px; }
    :host([size='xs']) .value,
    :host([size='xs']) .chips-area { font-size: var(--ca-font-size-xs); }
    :host([size='xs']) .chip { padding: 1px 5px; font-size: 10px; gap: 3px; }
    :host([size='xs']) .chip-remove { width: 12px; height: 12px; }
    :host([size='xs']) .chip-remove svg { width: 8px; height: 8px; }
    :host([size='xs']) .chevron { width: 12px; height: 12px; }
    :host([size='xs']) .option { padding: 6px 8px; font-size: var(--ca-font-size-xs); gap: 6px; }
    :host([size='xs']) .dropdown { border-radius: 6px; }
    :host([size='xs']) .search-input { font-size: var(--ca-font-size-xs); }
    :host([size='xs']) .search-wrapper { padding: 6px 8px; }
    :host([size='xs']) .checkbox-box { width: 13px; height: 13px; border-radius: 3px; }
    :host([size='xs']) .checkbox-box svg { width: 8px; height: 8px; }

    /* ── SM ── */
    :host([size='sm']) .field { padding: 8px 10px; gap: 10px; font-size: var(--ca-font-size-sm); border-radius: 6px; }
    :host([size='sm']) .label { font-size: 10px; }
    :host([size='sm']) .value,
    :host([size='sm']) .chips-area { font-size: var(--ca-font-size-sm); }
    :host([size='sm']) .chip { padding: 2px 6px; font-size: 11px; gap: 3px; }
    :host([size='sm']) .chip-remove { width: 14px; height: 14px; }
    :host([size='sm']) .chip-remove svg { width: 8px; height: 8px; }
    :host([size='sm']) .chevron { width: 14px; height: 14px; }
    :host([size='sm']) .option { padding: 8px 10px; font-size: var(--ca-font-size-sm); gap: 8px; }
    :host([size='sm']) .dropdown { border-radius: 6px; }
    :host([size='sm']) .search-input { font-size: var(--ca-font-size-sm); }
    :host([size='sm']) .search-wrapper { padding: 8px 10px; }
    :host([size='sm']) .checkbox-box { width: 14px; height: 14px; border-radius: 3px; }
    :host([size='sm']) .checkbox-box svg { width: 9px; height: 9px; }

    /* ── LG ── */
    :host([size='lg']) .field { padding: 14px 14px; gap: 14px; font-size: var(--ca-font-size-lg); border-radius: 10px; }
    :host([size='lg']) .label { font-size: 13px; }
    :host([size='lg']) .value,
    :host([size='lg']) .chips-area { font-size: var(--ca-font-size-lg); }
    :host([size='lg']) .chip { padding: 4px 10px; font-size: 14px; }
    :host([size='lg']) .chevron { width: 18px; height: 18px; }
    :host([size='lg']) .option { padding: 14px 14px; font-size: var(--ca-font-size-lg); }
    :host([size='lg']) .dropdown { border-radius: 10px; }
    :host([size='lg']) .search-input { font-size: var(--ca-font-size-lg); }
    :host([size='lg']) .search-wrapper { padding: 14px; }
    :host([size='lg']) .checkbox-box { width: 20px; height: 20px; }

    /* ── XL ── */
    :host([size='xl']) .field { padding: 18px 16px; gap: 16px; font-size: 20px; border-radius: 12px; }
    :host([size='xl']) .label { font-size: 14px; }
    :host([size='xl']) .value,
    :host([size='xl']) .chips-area { font-size: 20px; }
    :host([size='xl']) .chip { padding: 5px 12px; font-size: 15px; }
    :host([size='xl']) .chevron { width: 20px; height: 20px; }
    :host([size='xl']) .option { padding: 18px 16px; font-size: 20px; }
    :host([size='xl']) .dropdown { border-radius: 12px; }
    :host([size='xl']) .search-input { font-size: 20px; }
    :host([size='xl']) .search-wrapper { padding: 16px; }
    :host([size='xl']) .checkbox-box { width: 22px; height: 22px; }

    /* ── Text area / value ── */
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
      font-size: var(--ca-font-size-md);
      color: var(--ca-text-primary);
      line-height: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .placeholder { color: var(--ca-text-secondary); }

    /* ── Chips in field ── */
    .chips-area {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      min-width: 0;
      align-items: center;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      background-color: var(--ca-surface-active);
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-full);
      font-family: var(--ca-font-family);
      font-size: 12px;
      color: var(--ca-text-primary);
      line-height: 1.3;
      white-space: nowrap;
      max-width: 100%;
    }
    .chip-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .chip-remove {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      border: none;
      background: none;
      cursor: pointer;
      padding: 0;
      color: var(--ca-text-muted);
      border-radius: 50%;
      flex-shrink: 0;
    }
    .chip-remove:hover {
      color: var(--ca-text-primary);
      background-color: var(--ca-surface-hover);
    }
    .overflow-count {
      font-size: 12px;
      color: var(--ca-text-muted);
      white-space: nowrap;
      flex-shrink: 0;
    }

    /* ── Chevron ── */
    .chevron {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      color: var(--ca-text-primary);
      transition: transform 0.2s ease;
    }
    .chevron.open { transform: rotate(180deg); }

    /* ── Dropdown ── */
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
      max-height: 280px;
      display: flex;
      flex-direction: column;
    }

    /* ── Search ── */
    .search-wrapper {
      padding: 10px 12px;
      border-bottom: 1px solid var(--ca-border);
      flex-shrink: 0;
    }
    .search-input {
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-md);
      color: var(--ca-text-primary);
      box-sizing: border-box;
    }
    .search-input::placeholder { color: var(--ca-text-muted); }

    /* ── Options ── */
    .options-list {
      overflow-y: auto;
      flex: 1;
    }
    .option {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px 12px;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-md);
      color: var(--ca-text-primary);
      text-align: left;
      box-sizing: border-box;
      transition: background-color var(--ca-transition-fast);
    }
    .option:hover { background-color: var(--ca-surface-hover); }
    .option.selected { background-color: var(--ca-surface-hover); }

    /* ── Checkbox ── */
    .checkbox-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border: 1.5px solid var(--ca-border-strong);
      border-radius: 4px;
      flex-shrink: 0;
      transition: background-color var(--ca-transition-fast), border-color var(--ca-transition-fast);
    }
    .checkbox-box.checked {
      background-color: var(--ca-color-secondary);
      border-color: var(--ca-color-secondary);
    }
    .checkbox-box svg {
      width: 10px;
      height: 10px;
      color: var(--ca-color-white);
    }

    .option-text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .no-results {
      padding: 12px;
      text-align: center;
      color: var(--ca-text-muted);
      font-size: var(--ca-font-size-sm);
    }

    /* ── Clear all ── */
    .clear-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      color: var(--ca-text-muted);
      flex-shrink: 0;
      border-radius: var(--ca-radius-sm);
      width: 20px;
      height: 20px;
    }
    .clear-btn:hover { color: var(--ca-text-primary); background: var(--ca-surface-hover); }

    /* ── Spinner ── */
    .spinner { display: flex; align-items: center; gap: 6px; }
    .dot {
      width: 8px; height: 8px; border-radius: 50%;
      background-color: var(--ca-border-strong);
      animation: ca-ms-pulse 1.4s ease-in-out infinite;
    }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes ca-ms-pulse {
      0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
      40% { opacity: 1; transform: scale(1); }
    }
  `;

  /* ── Properties ── */

  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @property({ type: String })
  label = '';

  @property({ type: String })
  placeholder = 'Select...';

  @property({ type: Array })
  options: MultiSelectOption[] = [];

  @property({ type: Array, attribute: false })
  value: string[] = [];

  @property({ type: Boolean })
  loading = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  searchable = false;

  @property({ type: Number, attribute: 'max-visible-chips' })
  maxVisibleChips = 3;

  /* ── State ── */

  @state() private _isOpen = false;
  @state() private _searchQuery = '';

  @query('.field') private _fieldEl!: HTMLElement;
  @query('.search-input') private _searchInput!: HTMLInputElement;

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
      this._searchQuery = '';
    }
  }

  private _toggleOpen() {
    if (this.loading || this.disabled) return;
    this._isOpen = !this._isOpen;
    if (!this._isOpen) {
      this._searchQuery = '';
    } else if (this.searchable) {
      this.updateComplete.then(() => this._searchInput?.focus());
    }
  }

  private _handleFieldKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._toggleOpen();
    } else if (e.key === 'Escape') {
      this._isOpen = false;
      this._searchQuery = '';
    }
  }

  private _handleOptionToggle(option: MultiSelectOption, e: Event) {
    e.stopPropagation();
    const newValue = [...this.value];
    const idx = newValue.indexOf(option.value);
    if (idx >= 0) {
      newValue.splice(idx, 1);
    } else {
      newValue.push(option.value);
    }
    this.dispatchEvent(
      new CustomEvent('ca-change', {
        detail: { value: newValue },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleRemoveChip(val: string, e: Event) {
    e.stopPropagation();
    const newValue = this.value.filter((v) => v !== val);
    this.dispatchEvent(
      new CustomEvent('ca-change', {
        detail: { value: newValue },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleClearAll(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('ca-change', {
        detail: { value: [] },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleSearchInput(e: Event) {
    this._searchQuery = (e.target as HTMLInputElement).value;
  }

  private get _filteredOptions(): MultiSelectOption[] {
    if (!this._searchQuery) return this.options;
    const q = this._searchQuery.toLowerCase();
    return this.options.filter((o) => o.label.toLowerCase().includes(q));
  }

  private get _selectedLabels(): Map<string, string> {
    const map = new Map<string, string>();
    for (const opt of this.options) {
      if (this.value.includes(opt.value)) {
        map.set(opt.value, opt.label);
      }
    }
    return map;
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

    const selected = this._selectedLabels;
    const hasSelection = selected.size > 0;

    return html`
      <div
        class=${classMap({ field: true, disabled: this.disabled })}
        tabindex=${this.disabled ? '-1' : '0'}
        @click=${this._toggleOpen}
        @keydown=${this._handleFieldKeyDown}
        role="combobox"
        aria-expanded=${this._isOpen}
        aria-haspopup="listbox"
      >
        <div class="text-area">
          ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
          ${hasSelection ? this._renderChips(selected) : html`<span class="value placeholder">${this.placeholder}</span>`}
        </div>
        ${hasSelection
          ? html`
              <button class="clear-btn" @click=${this._handleClearAll} aria-label="Clear all" tabindex="-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
            `
          : nothing}
        <svg
          class=${classMap({ chevron: true, open: this._isOpen })}
          viewBox="0 0 16 16" fill="none"
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      ${this._isOpen ? this._renderDropdown() : nothing}
    `;
  }

  private _renderChips(selected: Map<string, string>) {
    const entries = [...selected.entries()];
    const visible = entries.slice(0, this.maxVisibleChips);
    const overflow = entries.length - visible.length;

    return html`
      <div class="chips-area">
        ${visible.map(
          ([val, label]) => html`
            <span class="chip">
              <span class="chip-label">${label}</span>
              <button class="chip-remove" @click=${(e: Event) => this._handleRemoveChip(val, e)} aria-label="Remove ${label}" tabindex="-1">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </span>
          `
        )}
        ${overflow > 0 ? html`<span class="overflow-count">+${overflow}</span>` : nothing}
      </div>
    `;
  }

  private _renderDropdown() {
    const filtered = this._filteredOptions;

    return html`
      <div class="dropdown" role="listbox" aria-multiselectable="true">
        ${this.searchable
          ? html`
              <div class="search-wrapper">
                <input
                  class="search-input"
                  type="text"
                  placeholder="Search..."
                  .value=${this._searchQuery}
                  @input=${this._handleSearchInput}
                  @click=${(e: Event) => e.stopPropagation()}
                  @keydown=${(e: KeyboardEvent) => { if (e.key === 'Escape') { this._isOpen = false; this._searchQuery = ''; } }}
                />
              </div>
            `
          : nothing}
        <div class="options-list">
          ${filtered.length === 0
            ? html`<div class="no-results">No results</div>`
            : filtered.map((option) => {
                const isSelected = this.value.includes(option.value);
                return html`
                  <button
                    class=${classMap({ option: true, selected: isSelected })}
                    role="option"
                    aria-selected=${isSelected}
                    @click=${(e: Event) => this._handleOptionToggle(option, e)}
                  >
                    <span class=${classMap({ 'checkbox-box': true, checked: isSelected })}>
                      ${isSelected
                        ? html`<svg viewBox="0 0 24 24" fill="none"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
                        : nothing}
                    </span>
                    <span class="option-text">${option.label}</span>
                  </button>
                `;
              })}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-multi-select': CaMultiSelect;
  }
}
