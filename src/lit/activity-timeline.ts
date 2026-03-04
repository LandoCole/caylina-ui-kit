import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './avatar.js';

export interface ActivityTimelineEntry {
  id: string;
  user: { name: string; src?: string };
  action: string;
  timestamp: string;
  details?: string;
}

/**
 * `<ca-activity-timeline>` — Vertical activity log.
 *
 * @fires ca-load-more - Dispatched when the "Load more" button is clicked.
 */
@customElement('ca-activity-timeline')
export class CaActivityTimeline extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--ca-font-family);
    }
    .timeline {
      position: relative;
      padding: 0;
      margin: 0;
      list-style: none;
    }
    /* Vertical dotted line */
    .timeline::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 19px;
      width: 1px;
      border-left: 2px dotted var(--ca-border);
    }
    .entry {
      position: relative;
      display: flex;
      gap: 12px;
      padding: 12px 0;
    }
    .entry:first-child {
      padding-top: 0;
    }
    .entry:last-child {
      padding-bottom: 0;
    }
    .avatar-col {
      position: relative;
      z-index: 1;
      flex-shrink: 0;
    }
    .content {
      flex: 1;
      min-width: 0;
      padding-top: 2px;
    }
    .action-row {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 6px;
    }
    .user-name {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
      line-height: 1.4;
    }
    .action-text {
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-secondary);
      line-height: 1.4;
    }
    .timestamp {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      line-height: 1.4;
      margin-top: 2px;
    }
    .details {
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-muted);
      line-height: 1.5;
      margin-top: 4px;
    }
    .load-more-wrapper {
      display: flex;
      justify-content: center;
      padding-top: 16px;
    }
    .load-more-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 8px 16px;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-surface);
      color: var(--ca-text-primary);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      cursor: pointer;
      transition: background-color var(--ca-transition-fast),
        border-color var(--ca-transition-fast);
    }
    .load-more-btn:hover {
      background-color: var(--ca-surface-hover);
      border-color: var(--ca-border-strong);
    }
    .load-more-btn:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: 2px;
    }
    .loading {
      display: flex;
      justify-content: center;
      padding: 24px 0;
      color: var(--ca-text-muted);
      font-size: var(--ca-font-size-sm);
    }
  `;

  @property({ type: Array })
  entries: ActivityTimelineEntry[] = [];

  @property({ type: Boolean })
  loading = false;

  private _handleLoadMore() {
    this.dispatchEvent(
      new CustomEvent('ca-load-more', {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    if (this.loading && this.entries.length === 0) {
      return html`<div class="loading">Loading activity...</div>`;
    }

    return html`
      <ul class="timeline">
        ${this.entries.map(
          (entry) => html`
            <li class="entry">
              <div class="avatar-col">
                <ca-avatar
                  size="sm"
                  name=${entry.user.name}
                  src=${entry.user.src ?? ''}
                ></ca-avatar>
              </div>
              <div class="content">
                <div class="action-row">
                  <span class="user-name">${entry.user.name}</span>
                  <span class="action-text">${entry.action}</span>
                </div>
                <div class="timestamp">${entry.timestamp}</div>
                ${entry.details
                  ? html`<div class="details">${entry.details}</div>`
                  : nothing}
              </div>
            </li>
          `
        )}
      </ul>
      ${this.entries.length > 0
        ? html`
            <div class="load-more-wrapper">
              <button
                class="load-more-btn"
                @click=${this._handleLoadMore}
                ?disabled=${this.loading}
              >
                ${this.loading ? 'Loading...' : 'Load more'}
              </button>
            </div>
          `
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-activity-timeline': CaActivityTimeline;
  }
}
