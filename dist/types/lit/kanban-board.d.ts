import { LitElement } from 'lit';
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
    labels?: {
        label: string;
        color: string;
    }[];
    assignees?: {
        name: string;
        src?: string;
        color?: string;
    }[];
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
export declare class CaKanbanBoard extends LitElement {
    static styles: import("lit").CSSResult;
    columns: KanbanColumnData[];
    allowCreate: boolean;
    private _dragCardId;
    private _dragFromColumnId;
    private _dragOverColumnId;
    private _dragOverIndex;
    private _addingColumnId;
    private _addCardValue;
    private _handleCardClick;
    private _handleDragStart;
    private _handleColumnDragOver;
    private _handleColumnDrop;
    private _handleDragEnd;
    private _resetDrag;
    private _handleAddCardKeyDown;
    render(): import("lit-html").TemplateResult<1>;
    private _renderColumn;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-kanban-board': CaKanbanBoard;
    }
}
