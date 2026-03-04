import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './kanban-card.js';

export interface KanbanColumnData {
  id: string;
  label: string;
  color?: string;
  cards: KanbanCardData[];
}

export interface KanbanCardData {
  id: string;
  title: string;
  taskKey?: string;
  priorityColor?: string;
  dueDate?: string;
  overdue?: boolean;
  labels?: { label: string; color: string }[];
  assignees?: { name: string; src?: string; color?: string }[];
  commentsCount?: number;
  attachmentsCount?: number;
}

/**
 * `<ca-kanban-board>` — Drag-and-drop column board.
 *
 * @fires ca-card-move - Dispatched when a card is moved. detail: `{ cardId, fromColumnId, toColumnId, toIndex }`
 * @fires ca-card-click - Dispatched when a card is clicked. detail: `{ card, columnId }`
 * @fires ca-card-create - Dispatched when "Add card" is clicked. detail: `{ columnId, title }`
 */
@customElement('ca-kanban-board')
export class CaKanbanBoard extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--ca-font-family);
    }
    .board {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      padding: 4px;
      align-items: flex-start;
    }
    .column {
      flex: 0 0 280px;
      min-width: 280px;
      max-height: calc(100vh - 200px);
      display: flex;
      flex-direction: column;
      background-color: var(--ca-kanban-column-bg);
      border-radius: var(--ca-radius-lg);
      overflow: hidden;
    }
    .column-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      flex-shrink: 0;
    }
    .column-color {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .column-label {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
    }
    .column-count {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      margin-left: auto;
    }
    .column-cards {
      flex: 1;
      overflow-y: auto;
      padding: 0 8px 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-height: 40px;
    }
    .column-cards.drag-over {
      background-color: color-mix(in srgb, var(--ca-color-primary) 5%, transparent);
      border-radius: var(--ca-radius-md);
    }
    .add-card-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px;
      margin: 0 8px 8px;
      border: 1px dashed var(--ca-border-strong);
      border-radius: var(--ca-radius-md);
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      transition: color var(--ca-transition-fast), border-color var(--ca-transition-fast);
      flex-shrink: 0;
    }
    .add-card-btn:hover {
      color: var(--ca-text-primary);
      border-color: var(--ca-text-primary);
    }
    .add-card-input {
      margin: 0 8px 8px;
      flex-shrink: 0;
    }
    .add-card-input input {
      width: 100%;
      border: 1px solid var(--ca-border-strong);
      border-radius: var(--ca-radius-md);
      padding: 8px 12px;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      background: var(--ca-surface);
      box-sizing: border-box;
    }
    .add-card-input input:focus {
      outline: none;
      border-color: var(--ca-text-primary);
    }

    /* Drag state */
    ca-kanban-card {
      transition: opacity var(--ca-transition-fast);
    }
    ca-kanban-card.dragging {
      opacity: 0.4;
    }
    .drop-indicator {
      height: 3px;
      background-color: var(--ca-color-primary);
      border-radius: 2px;
      margin: -2px 0;
    }
  `;

  @property({ type: Array, attribute: false })
  columns: KanbanColumnData[] = [];

  @property({ type: Boolean, attribute: 'allow-create' })
  allowCreate = false;

  @state() private _dragCardId: string | null = null;
  @state() private _dragFromColumnId: string | null = null;
  @state() private _dragOverColumnId: string | null = null;
  @state() private _dragOverIndex: number = -1;
  @state() private _addingColumnId: string | null = null;
  @state() private _addCardValue = '';

  private _handleCardClick(card: KanbanCardData, columnId: string) {
    this.dispatchEvent(
      new CustomEvent('ca-card-click', {
        detail: { card, columnId },
        bubbles: true,
        composed: true,
      })
    );
  }

  /* ── Pointer-based drag ── */

  private _handleDragStart(e: PointerEvent, cardId: string, columnId: string) {
    // Only initiate drag on left button
    if (e.button !== 0) return;
    e.preventDefault();
    this._dragCardId = cardId;
    this._dragFromColumnId = columnId;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }

  private _handleColumnDragOver(e: PointerEvent, columnId: string, cardIndex: number) {
    if (!this._dragCardId) return;
    this._dragOverColumnId = columnId;
    this._dragOverIndex = cardIndex;
  }

  private _handleColumnDrop(columnId: string) {
    if (!this._dragCardId || !this._dragFromColumnId) return;

    if (this._dragFromColumnId !== columnId || this._dragOverIndex >= 0) {
      this.dispatchEvent(
        new CustomEvent('ca-card-move', {
          detail: {
            cardId: this._dragCardId,
            fromColumnId: this._dragFromColumnId,
            toColumnId: columnId,
            toIndex: Math.max(0, this._dragOverIndex),
          },
          bubbles: true,
          composed: true,
        })
      );
    }

    this._resetDrag();
  }

  private _handleDragEnd() {
    if (this._dragCardId && this._dragOverColumnId) {
      this._handleColumnDrop(this._dragOverColumnId);
    } else {
      this._resetDrag();
    }
  }

  private _resetDrag() {
    this._dragCardId = null;
    this._dragFromColumnId = null;
    this._dragOverColumnId = null;
    this._dragOverIndex = -1;
  }

  /* ── Add card ── */

  private _handleAddCardKeyDown(e: KeyboardEvent, columnId: string) {
    if (e.key === 'Enter' && this._addCardValue.trim()) {
      this.dispatchEvent(
        new CustomEvent('ca-card-create', {
          detail: { columnId, title: this._addCardValue.trim() },
          bubbles: true,
          composed: true,
        })
      );
      this._addCardValue = '';
      this._addingColumnId = null;
    } else if (e.key === 'Escape') {
      this._addCardValue = '';
      this._addingColumnId = null;
    }
  }

  render() {
    return html`
      <div class="board" @pointerup=${this._handleDragEnd}>
        ${this.columns.map((col) => this._renderColumn(col))}
      </div>
    `;
  }

  private _renderColumn(col: KanbanColumnData) {
    const isDropTarget = this._dragOverColumnId === col.id && this._dragCardId;

    return html`
      <div class="column">
        <div class="column-header">
          ${col.color ? html`<span class="column-color" style="background-color: ${col.color}"></span>` : nothing}
          <span class="column-label">${col.label}</span>
          <span class="column-count">${col.cards.length}</span>
        </div>
        <div
          class="column-cards ${isDropTarget ? 'drag-over' : ''}"
          @pointerenter=${(e: PointerEvent) => this._handleColumnDragOver(e, col.id, col.cards.length)}
        >
          ${col.cards.map((card, i) => html`
            <ca-kanban-card
              class=${this._dragCardId === card.id ? 'dragging' : ''}
              .title=${card.title}
              .taskKey=${card.taskKey || ''}
              .priorityColor=${card.priorityColor || ''}
              .dueDate=${card.dueDate || ''}
              ?overdue=${card.overdue || false}
              .labels=${card.labels || []}
              .assignees=${card.assignees || []}
              .commentsCount=${card.commentsCount || 0}
              .attachmentsCount=${card.attachmentsCount || 0}
              @ca-click=${() => this._handleCardClick(card, col.id)}
              @pointerdown=${(e: PointerEvent) => this._handleDragStart(e, card.id, col.id)}
              @pointerenter=${(e: PointerEvent) => this._handleColumnDragOver(e, col.id, i)}
            ></ca-kanban-card>
          `)}
        </div>
        ${this.allowCreate
          ? this._addingColumnId === col.id
            ? html`
                <div class="add-card-input">
                  <input
                    type="text"
                    placeholder="Card title..."
                    .value=${this._addCardValue}
                    @input=${(e: Event) => { this._addCardValue = (e.target as HTMLInputElement).value; }}
                    @keydown=${(e: KeyboardEvent) => this._handleAddCardKeyDown(e, col.id)}
                    @blur=${() => { this._addingColumnId = null; this._addCardValue = ''; }}
                  />
                </div>
              `
            : html`
                <button class="add-card-btn" @click=${() => {
                  this._addingColumnId = col.id;
                  this.updateComplete.then(() => {
                    this.shadowRoot?.querySelector<HTMLInputElement>('.add-card-input input')?.focus();
                  });
                }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                  Add card
                </button>
              `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-kanban-board': CaKanbanBoard;
  }
}
