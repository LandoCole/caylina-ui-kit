import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './avatar-group.js';
import './badge.js';

export interface KanbanCardLabel {
  label: string;
  color: string;
}

export interface KanbanCardAssignee {
  name: string;
  src?: string;
  color?: string;
}

/**
 * `<ca-kanban-card>` — Card for kanban boards.
 *
 * @fires ca-click - Dispatched when the card is clicked.
 */
@customElement('ca-kanban-card')
export class CaKanbanCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .card {
      background-color: var(--ca-surface);
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      padding: 12px;
      cursor: pointer;
      box-shadow: var(--ca-kanban-card-shadow);
      transition: box-shadow var(--ca-transition-fast), border-color var(--ca-transition-fast);
      font-family: var(--ca-font-family);
    }
    .card:hover {
      box-shadow: var(--ca-shadow-md);
      border-color: var(--ca-border-strong);
    }
    .card.overdue {
      border-left: 3px solid var(--ca-color-danger);
    }
    .task-key {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      margin-bottom: 4px;
    }
    .title {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
      line-height: 1.4;
      margin-bottom: 8px;
      word-break: break-word;
    }
    .labels {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-bottom: 8px;
    }
    .label-chip {
      display: inline-flex;
      padding: 1px 6px;
      border-radius: var(--ca-radius-full);
      font-size: 10px;
      font-weight: var(--ca-font-weight-semibold);
      color: #fff;
      line-height: 1.5;
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .footer-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .priority-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .due-date {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-secondary);
    }
    .due-date.overdue {
      color: var(--ca-text-danger);
      font-weight: var(--ca-font-weight-semibold);
    }
    .meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
    }
    .meta-item {
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }
    .meta-item svg {
      width: 12px;
      height: 12px;
    }
  `;

  @property({ type: String }) title = '';
  @property({ type: String, attribute: 'task-key' }) taskKey = '';
  @property({ type: String, attribute: 'priority-color' }) priorityColor = '';
  @property({ type: String, attribute: 'due-date' }) dueDate = '';
  @property({ type: Boolean }) overdue = false;
  @property({ type: Array, attribute: false }) labels: KanbanCardLabel[] = [];
  @property({ type: Array, attribute: false }) assignees: KanbanCardAssignee[] = [];
  @property({ type: Number, attribute: 'comments-count' }) commentsCount = 0;
  @property({ type: Number, attribute: 'attachments-count' }) attachmentsCount = 0;

  private _handleClick() {
    this.dispatchEvent(new CustomEvent('ca-click', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="card ${this.overdue ? 'overdue' : ''}" @click=${this._handleClick}>
        ${this.taskKey ? html`<div class="task-key">${this.taskKey}</div>` : nothing}
        <div class="title">${this.title}</div>
        ${this.labels.length > 0
          ? html`<div class="labels">
              ${this.labels.map((l) => html`<span class="label-chip" style="background-color: ${l.color}">${l.label}</span>`)}
            </div>`
          : nothing}
        <div class="footer">
          <div class="footer-left">
            ${this.priorityColor ? html`<span class="priority-dot" style="background-color: ${this.priorityColor}"></span>` : nothing}
            ${this.dueDate ? html`<span class="due-date ${this.overdue ? 'overdue' : ''}">${this.dueDate}</span>` : nothing}
            <div class="meta">
              ${this.commentsCount > 0
                ? html`<span class="meta-item">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M2 3h12v8H5l-3 3V3z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    ${this.commentsCount}
                  </span>`
                : nothing}
              ${this.attachmentsCount > 0
                ? html`<span class="meta-item">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M13.5 7.5l-5.5 5.5a3.5 3.5 0 01-5-5l5.5-5.5a2 2 0 013 3L6 11a.5.5 0 01-1-1l4.5-4.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    ${this.attachmentsCount}
                  </span>`
                : nothing}
            </div>
          </div>
          ${this.assignees.length > 0
            ? html`<ca-avatar-group .members=${this.assignees} size="xs" .max=${2}></ca-avatar-group>`
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-kanban-card': CaKanbanCard;
  }
}
