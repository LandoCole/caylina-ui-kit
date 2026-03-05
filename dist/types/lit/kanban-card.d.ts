import { LitElement } from 'lit';
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
export declare class CaKanbanCard extends LitElement {
    static styles: import("lit").CSSResult;
    title: string;
    taskKey: string;
    priorityColor: string;
    dueDate: string;
    overdue: boolean;
    labels: KanbanCardLabel[];
    assignees: KanbanCardAssignee[];
    commentsCount: number;
    attachmentsCount: number;
    private _handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-kanban-card': CaKanbanCard;
    }
}
