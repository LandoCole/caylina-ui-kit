import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface CommandBarItem {
  id: string;
  label: string;
  icon?: string;
  group?: string;
  shortcut?: string;
}

/**
 * `<ca-command-bar>` — Keyboard-triggered command palette.
 *
 * @fires ca-select  - Dispatched when a command is selected. detail: `{ id: string }`
 * @fires ca-search  - Dispatched when the search query changes. detail: `{ query: string }`
 * @fires ca-close   - Dispatched when the command bar is dismissed.
 */
@customElement('ca-command-bar')
export class CaCommandBar extends LitElement {
  static styles = css`
    :host {
      display: contents;
      font-family: var(--ca-font-family);
    }

    .overlay {
      position: fixed;
      inset: 0;
      z-index: 9000;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 15vh;
      background-color: rgba(0, 0, 0, 0.5);
      animation: overlay-fade-in 0.15s ease;
    }

    .panel {
      width: 90%;
      max-width: 560px;
      background-color: var(--ca-surface-elevated);
      border-radius: var(--ca-radius-lg);
      box-shadow: var(--ca-shadow-lg);
      overflow: hidden;
      animation: panel-slide-down 0.2s ease;
      display: flex;
      flex-direction: column;
      max-height: 60vh;
    }

    .search-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 16px;
      border-bottom: 1px solid var(--ca-border);
    }

    .search-icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      color: var(--ca-text-muted);
    }

    .search-input {
      flex: 1;
      min-width: 0;
      border: none;
      outline: none;
      background: transparent;
      color: var(--ca-text-primary);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-md);
      line-height: 1;
    }
    .search-input::placeholder {
      color: var(--ca-text-muted);
    }

    .results {
      overflow-y: auto;
      padding: 6px 0;
    }

    .group-header {
      padding: 8px 16px 4px;
      font-size: var(--ca-font-size-xs);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      user-select: none;
    }

    .command {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px 16px;
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
    .command:hover,
    .command.focused {
      background-color: var(--ca-surface-hover);
    }

    .command-icon {
      display: inline-flex;
      width: 16px;
      height: 16px;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 16px;
      color: var(--ca-text-secondary);
    }

    .command-label {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .command-shortcut {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      flex-shrink: 0;
      white-space: nowrap;
    }

    .empty {
      padding: 24px 16px;
      text-align: center;
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-muted);
    }

    @keyframes overlay-fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes panel-slide-down {
      from { opacity: 0; transform: translateY(-12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Array }) commands: CommandBarItem[] = [];
  @property({ type: String }) placeholder = 'Search commands...';

  @state() private _query = '';
  @state() private _focusedIndex = -1;

  @query('.search-input') private _searchInput!: HTMLInputElement;

  private _previouslyFocused: HTMLElement | null = null;
  private _boundKeydown = this._handleKeydown.bind(this);

  updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      if (this.open) {
        this._onOpen();
      } else {
        this._onClose();
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._onClose();
  }

  private _onOpen() {
    this._query = '';
    this._focusedIndex = -1;
    this._previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this._boundKeydown);

    this.updateComplete.then(() => {
      this._searchInput?.focus();
    });
  }

  private _onClose() {
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this._boundKeydown);

    if (this._previouslyFocused) {
      this._previouslyFocused.focus();
      this._previouslyFocused = null;
    }
  }

  private get _filteredCommands(): CommandBarItem[] {
    const q = this._query.toLowerCase().trim();
    if (!q) return this.commands;
    return this.commands.filter((cmd) => cmd.label.toLowerCase().includes(q));
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      this._emitClose();
      return;
    }

    const filtered = this._filteredCommands;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._focusedIndex = Math.min(this._focusedIndex + 1, filtered.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._focusedIndex = Math.max(this._focusedIndex - 1, 0);
    } else if (e.key === 'Enter' && this._focusedIndex >= 0 && this._focusedIndex < filtered.length) {
      e.preventDefault();
      this._selectCommand(filtered[this._focusedIndex]);
    }

    if (e.key === 'Tab') {
      e.preventDefault();
    }
  }

  private _handleSearchInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this._query = input.value;
    this._focusedIndex = -1;
    this.dispatchEvent(
      new CustomEvent('ca-search', {
        detail: { query: this._query },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _selectCommand(command: CommandBarItem) {
    this.dispatchEvent(
      new CustomEvent('ca-select', {
        detail: { id: command.id },
        bubbles: true,
        composed: true,
      })
    );
    this._emitClose();
  }

  private _emitClose() {
    this.dispatchEvent(
      new CustomEvent('ca-close', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleOverlayClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      this._emitClose();
    }
  }

  render() {
    if (!this.open) return nothing;

    const filtered = this._filteredCommands;

    // Group commands
    const groups = new Map<string, CommandBarItem[]>();
    for (const cmd of filtered) {
      const key = cmd.group ?? '';
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(cmd);
    }

    // Build a flat index for keyboard nav
    let flatIndex = 0;

    return html`
      <div class="overlay" @click=${this._handleOverlayClick}>
        <div class="panel" role="dialog" aria-modal="true" aria-label="Command palette">
          <div class="search-wrapper">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
              <path d="M20 20l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <input
              class="search-input"
              type="text"
              .value=${this._query}
              placeholder=${this.placeholder}
              @input=${this._handleSearchInput}
            />
          </div>
          <div class="results" role="listbox">
            ${filtered.length === 0
              ? html`<div class="empty">No commands found</div>`
              : Array.from(groups.entries()).map(([groupName, items]) => html`
                  ${groupName ? html`<div class="group-header">${groupName}</div>` : nothing}
                  ${items.map((cmd) => {
                    const idx = flatIndex++;
                    return html`
                      <button
                        class=${classMap({ command: true, focused: idx === this._focusedIndex })}
                        role="option"
                        @click=${() => this._selectCommand(cmd)}
                      >
                        ${cmd.icon ? html`<span class="command-icon">${unsafeHTML(cmd.icon)}</span>` : nothing}
                        <span class="command-label">${cmd.label}</span>
                        ${cmd.shortcut ? html`<span class="command-shortcut">${cmd.shortcut}</span>` : nothing}
                      </button>
                    `;
                  })}
                `)}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-command-bar': CaCommandBar;
  }
}
