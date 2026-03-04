import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export interface LabelOption {
  value: string;
  label: string;
  color: string;
}

/** Preset color swatches for the mini color picker in create mode. */
const PRESET_COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6',
  '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#6b7280',
];

/**
 * `<ca-label-selector>` — Color-coded label multi-select with create-inline.
 * Trigger shows colored chips; dropdown has checkboxes + "Create label" with mini color picker.
 *
 * @fires ca-change - Dispatched when selection changes. detail: `{ value: string[] }`
 * @fires ca-create - Dispatched when a new label is created. detail: `{ label: string, color: string }`
 */
@customElement('ca-label-selector')
export class CaLabelSelector extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      position: relative;
      font-family: var(--ca-font-family);
    }

    .trigger {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;
      cursor: pointer;
      padding: 4px;
      border: 1px solid transparent;
      border-radius: var(--ca-radius-md);
      transition: border-color var(--ca-transition-fast);
      min-height: 28px;
    }
    .trigger:hover { border-color: var(--ca-border); }
    .trigger:focus-visible { outline: 2px solid var(--ca-color-focus-ring); outline-offset: 2px; }
    .trigger:focus:not(:focus-visible) { outline: none; }
    :host([borderless]) .trigger { border-color: transparent; padding: 2px; }

    .label-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      border-radius: var(--ca-radius-full);
      font-size: var(--ca-font-size-xs);
      font-weight: var(--ca-font-weight-semibold);
      color: #fff;
      white-space: nowrap;
      line-height: 1.4;
    }

    :host([size='xs']) .label-chip { padding: 1px 5px; font-size: 10px; }
    :host([size='sm']) .label-chip { padding: 1px 6px; font-size: var(--ca-font-size-xs); }
    :host([size='lg']) .label-chip { padding: 3px 10px; font-size: var(--ca-font-size-sm); }

    .add-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1.5px dashed var(--ca-border-strong);
      color: var(--ca-text-muted);
      flex-shrink: 0;
    }

    .placeholder {
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-secondary);
    }

    /* Dropdown */
    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 10;
      margin-top: 4px;
      min-width: 220px;
      max-height: 320px;
      background-color: var(--ca-surface);
      border: 1px solid var(--ca-border-strong);
      border-radius: var(--ca-radius-md);
      box-shadow: var(--ca-shadow-menu);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: ca-ls-fade-in 0.12s ease;
    }

    @keyframes ca-ls-fade-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .search-wrapper {
      padding: 8px 12px;
      border-bottom: 1px solid var(--ca-border);
      flex-shrink: 0;
    }
    .search-input {
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      box-sizing: border-box;
    }
    .search-input::placeholder { color: var(--ca-text-muted); }

    .options-list {
      overflow-y: auto;
      flex: 1;
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
    }
    .option:hover { background-color: var(--ca-surface-hover); }

    .color-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }

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

    .option-label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

    .no-results {
      padding: 12px;
      text-align: center;
      color: var(--ca-text-muted);
      font-size: var(--ca-font-size-sm);
    }

    /* Create section */
    .create-section {
      border-top: 1px solid var(--ca-border);
      padding: 8px 12px;
      flex-shrink: 0;
    }
    .create-row {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: var(--ca-font-size-sm);
      color: var(--ca-color-primary);
      padding: 4px 0;
    }
    .create-row:hover { opacity: 0.8; }

    .swatches {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
      margin-top: 6px;
    }
    .swatch {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      padding: 0;
      background: none;
    }
    .swatch:hover { opacity: 0.8; }
    .swatch.selected { border-color: var(--ca-text-primary); }
    .swatch-inner {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    .create-input {
      width: 100%;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-sm);
      padding: 4px 8px;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      background: var(--ca-surface);
      box-sizing: border-box;
      margin-top: 6px;
    }
    .create-input:focus { outline: none; border-color: var(--ca-text-primary); }

    .create-actions {
      display: flex;
      justify-content: flex-end;
      gap: 6px;
      margin-top: 6px;
    }
    .create-btn {
      padding: 4px 12px;
      border: none;
      border-radius: var(--ca-radius-sm);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-xs);
      cursor: pointer;
      font-weight: var(--ca-font-weight-semibold);
    }
    .create-btn-primary {
      background-color: var(--ca-color-primary);
      color: #fff;
    }
    .create-btn-primary:hover { opacity: 0.9; }
    .create-btn-cancel {
      background: none;
      color: var(--ca-text-secondary);
    }
    .create-btn-cancel:hover { color: var(--ca-text-primary); }
  `;

  @property({ type: Array, attribute: false })
  labels: LabelOption[] = [];

  @property({ type: Array, attribute: false })
  value: string[] = [];

  @property({ type: Boolean, attribute: 'allow-create' })
  allowCreate = false;

  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean, reflect: true })
  borderless = false;

  @state() private _isOpen = false;
  @state() private _searchQuery = '';
  @state() private _showCreate = false;
  @state() private _newLabelName = '';
  @state() private _newLabelColor = PRESET_COLORS[0];

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
    if (!e.composedPath().includes(this)) {
      this._close();
    }
  }

  private _close() {
    this._isOpen = false;
    this._searchQuery = '';
    this._showCreate = false;
    this._newLabelName = '';
    this._newLabelColor = PRESET_COLORS[0];
  }

  private _toggle() {
    if (this._isOpen) this._close();
    else this._isOpen = true;
  }

  private _handleToggleLabel(label: LabelOption, e: Event) {
    e.stopPropagation();
    const newValue = [...this.value];
    const idx = newValue.indexOf(label.value);
    if (idx >= 0) newValue.splice(idx, 1);
    else newValue.push(label.value);
    this.dispatchEvent(
      new CustomEvent('ca-change', { detail: { value: newValue }, bubbles: true, composed: true })
    );
  }

  private _handleCreateLabel() {
    if (!this._newLabelName.trim()) return;
    this.dispatchEvent(
      new CustomEvent('ca-create', {
        detail: { label: this._newLabelName.trim(), color: this._newLabelColor },
        bubbles: true,
        composed: true,
      })
    );
    this._showCreate = false;
    this._newLabelName = '';
    this._newLabelColor = PRESET_COLORS[0];
  }

  private get _filteredLabels(): LabelOption[] {
    if (!this._searchQuery) return this.labels;
    const q = this._searchQuery.toLowerCase();
    return this.labels.filter((l) => l.label.toLowerCase().includes(q));
  }

  private get _selectedLabels(): LabelOption[] {
    return this.labels.filter((l) => this.value.includes(l.value));
  }

  render() {
    const selected = this._selectedLabels;

    return html`
      <div
        class="trigger"
        tabindex="0"
        role="combobox"
        aria-expanded=${this._isOpen}
        aria-haspopup="listbox"
        @click=${this._toggle}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._toggle(); }
          else if (e.key === 'Escape') this._close();
        }}
      >
        ${selected.length > 0
          ? selected.map((l) => html`<span class="label-chip" style="background-color: ${l.color}">${l.label}</span>`)
          : html`<span class="add-icon">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </span>`}
      </div>
      ${this._isOpen ? this._renderDropdown() : nothing}
    `;
  }

  private _renderDropdown() {
    const filtered = this._filteredLabels;

    return html`
      <div class="dropdown" role="listbox" aria-multiselectable="true">
        <div class="search-wrapper">
          <input
            class="search-input"
            type="text"
            placeholder="Search labels..."
            .value=${this._searchQuery}
            @input=${(e: Event) => { this._searchQuery = (e.target as HTMLInputElement).value; }}
            @click=${(e: Event) => e.stopPropagation()}
            @keydown=${(e: KeyboardEvent) => { if (e.key === 'Escape') this._close(); }}
          />
        </div>
        <div class="options-list">
          ${filtered.length === 0
            ? html`<div class="no-results">No labels found</div>`
            : filtered.map((label) => {
                const isSelected = this.value.includes(label.value);
                return html`
                  <button class="option" role="option" aria-selected=${isSelected}
                    @click=${(e: Event) => this._handleToggleLabel(label, e)}>
                    <span class="color-dot" style="background-color: ${label.color}"></span>
                    <span class="option-label">${label.label}</span>
                    <span class=${classMap({ 'checkbox-box': true, checked: isSelected })}>
                      ${isSelected
                        ? html`<svg viewBox="0 0 24 24" fill="none"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
                        : nothing}
                    </span>
                  </button>
                `;
              })}
        </div>
        ${this.allowCreate
          ? html`
              <div class="create-section" @click=${(e: Event) => e.stopPropagation()}>
                ${this._showCreate
                  ? html`
                      <div class="swatches">
                        ${PRESET_COLORS.map(
                          (c) => html`
                            <button class=${classMap({ swatch: true, selected: c === this._newLabelColor })}
                              @click=${() => { this._newLabelColor = c; }}>
                              <div class="swatch-inner" style="background-color: ${c}"></div>
                            </button>
                          `
                        )}
                      </div>
                      <input class="create-input" type="text" placeholder="Label name..."
                        .value=${this._newLabelName}
                        @input=${(e: Event) => { this._newLabelName = (e.target as HTMLInputElement).value; }}
                        @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') this._handleCreateLabel(); }}
                      />
                      <div class="create-actions">
                        <button class="create-btn create-btn-cancel" @click=${() => { this._showCreate = false; }}>Cancel</button>
                        <button class="create-btn create-btn-primary" @click=${this._handleCreateLabel}>Create</button>
                      </div>
                    `
                  : html`
                      <div class="create-row" @click=${() => { this._showCreate = true; }}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                        <span>Create label</span>
                      </div>
                    `}
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-label-selector': CaLabelSelector;
  }
}
