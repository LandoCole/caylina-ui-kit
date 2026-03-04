import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import './avatar.js';
import './avatar-group.js';

export interface AssigneeMember {
  value: string;
  label: string;
  src?: string;
  color?: string;
  email?: string;
}

/**
 * `<ca-assignee-selector>` — Avatar-based multi-select with search.
 * Trigger shows `ca-avatar-group`; dropdown shows searchable list with avatar + name + checkbox.
 *
 * @fires ca-change - Dispatched when selection changes. detail: `{ value: string[] }`
 */
@customElement('ca-assignee-selector')
export class CaAssigneeSelector extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      position: relative;
      font-family: var(--ca-font-family);
    }

    .trigger {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      padding: 4px;
      border: 1px solid transparent;
      border-radius: var(--ca-radius-md);
      transition: border-color var(--ca-transition-fast);
    }
    .trigger:hover {
      border-color: var(--ca-border);
    }
    .trigger:focus-visible {
      outline: 2px solid var(--ca-color-focus-ring);
      outline-offset: 2px;
    }
    .trigger:focus:not(:focus-visible) {
      outline: none;
    }
    :host([borderless]) .trigger {
      border-color: transparent;
      padding: 2px;
    }

    .placeholder {
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-secondary);
    }

    .add-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1.5px dashed var(--ca-border-strong);
      color: var(--ca-text-muted);
      flex-shrink: 0;
    }
    :host([size='xs']) .add-icon { width: 20px; height: 20px; }
    :host([size='sm']) .add-icon { width: 24px; height: 24px; }

    /* Dropdown */
    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 10;
      margin-top: 4px;
      min-width: 240px;
      max-height: 300px;
      background-color: var(--ca-surface);
      border: 1px solid var(--ca-border-strong);
      border-radius: var(--ca-radius-md);
      box-shadow: var(--ca-shadow-menu);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: ca-as-fade-in 0.12s ease;
    }

    @keyframes ca-as-fade-in {
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
      gap: 10px;
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
    .option:hover { background-color: var(--ca-surface-hover); }

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

    .member-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .member-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .member-email {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .no-results {
      padding: 12px;
      text-align: center;
      color: var(--ca-text-muted);
      font-size: var(--ca-font-size-sm);
    }
  `;

  @property({ type: Array, attribute: false })
  members: AssigneeMember[] = [];

  @property({ type: Array, attribute: false })
  value: string[] = [];

  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean, reflect: true })
  borderless = false;

  @property({ type: Boolean })
  searchable = true;

  @state() private _isOpen = false;
  @state() private _searchQuery = '';

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
      this._isOpen = false;
      this._searchQuery = '';
    }
  }

  private _toggle() {
    this._isOpen = !this._isOpen;
    if (!this._isOpen) this._searchQuery = '';
  }

  private _handleToggleMember(member: AssigneeMember, e: Event) {
    e.stopPropagation();
    const newValue = [...this.value];
    const idx = newValue.indexOf(member.value);
    if (idx >= 0) {
      newValue.splice(idx, 1);
    } else {
      newValue.push(member.value);
    }
    this.dispatchEvent(
      new CustomEvent('ca-change', {
        detail: { value: newValue },
        bubbles: true,
        composed: true,
      })
    );
  }

  private get _filteredMembers(): AssigneeMember[] {
    if (!this._searchQuery) return this.members;
    const q = this._searchQuery.toLowerCase();
    return this.members.filter(
      (m) => m.label.toLowerCase().includes(q) || (m.email && m.email.toLowerCase().includes(q))
    );
  }

  private get _selectedMembers() {
    return this.members.filter((m) => this.value.includes(m.value));
  }

  render() {
    const selected = this._selectedMembers;

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
          else if (e.key === 'Escape') { this._isOpen = false; this._searchQuery = ''; }
        }}
      >
        ${selected.length > 0
          ? html`<ca-avatar-group
              .members=${selected.map((m) => ({ name: m.label, src: m.src, color: m.color }))}
              .size=${this.size}
              .max=${3}
            ></ca-avatar-group>`
          : html`
              <span class="add-icon">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
            `}
      </div>
      ${this._isOpen ? this._renderDropdown() : nothing}
    `;
  }

  private _renderDropdown() {
    const filtered = this._filteredMembers;

    return html`
      <div class="dropdown" role="listbox" aria-multiselectable="true">
        ${this.searchable
          ? html`
              <div class="search-wrapper">
                <input
                  class="search-input"
                  type="text"
                  placeholder="Search members..."
                  .value=${this._searchQuery}
                  @input=${(e: Event) => { this._searchQuery = (e.target as HTMLInputElement).value; }}
                  @click=${(e: Event) => e.stopPropagation()}
                  @keydown=${(e: KeyboardEvent) => { if (e.key === 'Escape') { this._isOpen = false; this._searchQuery = ''; } }}
                />
              </div>
            `
          : nothing}
        <div class="options-list">
          ${filtered.length === 0
            ? html`<div class="no-results">No members found</div>`
            : filtered.map((member) => {
                const isSelected = this.value.includes(member.value);
                return html`
                  <button
                    class="option"
                    role="option"
                    aria-selected=${isSelected}
                    @click=${(e: Event) => this._handleToggleMember(member, e)}
                  >
                    <ca-avatar
                      .name=${member.label}
                      .src=${member.src || ''}
                      .color=${member.color || ''}
                      size="xs"
                    ></ca-avatar>
                    <div class="member-info">
                      <span class="member-name">${member.label}</span>
                      ${member.email ? html`<span class="member-email">${member.email}</span>` : nothing}
                    </div>
                    <span class=${classMap({ 'checkbox-box': true, checked: isSelected })}>
                      ${isSelected
                        ? html`<svg viewBox="0 0 24 24" fill="none"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
                        : nothing}
                    </span>
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
    'ca-assignee-selector': CaAssigneeSelector;
  }
}
