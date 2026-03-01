import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export interface SplitButtonOption {
  value: string;
  label: string;
}

@customElement('ca-split-button')
export class CaSplitButton extends LitElement {
  static styles = css`
    :host { display: inline-flex; align-items: stretch; position: relative; }
    .main-button, .dropdown-trigger { display: inline-flex; align-items: center; justify-content: center; gap: 4px; cursor: pointer; font-family: var(--ca-font-family); font-weight: var(--ca-font-weight-semibold); line-height: 1; white-space: nowrap; transition: background-color 0.15s ease, opacity 0.15s ease; box-sizing: border-box; }
    .main-button { border-radius: var(--ca-radius-button) 0 0 var(--ca-radius-button); }
    .dropdown-trigger { border-radius: 0 var(--ca-radius-button) var(--ca-radius-button) 0; }
    .divider { width: 1px; align-self: center; height: 60%; flex-shrink: 0; }
    /* Size: thin */
    :host([size="thin"]) .main-button { padding: 6px 16px; font-size: 13px; }
    :host([size="thin"]) .dropdown-trigger { padding: 6px 10px; }
    /* Size: xs */
    :host([size="xs"]) .main-button { padding: 8px 16px; font-size: 11px; }
    :host([size="xs"]) .dropdown-trigger { padding: 8px 10px; }
    /* Size: sm */
    :host([size="sm"]) .main-button { padding: 12px 20px; font-size: 13px; }
    :host([size="sm"]) .dropdown-trigger { padding: 12px 12px; }
    /* Size: md (default) */
    .main-button { padding: 14px 24px; font-size: 13px; }
    .dropdown-trigger { padding: 14px 12px; }
    /* Size: lg */
    :host([size="lg"]) .main-button { padding: 16px 32px; font-size: 16px; }
    :host([size="lg"]) .dropdown-trigger { padding: 16px 16px; }
    /* Primary */
    :host([variant="primary"]) .main-button, :host([variant="primary"]) .dropdown-trigger, .main-button, .dropdown-trigger { background-color: var(--ca-color-primary); color: var(--ca-color-white); border: none; }
    :host([variant="primary"]) .divider, .divider { background-color: rgba(255,255,255,0.25); }
    :host([variant="primary"]) .main-button:hover:not(:disabled), :host([variant="primary"]) .dropdown-trigger:hover:not(:disabled) { background-color: var(--ca-color-primary-pressed); }
    /* Secondary */
    :host([variant="secondary"]) .main-button, :host([variant="secondary"]) .dropdown-trigger { background-color: var(--ca-color-secondary); color: var(--ca-color-white); border: none; }
    :host([variant="secondary"]) .divider { background-color: rgba(255,255,255,0.2); }
    :host([variant="secondary"]) .main-button:hover:not(:disabled), :host([variant="secondary"]) .dropdown-trigger:hover:not(:disabled) { opacity: 0.8; }
    /* Tertiary */
    :host([variant="tertiary"]) .main-button, :host([variant="tertiary"]) .dropdown-trigger { background-color: transparent; color: var(--ca-text-primary); border: 1px solid var(--ca-text-primary); }
    :host([variant="tertiary"]) .main-button { border-right: none; }
    :host([variant="tertiary"]) .divider { background-color: var(--ca-text-primary); }
    :host([variant="tertiary"]) .main-button:hover:not(:disabled), :host([variant="tertiary"]) .dropdown-trigger:hover:not(:disabled) { background-color: var(--ca-color-secondary-hover); }
    /* Focus */
    .main-button:focus-visible, .dropdown-trigger:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--ca-color-focus-ring); }
    /* Disabled */
    :host([disabled]) { opacity: 0.5; pointer-events: none; }
    /* Chevron */
    .chevron { display: flex; align-items: center; width: 14px; height: 14px; transition: transform 0.2s ease; }
    .chevron.open { transform: rotate(180deg); }
    /* Dropdown */
    .dropdown { position: absolute; top: 100%; right: 0; z-index: 10; margin-top: 4px; min-width: 100%; background-color: var(--ca-surface-elevated); border: 1px solid var(--ca-border-strong); border-radius: var(--ca-radius-md); box-shadow: var(--ca-shadow-menu); overflow: hidden; }
    .option { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 16px; background: none; border: none; cursor: pointer; font-family: var(--ca-font-family); font-size: 13px; color: var(--ca-text-primary); text-align: left; white-space: nowrap; box-sizing: border-box; }
    .option:hover, .option.selected { background-color: var(--ca-surface-hover); }
    .option:focus-visible { outline: none; background-color: var(--ca-surface-hover); }
    .option-text { flex: 1; }
    .check-icon { flex-shrink: 0; width: 18px; height: 18px; color: var(--ca-text-muted); }
    /* Loading */
    .spinner { display: flex; align-items: center; gap: 6px; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background-color: currentColor; opacity: 0.6; animation: sb-pulse 1.4s ease-in-out infinite; }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes sb-pulse { 0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1); } }
  `;

  @property({ type: String, reflect: true }) variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @property({ type: String, reflect: true }) size: 'thin' | 'xs' | 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Array }) options: SplitButtonOption[] = [];
  @property({ type: String }) value = '';
  @property({ type: String }) label = '';
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() private _isOpen = false;
  @state() private _focusedIndex = -1;

  @query('.dropdown') private _dropdown!: HTMLElement;
  @query('.dropdown-trigger') private _triggerEl!: HTMLButtonElement;

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
      this._focusedIndex = -1;
    }
  }

  private _handleMainClick() {
    this.dispatchEvent(new CustomEvent('ca-click', { bubbles: true, composed: true }));
  }

  private _toggleDropdown() {
    this._isOpen = !this._isOpen;
    this._focusedIndex = -1;
  }

  private _selectOption(option: SplitButtonOption) {
    this.dispatchEvent(new CustomEvent('ca-change', { bubbles: true, composed: true, detail: { value: option.value } }));
    this._isOpen = false;
    this._focusedIndex = -1;
  }

  private _handleTriggerKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._toggleDropdown();
    } else if (e.key === 'Escape') {
      this._isOpen = false;
      this._focusedIndex = -1;
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!this._isOpen) {
        this._isOpen = true;
      }
      this._focusedIndex = 0;
      this.updateComplete.then(() => this._focusOption(0));
    }
  }

  private _handleDropdownKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.min(this._focusedIndex + 1, this.options.length - 1);
      this._focusedIndex = next;
      this._focusOption(next);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = Math.max(this._focusedIndex - 1, 0);
      this._focusedIndex = prev;
      this._focusOption(prev);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (this._focusedIndex >= 0 && this._focusedIndex < this.options.length) {
        this._selectOption(this.options[this._focusedIndex]);
      }
    } else if (e.key === 'Escape') {
      this._isOpen = false;
      this._focusedIndex = -1;
      this._triggerEl?.focus();
    }
  }

  private _focusOption(index: number) {
    this.updateComplete.then(() => {
      const options = this.shadowRoot?.querySelectorAll('.option') as NodeListOf<HTMLElement>;
      options?.[index]?.focus();
    });
  }

  private _renderCheckIcon() {
    return html`<svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  }

  private _renderChevron() {
    return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
  }

  render() {
    return html`
      <button
        class="main-button"
        ?disabled=${this.disabled}
        @click=${this._handleMainClick}
      >
        ${this.loading
          ? html`<span class="spinner"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>`
          : this.label}
      </button>
      <span class="divider"></span>
      <button
        class="dropdown-trigger"
        ?disabled=${this.disabled}
        @click=${this._toggleDropdown}
        @keydown=${this._handleTriggerKeydown}
        aria-haspopup="listbox"
        aria-expanded=${this._isOpen}
      >
        <span class=${classMap({ chevron: true, open: this._isOpen })}>
          ${this._renderChevron()}
        </span>
      </button>
      ${this._isOpen
        ? html`
            <div class="dropdown" role="listbox" @keydown=${this._handleDropdownKeydown}>
              ${this.options.map(
                (opt, i) => html`
                  <button
                    class=${classMap({ option: true, selected: opt.value === this.value })}
                    role="option"
                    aria-selected=${opt.value === this.value}
                    tabindex=${i === this._focusedIndex ? '0' : '-1'}
                    @click=${() => this._selectOption(opt)}
                  >
                    <span class="option-text">${opt.label}</span>
                    ${opt.value === this.value ? this._renderCheckIcon() : nothing}
                  </button>
                `
              )}
            </div>
          `
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-split-button': CaSplitButton;
  }
}
