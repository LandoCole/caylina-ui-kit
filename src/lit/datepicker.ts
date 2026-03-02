import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import {
  MONTH_NAMES,
  WEEKDAY_LABELS,
  buildCalendarGrid,
  formatDate,
  toISODateString,
  parseISODateString,
  isSameDay,
  isInRange,
  isDateDisabled,
  type CalendarCell,
} from './date-utils.js';

/* ── Inline SVG icons (shared template results) ── */

const calendarIconSvg = html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
const chevronLeftSvg = html`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 12L6 8l4-4"/></svg>`;
const chevronRightSvg = html`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4l4 4-4 4"/></svg>`;
const chevronDownSvg = html`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>`;

/* ── Helpers ── */

function cellToDate(cell: CalendarCell): Date {
  return new Date(cell.year, cell.month, cell.day);
}

/**
 * `<ca-datepicker>` -- Date picker supporting single and range selection.
 *
 * @fires ca-change - Dispatched when the selected date changes.
 *   Single mode detail: `{ value: "YYYY-MM-DD" }`
 *   Range mode detail:  `{ startDate: "YYYY-MM-DD", endDate: "YYYY-MM-DD" }`
 *
 * @csspart field - The trigger / input-like element
 * @csspart dropdown - The calendar dropdown panel
 */
@customElement('ca-datepicker')
export class CaDatepicker extends LitElement {
  static styles = css`
    /* ── Private custom properties ── */
    :host {
      --_bg: var(--ca-datepicker-bg, var(--ca-surface));
      --_border: var(--ca-datepicker-border, var(--ca-border-input));
      --_radius: var(--ca-datepicker-radius, var(--ca-radius-md));
      --_color: var(--ca-datepicker-color, var(--ca-text-primary));
      --_focus-border: var(--ca-datepicker-focus-border, var(--ca-text-primary));
      --_day-size: var(--ca-datepicker-day-size, 36px);
      --_day-hover-bg: var(--ca-datepicker-day-hover-bg, var(--ca-surface-hover));
      --_selected-bg: var(--ca-datepicker-selected-bg, var(--ca-color-primary));
      --_selected-color: var(--ca-datepicker-selected-color, #ffffff);
      --_range-bg: var(--ca-datepicker-range-bg, color-mix(in srgb, var(--ca-color-primary) 12%, transparent));
      --_today-border: var(--ca-datepicker-today-border, var(--ca-border-strong));
      --_shadow: var(--ca-datepicker-shadow, var(--ca-shadow-menu));

      display: flex;
      flex-direction: column;
      gap: 6px;
      position: relative;
      width: 100%;
      font-family: var(--ca-font-family);
    }

    :host([disabled]) {
      pointer-events: none;
    }

    /* ── Label ── */
    .label {
      font-weight: var(--ca-font-weight-semibold);
      font-size: var(--ca-font-size-sm);
      color: var(--_color);
      line-height: 1;
    }

    /* ── Field / trigger ── */
    .field {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--_border);
      border-radius: var(--_radius);
      background-color: var(--_bg);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-md);
      color: var(--_color);
      cursor: pointer;
      box-sizing: border-box;
      line-height: 1;
      transition: border-color var(--ca-transition-fast);
    }

    .field:hover:not(.disabled) {
      border-color: var(--_focus-border);
    }

    .field:focus-visible,
    .field:focus {
      outline: none;
      border: 2px solid var(--_focus-border);
    }

    .field.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ── Size variants ── */
    :host([size='xs']) .field {
      padding: 6px 8px;
      font-size: 11px;
      border-radius: 6px;
      gap: 6px;
    }
    :host([size='sm']) .field {
      padding: 8px 10px;
      font-size: var(--ca-font-size-xs);
      border-radius: 6px;
      gap: 8px;
    }
    :host([size='lg']) .field {
      padding: 14px 14px;
      font-size: var(--ca-font-size-lg);
      border-radius: 10px;
      gap: 12px;
    }
    :host([size='xl']) .field {
      padding: 18px 16px;
      font-size: 20px;
      border-radius: 12px;
      gap: 14px;
    }

    /* ── Calendar icon ── */
    .calendar-icon {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      color: var(--ca-text-muted);
    }
    .calendar-icon svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    :host([size='xs']) .calendar-icon { width: 12px; height: 12px; }
    :host([size='sm']) .calendar-icon { width: 14px; height: 14px; }
    :host([size='lg']) .calendar-icon { width: 20px; height: 20px; }
    :host([size='xl']) .calendar-icon { width: 22px; height: 22px; }

    /* ── Value text ── */
    .value-text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--_color);
    }
    .value-text.placeholder {
      color: var(--ca-text-secondary);
    }

    /* ── Chevron ── */
    .chevron {
      flex-shrink: 0;
      width: 14px;
      height: 14px;
      color: var(--ca-text-muted);
      transition: transform var(--ca-transition-normal);
    }
    .chevron svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    .chevron.open {
      transform: rotate(180deg);
    }
    :host([size='xs']) .chevron { width: 10px; height: 10px; }
    :host([size='sm']) .chevron { width: 12px; height: 12px; }
    :host([size='lg']) .chevron { width: 16px; height: 16px; }
    :host([size='xl']) .chevron { width: 18px; height: 18px; }

    /* ── Error ── */
    .error-text {
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-danger);
      line-height: 1.3;
    }
    :host([error]) .field {
      border-color: var(--ca-text-danger);
    }

    /* ── Dropdown ── */
    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 10;
      margin-top: 4px;
      min-width: 280px;
      background-color: var(--_bg);
      border: 1px solid var(--ca-border-strong);
      border-radius: var(--_radius);
      box-shadow: var(--_shadow);
      box-sizing: border-box;
      padding: 12px;
      animation: ca-dp-fade-in 0.12s ease;
    }

    @keyframes ca-dp-fade-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Calendar header ── */
    .calendar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .nav-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: var(--ca-radius-sm);
      background: none;
      color: var(--_color);
      cursor: pointer;
      padding: 0;
    }
    .nav-button:hover {
      background-color: var(--_day-hover-bg);
    }
    .nav-button:focus-visible {
      outline: 2px solid var(--_focus-border);
      outline-offset: -2px;
    }
    .nav-button:focus:not(:focus-visible) {
      outline: none;
    }
    .nav-button svg {
      width: 14px;
      height: 14px;
    }

    .month-year {
      font-weight: var(--ca-font-weight-semibold);
      font-size: var(--ca-font-size-md);
      color: var(--_color);
    }

    /* ── Weekday row ── */
    .weekday-row {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      margin-bottom: 4px;
    }

    .weekday {
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--_day-size);
      font-size: 11px;
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-muted);
      user-select: none;
    }

    /* ── Day grid ── */
    .day-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
    }

    .day-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: var(--_day-size);
      border: none;
      border-radius: 50%;
      background: none;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--_color);
      cursor: pointer;
      padding: 0;
      position: relative;
      box-sizing: border-box;
    }

    .day-cell:hover:not(.day-disabled):not(.selected) {
      background-color: var(--_day-hover-bg);
    }

    .day-cell:focus-visible {
      outline: 2px solid var(--_focus-border);
      outline-offset: -2px;
      z-index: 1;
    }

    .day-cell:focus:not(:focus-visible) {
      outline: none;
    }

    /* Outside current month */
    .day-cell.outside {
      color: var(--ca-text-muted);
      opacity: 0.4;
    }

    /* Today */
    .day-cell.today {
      border: 1px solid var(--_today-border);
      font-weight: var(--ca-font-weight-semibold);
    }

    /* Selected */
    .day-cell.selected {
      background-color: var(--_selected-bg);
      color: var(--_selected-color);
      font-weight: var(--ca-font-weight-semibold);
    }

    .day-cell.selected.today {
      border-color: var(--_selected-bg);
    }

    /* Range in-between */
    .day-cell.in-range {
      background-color: var(--_range-bg);
      border-radius: 0;
    }

    /* Range endpoints */
    .day-cell.range-start {
      border-radius: 50% 0 0 50%;
    }

    .day-cell.range-end {
      border-radius: 0 50% 50% 0;
    }

    .day-cell.range-start.range-end {
      border-radius: 50%;
    }

    /* Disabled day */
    .day-cell.day-disabled {
      color: var(--ca-text-muted);
      opacity: 0.3;
      cursor: not-allowed;
    }

    /* ── Footer ── */
    .calendar-footer {
      display: flex;
      justify-content: center;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid var(--ca-border);
    }

    .today-button {
      border: none;
      background: none;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-color-primary);
      cursor: pointer;
      padding: 4px 12px;
      border-radius: var(--ca-radius-sm);
    }
    .today-button:hover {
      background-color: var(--_day-hover-bg);
    }
    .today-button:focus-visible {
      outline: 2px solid var(--_focus-border);
      outline-offset: -2px;
    }
    .today-button:focus:not(:focus-visible) {
      outline: none;
    }

    /* ── Screen reader only ── */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;

  // ── Public properties ──────────────────────────────────────────────

  /** Selection mode. */
  @property({ type: String, reflect: true })
  mode: 'single' | 'range' = 'single';

  /** Size variant. */
  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** Selected date as ISO "YYYY-MM-DD" (single mode). */
  @property({ type: String })
  value = '';

  /** Range start date as ISO "YYYY-MM-DD" (range mode). */
  @property({ type: String, attribute: 'start-date' })
  startDate = '';

  /** Range end date as ISO "YYYY-MM-DD" (range mode). */
  @property({ type: String, attribute: 'end-date' })
  endDate = '';

  /** Label text displayed above the trigger field. */
  @property({ type: String })
  label = '';

  /** Error message displayed below the trigger field. */
  @property({ type: String, reflect: true })
  error = '';

  /** Placeholder text when no date is selected. */
  @property({ type: String })
  placeholder = 'Select date';

  /** Minimum selectable date (ISO "YYYY-MM-DD"). */
  @property({ type: String, attribute: 'min-date' })
  minDate = '';

  /** Maximum selectable date (ISO "YYYY-MM-DD"). */
  @property({ type: String, attribute: 'max-date' })
  maxDate = '';

  /** Disabled state. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  // ── Internal state ─────────────────────────────────────────────────

  @state() private _isOpen = false;
  @state() private _viewYear: number = new Date().getFullYear();
  @state() private _viewMonth: number = new Date().getMonth();
  @state() private _rangeStart: Date | null = null;
  @state() private _hoverDate: Date | null = null;
  @state() private _focusedIndex: number | null = null;
  @state() private _liveText = '';

  @query('.day-grid') private _dayGrid!: HTMLElement;

  // ── Lifecycle ──────────────────────────────────────────────────────

  private _boundClickOutside = this._handleClickOutside.bind(this);

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this._boundClickOutside);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._boundClickOutside);
  }

  // ── Click outside (composedPath for Shadow DOM) ────────────────────

  private _handleClickOutside(e: MouseEvent): void {
    if (!this._isOpen) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this._close();
    }
  }

  // ── Parsed values (derived from public properties) ─────────────────

  private get _parsedMin(): Date | null {
    return this.minDate ? parseISODateString(this.minDate) : null;
  }

  private get _parsedMax(): Date | null {
    return this.maxDate ? parseISODateString(this.maxDate) : null;
  }

  private get _singleDate(): Date | null {
    return this.mode === 'single' && this.value
      ? parseISODateString(this.value)
      : null;
  }

  private get _rangeStartVal(): Date | null {
    return this.mode === 'range' && this.startDate
      ? parseISODateString(this.startDate)
      : null;
  }

  private get _rangeEndVal(): Date | null {
    return this.mode === 'range' && this.endDate
      ? parseISODateString(this.endDate)
      : null;
  }

  private get _grid(): CalendarCell[] {
    return buildCalendarGrid(this._viewYear, this._viewMonth);
  }

  // ── Display text ───────────────────────────────────────────────────

  private get _displayText(): string {
    if (this.mode === 'single') {
      const d = this._singleDate;
      return d ? formatDate(d) : '';
    }
    const start = this._rangeStartVal;
    const end = this._rangeEndVal;
    if (start && end) return `${formatDate(start)} \u2013 ${formatDate(end)}`;
    if (start) return `${formatDate(start)} \u2013 ...`;
    return '';
  }

  private get _hasValue(): boolean {
    if (this.mode === 'single') return this.value !== '';
    return this.startDate !== '' || this.endDate !== '';
  }

  // ── Open / close ───────────────────────────────────────────────────

  private _open(): void {
    if (this.disabled) return;

    // Set view to selected date or today
    const target = this._singleDate ?? this._rangeStartVal ?? new Date();
    this._viewYear = target.getFullYear();
    this._viewMonth = target.getMonth();
    this._isOpen = true;
    this._rangeStart = null;
    this._hoverDate = null;

    this._announceLive(`${MONTH_NAMES[this._viewMonth]} ${this._viewYear}`);

    // Focus selected day or today after render
    this.updateComplete.then(() => {
      const grid = this._grid;
      const focusTarget = this._singleDate ?? this._rangeStartVal ?? new Date();
      const idx = grid.findIndex(
        (c) =>
          c.isCurrentMonth &&
          c.year === focusTarget.getFullYear() &&
          c.month === focusTarget.getMonth() &&
          c.day === focusTarget.getDate(),
      );
      this._focusedIndex = idx >= 0 ? idx : grid.findIndex((c) => c.isCurrentMonth);
      this._focusCellByIndex(this._focusedIndex!);
    });
  }

  private _close(): void {
    this._isOpen = false;
    this._rangeStart = null;
    this._hoverDate = null;
    this._focusedIndex = null;
  }

  private _toggle(): void {
    if (this._isOpen) this._close();
    else this._open();
  }

  // ── Navigation ─────────────────────────────────────────────────────

  private _prevMonth(): void {
    if (this._viewMonth === 0) {
      this._viewMonth = 11;
      this._viewYear--;
    } else {
      this._viewMonth--;
    }
    this._announceLive(`${MONTH_NAMES[this._viewMonth]} ${this._viewYear}`);
  }

  private _nextMonth(): void {
    if (this._viewMonth === 11) {
      this._viewMonth = 0;
      this._viewYear++;
    } else {
      this._viewMonth++;
    }
    this._announceLive(`${MONTH_NAMES[this._viewMonth]} ${this._viewYear}`);
  }

  private _goToToday(): void {
    const today = new Date();
    this._viewYear = today.getFullYear();
    this._viewMonth = today.getMonth();
    this._announceLive(`${MONTH_NAMES[this._viewMonth]} ${this._viewYear}`);

    if (this.mode === 'single' && !isDateDisabled(today, this._parsedMin, this._parsedMax)) {
      this._selectDate(today);
    }
  }

  // ── Selection ──────────────────────────────────────────────────────

  private _selectDate(date: Date): void {
    if (isDateDisabled(date, this._parsedMin, this._parsedMax)) return;

    if (this.mode === 'single') {
      this.dispatchEvent(
        new CustomEvent('ca-change', {
          detail: { value: toISODateString(date) },
          bubbles: true,
          composed: true,
        }),
      );
      this._close();
      return;
    }

    // Range mode
    if (!this._rangeStart) {
      this._rangeStart = date;
      return;
    }

    // Second click completes the range
    const [s, e] =
      this._rangeStart.getTime() <= date.getTime()
        ? [this._rangeStart, date]
        : [date, this._rangeStart];

    this.dispatchEvent(
      new CustomEvent('ca-change', {
        detail: {
          startDate: toISODateString(s),
          endDate: toISODateString(e),
        },
        bubbles: true,
        composed: true,
      }),
    );
    this._rangeStart = null;
    this._hoverDate = null;
    this._close();
  }

  // ── Day cell state computation ─────────────────────────────────────

  private _getDayClasses(cell: CalendarCell, index: number) {
    const cellDate = cellToDate(cell);
    const today = new Date();
    const isToday = isSameDay(cellDate, today);
    const isOutside = !cell.isCurrentMonth;
    const isDayDisabled = isDateDisabled(cellDate, this._parsedMin, this._parsedMax);

    let isSelected = false;
    let inRange = false;
    let isRangeStart = false;
    let isRangeEnd = false;

    if (this.mode === 'single') {
      const sel = this._singleDate;
      if (sel && isSameDay(cellDate, sel)) {
        isSelected = true;
      }
    } else if (this.mode === 'range') {
      // In-progress range selection takes precedence
      if (this._rangeStart) {
        const previewEnd = this._hoverDate ?? this._rangeStart;
        const [sortedStart, sortedEnd] =
          this._rangeStart.getTime() <= previewEnd.getTime()
            ? [this._rangeStart, previewEnd]
            : [previewEnd, this._rangeStart];

        isRangeStart = isSameDay(cellDate, sortedStart);
        isRangeEnd = isSameDay(cellDate, sortedEnd);
        isSelected = isSameDay(cellDate, this._rangeStart) || isSameDay(cellDate, previewEnd);
        inRange =
          isInRange(cellDate, sortedStart, sortedEnd) &&
          !isSameDay(cellDate, sortedStart) &&
          !isSameDay(cellDate, sortedEnd);
      } else if (this._rangeStartVal && this._rangeEndVal) {
        // Completed range from property values
        isRangeStart = isSameDay(cellDate, this._rangeStartVal);
        isRangeEnd = isSameDay(cellDate, this._rangeEndVal);
        isSelected = isRangeStart || isRangeEnd;
        inRange =
          isInRange(cellDate, this._rangeStartVal, this._rangeEndVal) &&
          !isRangeStart &&
          !isRangeEnd;
      }
    }

    return {
      'day-cell': true,
      outside: isOutside,
      today: isToday,
      selected: isSelected,
      'in-range': inRange,
      'range-start': isRangeStart,
      'range-end': isRangeEnd,
      'day-disabled': isDayDisabled,
    };
  }

  // ── Keyboard: trigger ──────────────────────────────────────────────

  private _handleFieldKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._toggle();
    } else if (e.key === 'Escape' && this._isOpen) {
      e.preventDefault();
      this._close();
    }
  }

  // ── Keyboard: grid ─────────────────────────────────────────────────

  private _handleGridKeydown(e: KeyboardEvent): void {
    const grid = this._grid;
    let idx = this._focusedIndex;

    // If nothing focused yet, find today or first current-month day
    if (idx === null) {
      const today = new Date();
      idx = grid.findIndex(
        (c) =>
          c.isCurrentMonth &&
          c.year === today.getFullYear() &&
          c.month === today.getMonth() &&
          c.day === today.getDate(),
      );
      if (idx === -1) idx = grid.findIndex((c) => c.isCurrentMonth);
    }

    let newIdx = idx;
    let handled = true;

    switch (e.key) {
      case 'ArrowLeft':
        newIdx = idx - 1;
        break;
      case 'ArrowRight':
        newIdx = idx + 1;
        break;
      case 'ArrowUp':
        newIdx = idx - 7;
        break;
      case 'ArrowDown':
        newIdx = idx + 7;
        break;
      case 'Home': {
        // First day of current month in the grid
        newIdx = grid.findIndex((c) => c.isCurrentMonth);
        break;
      }
      case 'End': {
        // Last day of current month in the grid
        for (let i = grid.length - 1; i >= 0; i--) {
          if (grid[i].isCurrentMonth) { newIdx = i; break; }
        }
        break;
      }
      case 'PageUp':
        e.preventDefault();
        if (e.shiftKey) {
          this._viewYear--;
        } else {
          this._prevMonth();
        }
        this.updateComplete.then(() => {
          const clampedIdx = Math.min(idx!, this._grid.length - 1);
          this._focusedIndex = clampedIdx;
          this._focusCellByIndex(clampedIdx);
        });
        return;
      case 'PageDown':
        e.preventDefault();
        if (e.shiftKey) {
          this._viewYear++;
        } else {
          this._nextMonth();
        }
        this.updateComplete.then(() => {
          const clampedIdx = Math.min(idx!, this._grid.length - 1);
          this._focusedIndex = clampedIdx;
          this._focusCellByIndex(clampedIdx);
        });
        return;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (idx >= 0 && idx < grid.length) {
          this._selectDate(cellToDate(grid[idx]));
        }
        return;
      case 'Escape':
        e.preventDefault();
        this._close();
        // Return focus to the trigger
        this.updateComplete.then(() => {
          this.shadowRoot?.querySelector<HTMLElement>('[role="combobox"]')?.focus();
        });
        return;
      default:
        handled = false;
    }

    if (handled) {
      e.preventDefault();

      // Handle boundary crossings -- switch months
      if (newIdx < 0) {
        this._prevMonth();
        this.updateComplete.then(() => {
          const targetIdx = Math.max(0, Math.min(newIdx + 42, this._grid.length - 1));
          this._focusedIndex = targetIdx;
          this._focusCellByIndex(targetIdx);
        });
        return;
      }
      if (newIdx >= 42) {
        this._nextMonth();
        this.updateComplete.then(() => {
          const targetIdx = Math.min(newIdx - 42, this._grid.length - 1);
          this._focusedIndex = targetIdx;
          this._focusCellByIndex(targetIdx);
        });
        return;
      }

      this._focusedIndex = newIdx;
      this._focusCellByIndex(newIdx);
    }
  }

  // ── Focus helpers ──────────────────────────────────────────────────

  private _focusCellByIndex(index: number): void {
    this.updateComplete.then(() => {
      const grid = this.shadowRoot?.querySelector('.day-grid');
      if (!grid) return;
      const cells = grid.querySelectorAll<HTMLButtonElement>('.day-cell');
      cells[index]?.focus();
    });
  }

  private _announceLive(text: string): void {
    this._liveText = text;
  }

  // ── Rendering ──────────────────────────────────────────────────────

  render() {
    const text = this._displayText;
    const grid = this._grid;

    return html`
      ${this.label ? html`<label class="label">${this.label}</label>` : nothing}

      <!-- Trigger field -->
      <div
        class=${classMap({ field: true, disabled: this.disabled })}
        part="field"
        tabindex=${this.disabled ? -1 : 0}
        role="combobox"
        aria-expanded=${this._isOpen}
        aria-haspopup="dialog"
        aria-label=${this.label || this.placeholder}
        @click=${this._toggle}
        @keydown=${this._handleFieldKeydown}
      >
        <span class="calendar-icon">${calendarIconSvg}</span>
        <span class=${classMap({ 'value-text': true, placeholder: !text })}>
          ${text || this.placeholder}
        </span>
        <span class=${classMap({ chevron: true, open: this._isOpen })}>
          ${chevronDownSvg}
        </span>
      </div>

      ${this.error ? html`<div class="error-text" role="alert">${this.error}</div>` : nothing}

      <!-- Calendar dropdown -->
      ${this._isOpen
        ? html`
            <div
              class="dropdown"
              part="dropdown"
              role="dialog"
              aria-label=${this.mode === 'range' ? 'Choose date range' : 'Choose date'}
            >
              <!-- Header -->
              <div class="calendar-header">
                <button
                  type="button"
                  class="nav-button"
                  aria-label="Previous month"
                  @click=${(e: Event) => { e.stopPropagation(); this._prevMonth(); }}
                >
                  ${chevronLeftSvg}
                </button>
                <span class="month-year">
                  ${MONTH_NAMES[this._viewMonth]} ${this._viewYear}
                </span>
                <button
                  type="button"
                  class="nav-button"
                  aria-label="Next month"
                  @click=${(e: Event) => { e.stopPropagation(); this._nextMonth(); }}
                >
                  ${chevronRightSvg}
                </button>
              </div>

              <!-- Weekday labels -->
              <div class="weekday-row" role="row">
                ${WEEKDAY_LABELS.map(
                  (day) => html`<span class="weekday" role="columnheader">${day}</span>`,
                )}
              </div>

              <!-- Day grid -->
              <div
                class="day-grid"
                role="grid"
                aria-label="${MONTH_NAMES[this._viewMonth]} ${this._viewYear}"
                @keydown=${this._handleGridKeydown}
              >
                ${grid.map((cell, i) => {
                  const cellDate = cellToDate(cell);
                  const isDayDisabled = isDateDisabled(cellDate, this._parsedMin, this._parsedMax);
                  const classes = this._getDayClasses(cell, i);

                  return html`
                    <button
                      type="button"
                      data-cell=${i}
                      class=${classMap(classes)}
                      tabindex=${this._focusedIndex === i ? 0 : -1}
                      role="gridcell"
                      aria-label=${formatDate(cellDate)}
                      aria-selected=${classes.selected ? 'true' : 'false'}
                      aria-disabled=${isDayDisabled ? 'true' : nothing}
                      @click=${(e: Event) => {
                        e.stopPropagation();
                        if (!isDayDisabled) {
                          this._focusedIndex = i;
                          this._selectDate(cellDate);
                        }
                      }}
                      @mouseenter=${() => {
                        if (!isDayDisabled && this.mode === 'range' && this._rangeStart) {
                          this._hoverDate = cellDate;
                        }
                      }}
                      @focus=${() => { this._focusedIndex = i; }}
                    >
                      ${cell.day}
                    </button>
                  `;
                })}
              </div>

              <!-- Footer -->
              <div class="calendar-footer">
                <button
                  type="button"
                  class="today-button"
                  @click=${(e: Event) => { e.stopPropagation(); this._goToToday(); }}
                >
                  Today
                </button>
              </div>
            </div>
          `
        : nothing}

      <!-- Screen reader live region -->
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        ${this._liveText}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-datepicker': CaDatepicker;
  }
}
