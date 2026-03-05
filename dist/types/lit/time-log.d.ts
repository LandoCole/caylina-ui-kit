import { LitElement } from 'lit';
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
export declare class CaTimeLog extends LitElement {
    static styles: import("lit").CSSResult;
    entries: TimeLogEntry[];
    allowAdd: boolean;
    totalLogged: number;
    private _addDuration;
    private _addDescription;
    private _addBillable;
    /**
     * Format minutes into "Xh Ym" display.
     */
    private _formatDuration;
    /**
     * Parse a duration string like "2h 30m", "2.5", "90m", "1h" into minutes.
     */
    private _parseDuration;
    private _handleDelete;
    private _handleAdd;
    private _handleKeydown;
    render(): import("lit-html").TemplateResult<1>;
    private _renderAddRow;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-time-log': CaTimeLog;
    }
}
