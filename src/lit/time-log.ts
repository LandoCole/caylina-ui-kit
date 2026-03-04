import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface TimeLogEntry {
  id: string;
  user: string;
  duration: number;
  date: string;
  description?: string;
  billable?: boolean;
}

/**
 * `<ca-time-log>` — Time entry management.
 *
 * @fires ca-add - Dispatched when a new time entry is added. Detail: `{ duration, description, billable }`.
 * @fires ca-delete - Dispatched when a time entry is deleted. Detail: `{ id }`.
 */
@customElement('ca-time-log')
export class CaTimeLog extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--ca-font-family);
    }

    /* ── Header / Total ── */
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--ca-border);
      margin-bottom: 4px;
    }
    .header-label {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
    }
    .header-total {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
    }

    /* ── Entries list ── */
    .entries {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .entry {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px solid var(--ca-border);
    }
    .entry:last-child {
      border-bottom: none;
    }
    .entry-duration {
      flex-shrink: 0;
      min-width: 64px;
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
    }
    .entry-details {
      flex: 1;
      min-width: 0;
    }
    .entry-desc {
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      line-height: 1.4;
      word-break: break-word;
    }
    .entry-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 2px;
    }
    .entry-user {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
    }
    .entry-date {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
    }
    .entry-billable {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-color-success);
      font-weight: var(--ca-font-weight-semibold);
    }
    .entry-delete {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: var(--ca-radius-sm);
      background: none;
      color: var(--ca-text-muted);
      cursor: pointer;
      font-size: 16px;
      transition: color var(--ca-transition-fast),
        background-color var(--ca-transition-fast);
    }
    .entry-delete:hover {
      color: var(--ca-color-danger);
      background-color: var(--ca-surface-hover);
    }
    .entry-delete:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: 1px;
    }

    /* ── Add row ── */
    .add-row {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding-top: 12px;
      border-top: 1px solid var(--ca-border);
      margin-top: 4px;
    }
    .add-duration-input {
      width: 80px;
      flex-shrink: 0;
      padding: 8px 10px;
      border: 1px solid var(--ca-border-input);
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-surface);
      color: var(--ca-text-primary);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      box-sizing: border-box;
    }
    .add-duration-input::placeholder {
      color: var(--ca-text-muted);
    }
    .add-duration-input:focus {
      outline: none;
      border: 2px solid var(--ca-text-primary);
    }
    .add-desc-input {
      flex: 1;
      padding: 8px 10px;
      border: 1px solid var(--ca-border-input);
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-surface);
      color: var(--ca-text-primary);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      box-sizing: border-box;
    }
    .add-desc-input::placeholder {
      color: var(--ca-text-muted);
    }
    .add-desc-input:focus {
      outline: none;
      border: 2px solid var(--ca-text-primary);
    }
    .add-billable-label {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-secondary);
      cursor: pointer;
      user-select: none;
      padding-top: 8px;
    }
    .add-billable-label input[type='checkbox'] {
      accent-color: var(--ca-color-primary);
      cursor: pointer;
    }
    .add-btn {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 8px 16px;
      border: none;
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-color-primary);
      color: var(--ca-color-white);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      cursor: pointer;
      transition: background-color var(--ca-transition-fast);
    }
    .add-btn:hover {
      background-color: var(--ca-color-primary-pressed);
    }
    .add-btn:disabled {
      background-color: var(--ca-color-disabled);
      color: var(--ca-color-disabled-text);
      cursor: not-allowed;
    }
    .add-btn:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: 2px;
    }

    .empty {
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-muted);
      text-align: center;
      padding: 24px 0;
    }
  `;

  @property({ type: Array })
  entries: TimeLogEntry[] = [];

  @property({ type: Boolean, attribute: 'allow-add' })
  allowAdd = false;

  @property({ type: Number, attribute: 'total-logged' })
  totalLogged = 0;

  @state()
  private _addDuration = '';

  @state()
  private _addDescription = '';

  @state()
  private _addBillable = false;

  /**
   * Format minutes into "Xh Ym" display.
   */
  private _formatDuration(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  }

  /**
   * Parse a duration string like "2h 30m", "2.5", "90m", "1h" into minutes.
   */
  private _parseDuration(input: string): number {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return 0;

    // Match "Xh Ym" pattern
    const hmMatch = trimmed.match(
      /^(\d+(?:\.\d+)?)\s*h(?:\s*(\d+)\s*m)?$/
    );
    if (hmMatch) {
      const hours = parseFloat(hmMatch[1]);
      const mins = hmMatch[2] ? parseInt(hmMatch[2], 10) : 0;
      return Math.round(hours * 60) + mins;
    }

    // Match "Xm" pattern
    const mMatch = trimmed.match(/^(\d+)\s*m$/);
    if (mMatch) {
      return parseInt(mMatch[1], 10);
    }

    // Plain number treated as hours
    const num = parseFloat(trimmed);
    if (!isNaN(num)) {
      return Math.round(num * 60);
    }

    return 0;
  }

  private _handleDelete(id: string) {
    this.dispatchEvent(
      new CustomEvent('ca-delete', {
        detail: { id },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleAdd() {
    const duration = this._parseDuration(this._addDuration);
    if (duration <= 0) return;

    this.dispatchEvent(
      new CustomEvent('ca-add', {
        detail: {
          duration,
          description: this._addDescription.trim(),
          billable: this._addBillable,
        },
        bubbles: true,
        composed: true,
      })
    );

    this._addDuration = '';
    this._addDescription = '';
    this._addBillable = false;
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this._handleAdd();
    }
  }

  render() {
    return html`
      <div class="header">
        <span class="header-label">Time logged</span>
        <span class="header-total">${this._formatDuration(this.totalLogged)}</span>
      </div>

      ${this.entries.length === 0
        ? html`<div class="empty">No time entries yet</div>`
        : html`
            <ul class="entries">
              ${this.entries.map(
                (entry) => html`
                  <li class="entry">
                    <span class="entry-duration">
                      ${this._formatDuration(entry.duration)}
                    </span>
                    <div class="entry-details">
                      ${entry.description
                        ? html`<div class="entry-desc">${entry.description}</div>`
                        : nothing}
                      <div class="entry-meta">
                        <span class="entry-user">${entry.user}</span>
                        <span class="entry-date">${entry.date}</span>
                        ${entry.billable
                          ? html`<span class="entry-billable">Billable</span>`
                          : nothing}
                      </div>
                    </div>
                    <button
                      class="entry-delete"
                      aria-label="Delete time entry"
                      @click=${() => this._handleDelete(entry.id)}
                    >
                      &times;
                    </button>
                  </li>
                `
              )}
            </ul>
          `}

      ${this.allowAdd ? this._renderAddRow() : nothing}
    `;
  }

  private _renderAddRow() {
    const canAdd = this._parseDuration(this._addDuration) > 0;

    return html`
      <div class="add-row">
        <input
          class="add-duration-input"
          type="text"
          placeholder="e.g. 1h 30m"
          .value=${this._addDuration}
          @input=${(e: Event) => {
            this._addDuration = (e.target as HTMLInputElement).value;
          }}
          @keydown=${this._handleKeydown}
        />
        <input
          class="add-desc-input"
          type="text"
          placeholder="Description (optional)"
          .value=${this._addDescription}
          @input=${(e: Event) => {
            this._addDescription = (e.target as HTMLInputElement).value;
          }}
          @keydown=${this._handleKeydown}
        />
        <label class="add-billable-label">
          <input
            type="checkbox"
            .checked=${this._addBillable}
            @change=${(e: Event) => {
              this._addBillable = (e.target as HTMLInputElement).checked;
            }}
          />
          Billable
        </label>
        <button
          class="add-btn"
          ?disabled=${!canAdd}
          @click=${this._handleAdd}
        >
          Add
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-time-log': CaTimeLog;
  }
}
