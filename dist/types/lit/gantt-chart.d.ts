import { LitElement } from 'lit';
export interface GanttTask {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    progress?: number;
    color?: string;
    group?: string;
    dependencies?: string[];
}
/**
 * `<ca-gantt-chart>` — Timeline view with drag-to-resize dates.
 *
 * @fires ca-task-resize - Dispatched when a task bar is resized. detail: `{ id, startDate, endDate }`
 * @fires ca-task-click - Dispatched when a task bar is clicked. detail: `{ task }`
 * @fires ca-range-change - Dispatched when the visible range changes. detail: `{ startDate, endDate }`
 */
export declare class CaGanttChart extends LitElement {
    static styles: import("lit").CSSResult;
    tasks: GanttTask[];
    viewMode: 'day' | 'week' | 'month';
    showTodayMarker: boolean;
    private _resizingTaskId;
    private _resizeSide;
    private _resizeStartX;
    private _resizeStartDate;
    private _parseDate;
    private _toISO;
    private _daysBetween;
    private _addDays;
    private _isWeekend;
    private get _dateRange();
    private _buildRange;
    private get _colWidth();
    private _handleResizeStart;
    private _handleResizeMove;
    private _handleResizeEnd;
    private _handleTaskClick;
    private _handleViewChange;
    private _formatDateLabel;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-gantt-chart': CaGanttChart;
    }
}
