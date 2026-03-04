import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export interface GanttTask {
  id: string;
  title: string;
  startDate: string; // ISO "YYYY-MM-DD"
  endDate: string;   // ISO "YYYY-MM-DD"
  progress?: number; // 0-100
  color?: string;
  group?: string;
  dependencies?: string[]; // Task IDs this depends on
}

/**
 * `<ca-gantt-chart>` — Timeline view with drag-to-resize dates.
 *
 * @fires ca-task-resize - Dispatched when a task bar is resized. detail: `{ id, startDate, endDate }`
 * @fires ca-task-click - Dispatched when a task bar is clicked. detail: `{ task }`
 * @fires ca-range-change - Dispatched when the visible range changes. detail: `{ startDate, endDate }`
 */
@customElement('ca-gantt-chart')
export class CaGanttChart extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--ca-font-family);
      color: var(--ca-text-primary);
    }
    .gantt-container {
      display: flex;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-lg);
      overflow: hidden;
      background: var(--ca-surface);
    }

    /* ── Task list (left panel) ── */
    .task-list {
      flex: 0 0 220px;
      border-right: 1px solid var(--ca-border);
      overflow-y: auto;
    }
    .task-list-header {
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0 12px;
      font-weight: var(--ca-font-weight-semibold);
      font-size: var(--ca-font-size-sm);
      border-bottom: 1px solid var(--ca-border);
      background: var(--ca-surface-active);
    }
    .task-list-row {
      height: var(--ca-gantt-row-height, 40px);
      display: flex;
      align-items: center;
      padding: 0 12px;
      font-size: var(--ca-font-size-sm);
      border-bottom: 1px solid var(--ca-border);
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .task-list-row:hover {
      background: var(--ca-surface-hover);
    }

    /* ── Timeline (right panel) ── */
    .timeline {
      flex: 1;
      overflow-x: auto;
      overflow-y: auto;
    }
    .timeline-inner {
      min-width: 100%;
      position: relative;
    }

    /* ── Header dates ── */
    .timeline-header {
      display: flex;
      height: 40px;
      border-bottom: 1px solid var(--ca-border);
      background: var(--ca-surface-active);
      position: sticky;
      top: 0;
      z-index: 2;
    }
    .timeline-date {
      flex: 0 0 var(--col-width, 40px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: var(--ca-text-muted);
      border-right: 1px solid var(--ca-border);
      box-sizing: border-box;
    }
    .timeline-date.weekend {
      background: color-mix(in srgb, var(--ca-surface-active) 50%, var(--ca-border) 5%);
    }
    .timeline-date.today {
      color: var(--ca-gantt-today-color, var(--ca-color-danger));
      font-weight: var(--ca-font-weight-semibold);
    }

    /* ── Rows grid ── */
    .timeline-rows {
      position: relative;
    }
    .timeline-row {
      height: var(--ca-gantt-row-height, 40px);
      position: relative;
      border-bottom: 1px solid var(--ca-border);
    }
    .timeline-row-bg {
      display: flex;
      height: 100%;
    }
    .timeline-cell {
      flex: 0 0 var(--col-width, 40px);
      border-right: 1px solid color-mix(in srgb, var(--ca-border) 30%, transparent);
      box-sizing: border-box;
    }
    .timeline-cell.weekend {
      background: color-mix(in srgb, var(--ca-surface-active) 50%, var(--ca-border) 3%);
    }

    /* ── Today marker ── */
    .today-marker {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--ca-gantt-today-color, var(--ca-color-danger));
      z-index: 3;
      pointer-events: none;
    }

    /* ── Task bars ── */
    .task-bar {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      height: var(--ca-gantt-bar-height, 24px);
      border-radius: var(--ca-radius-sm);
      cursor: pointer;
      display: flex;
      align-items: center;
      overflow: hidden;
      transition: opacity var(--ca-transition-fast);
      z-index: 1;
    }
    .task-bar:hover {
      opacity: 0.85;
    }
    .task-bar-fill {
      height: 100%;
      border-radius: inherit;
      opacity: 0.3;
    }
    .task-bar-label {
      position: absolute;
      left: 6px;
      font-size: 10px;
      font-weight: var(--ca-font-weight-semibold);
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: calc(100% - 12px);
    }

    /* ── Resize handles ── */
    .resize-handle {
      position: absolute;
      top: 0;
      width: 6px;
      height: 100%;
      cursor: ew-resize;
      z-index: 2;
    }
    .resize-handle.left { left: 0; }
    .resize-handle.right { right: 0; }

    /* ── View mode selector ── */
    .view-controls {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 8px 12px;
      border-bottom: 1px solid var(--ca-border);
    }
    .view-btn {
      padding: 4px 10px;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-sm);
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-secondary);
    }
    .view-btn.active {
      background: var(--ca-color-secondary);
      color: var(--ca-color-white);
      border-color: var(--ca-color-secondary);
    }
    .view-btn:hover:not(.active) {
      background: var(--ca-surface-hover);
    }
  `;

  @property({ type: Array, attribute: false })
  tasks: GanttTask[] = [];

  @property({ type: String, attribute: 'view-mode' })
  viewMode: 'day' | 'week' | 'month' = 'week';

  @property({ type: Boolean, attribute: 'show-today-marker' })
  showTodayMarker = true;

  @state() private _resizingTaskId: string | null = null;
  @state() private _resizeSide: 'left' | 'right' | null = null;
  @state() private _resizeStartX = 0;
  @state() private _resizeStartDate: Date | null = null;

  /* ── Date helpers ── */

  private _parseDate(s: string): Date {
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  private _toISO(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  private _daysBetween(a: Date, b: Date): number {
    return Math.round((b.getTime() - a.getTime()) / (86400000));
  }

  private _addDays(d: Date, n: number): Date {
    const r = new Date(d);
    r.setDate(r.getDate() + n);
    return r;
  }

  private _isWeekend(d: Date): boolean {
    const day = d.getDay();
    return day === 0 || day === 6;
  }

  private get _dateRange(): { start: Date; end: Date; days: Date[] } {
    if (this.tasks.length === 0) {
      const today = new Date();
      const start = this._addDays(today, -7);
      const end = this._addDays(today, 21);
      return this._buildRange(start, end);
    }
    const starts = this.tasks.map((t) => this._parseDate(t.startDate));
    const ends = this.tasks.map((t) => this._parseDate(t.endDate));
    const minDate = new Date(Math.min(...starts.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...ends.map((d) => d.getTime())));
    // Add padding
    const start = this._addDays(minDate, -3);
    const end = this._addDays(maxDate, 7);
    return this._buildRange(start, end);
  }

  private _buildRange(start: Date, end: Date): { start: Date; end: Date; days: Date[] } {
    const days: Date[] = [];
    let current = new Date(start);
    while (current <= end) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return { start, end, days };
  }

  private get _colWidth(): number {
    switch (this.viewMode) {
      case 'day': return 40;
      case 'week': return 24;
      case 'month': return 8;
    }
  }

  /* ── Resize ── */

  private _handleResizeStart(e: PointerEvent, taskId: string, side: 'left' | 'right') {
    e.stopPropagation();
    e.preventDefault();
    this._resizingTaskId = taskId;
    this._resizeSide = side;
    this._resizeStartX = e.clientX;
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      this._resizeStartDate = this._parseDate(side === 'left' ? task.startDate : task.endDate);
    }
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  private _handleResizeMove(e: PointerEvent) {
    if (!this._resizingTaskId || !this._resizeStartDate) return;
    // Could add live preview here; for now just track
  }

  private _handleResizeEnd(e: PointerEvent) {
    if (!this._resizingTaskId || !this._resizeStartDate) {
      this._resizingTaskId = null;
      return;
    }

    const dx = e.clientX - this._resizeStartX;
    const daysDelta = Math.round(dx / this._colWidth);
    const task = this.tasks.find((t) => t.id === this._resizingTaskId);

    if (task && daysDelta !== 0) {
      let newStart = this._parseDate(task.startDate);
      let newEnd = this._parseDate(task.endDate);

      if (this._resizeSide === 'left') {
        newStart = this._addDays(newStart, daysDelta);
        if (newStart >= newEnd) newStart = this._addDays(newEnd, -1);
      } else {
        newEnd = this._addDays(newEnd, daysDelta);
        if (newEnd <= newStart) newEnd = this._addDays(newStart, 1);
      }

      this.dispatchEvent(
        new CustomEvent('ca-task-resize', {
          detail: { id: task.id, startDate: this._toISO(newStart), endDate: this._toISO(newEnd) },
          bubbles: true,
          composed: true,
        })
      );
    }

    this._resizingTaskId = null;
    this._resizeSide = null;
    this._resizeStartDate = null;
  }

  private _handleTaskClick(task: GanttTask) {
    this.dispatchEvent(
      new CustomEvent('ca-task-click', {
        detail: { task },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleViewChange(mode: 'day' | 'week' | 'month') {
    this.viewMode = mode;
  }

  /* ── Format date labels ── */

  private _formatDateLabel(d: Date): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    switch (this.viewMode) {
      case 'day':
        return `${d.getDate()} ${months[d.getMonth()]}`;
      case 'week':
        return `${d.getDate()}`;
      case 'month':
        return d.getDate() === 1 ? months[d.getMonth()] : '';
    }
  }

  render() {
    const { days } = this._dateRange;
    const colWidth = this._colWidth;
    const totalWidth = days.length * colWidth;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayIndex = days.findIndex((d) =>
      d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate()
    );

    return html`
      <div class="view-controls">
        ${(['day', 'week', 'month'] as const).map(
          (m) => html`
            <button class=${classMap({ 'view-btn': true, active: this.viewMode === m })} @click=${() => this._handleViewChange(m)}>
              ${m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          `
        )}
      </div>
      <div class="gantt-container">
        <!-- Task list -->
        <div class="task-list">
          <div class="task-list-header">Tasks</div>
          ${this.tasks.map(
            (task) => html`
              <div class="task-list-row" @click=${() => this._handleTaskClick(task)}>${task.title}</div>
            `
          )}
        </div>
        <!-- Timeline -->
        <div class="timeline">
          <div class="timeline-inner" style="width:${totalWidth}px; --col-width:${colWidth}px">
            <!-- Header -->
            <div class="timeline-header">
              ${days.map((d) => {
                const label = this._formatDateLabel(d);
                const isToday = d.getTime() === today.getTime();
                const weekend = this._isWeekend(d);
                return html`<div class=${classMap({ 'timeline-date': true, weekend, today: isToday })}>${label}</div>`;
              })}
            </div>
            <!-- Rows -->
            <div class="timeline-rows">
              ${this.showTodayMarker && todayIndex >= 0
                ? html`<div class="today-marker" style="left:${todayIndex * colWidth + colWidth / 2}px"></div>`
                : nothing}
              ${this.tasks.map((task, rowIndex) => {
                const taskStart = this._parseDate(task.startDate);
                const taskEnd = this._parseDate(task.endDate);
                const rangeStart = days[0];
                const offsetDays = this._daysBetween(rangeStart, taskStart);
                const duration = this._daysBetween(taskStart, taskEnd) + 1;
                const left = offsetDays * colWidth;
                const width = duration * colWidth;
                const color = task.color || 'var(--ca-color-primary)';

                return html`
                  <div class="timeline-row">
                    <div class="timeline-row-bg">
                      ${days.map((d) => html`<div class=${classMap({ 'timeline-cell': true, weekend: this._isWeekend(d) })}></div>`)}
                    </div>
                    <div
                      class="task-bar"
                      style="left:${left}px; width:${Math.max(width, colWidth)}px; background-color:${color}"
                      @click=${() => this._handleTaskClick(task)}
                      @pointermove=${this._handleResizeMove}
                      @pointerup=${this._handleResizeEnd}
                    >
                      ${task.progress != null
                        ? html`<div class="task-bar-fill" style="width:${task.progress}%; background-color:${color}"></div>`
                        : nothing}
                      <span class="task-bar-label">${task.title}</span>
                      <div class="resize-handle left"
                        @pointerdown=${(e: PointerEvent) => this._handleResizeStart(e, task.id, 'left')}></div>
                      <div class="resize-handle right"
                        @pointerdown=${(e: PointerEvent) => this._handleResizeStart(e, task.id, 'right')}></div>
                    </div>
                  </div>
                `;
              })}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-gantt-chart': CaGanttChart;
  }
}
