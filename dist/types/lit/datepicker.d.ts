import { LitElement } from 'lit';
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
export declare class CaDatepicker extends LitElement {
    static styles: import("lit").CSSResult;
    /** Selection mode. */
    mode: 'single' | 'range';
    /** Size variant. */
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /** Selected date as ISO "YYYY-MM-DD" (single mode). */
    value: string;
    /** Range start date as ISO "YYYY-MM-DD" (range mode). */
    startDate: string;
    /** Range end date as ISO "YYYY-MM-DD" (range mode). */
    endDate: string;
    /** Label text displayed above the trigger field. */
    label: string;
    /** Error message displayed below the trigger field. */
    error: string;
    /** Placeholder text when no date is selected. */
    placeholder: string;
    /** Minimum selectable date (ISO "YYYY-MM-DD"). */
    minDate: string;
    /** Maximum selectable date (ISO "YYYY-MM-DD"). */
    maxDate: string;
    /** Disabled state. */
    disabled: boolean;
    /** Borderless style for inline/table use. */
    borderless: boolean;
    /** Show overdue visual styling when date is past. */
    overdue: boolean;
    private _isOpen;
    private _viewYear;
    private _viewMonth;
    private _rangeStart;
    private _hoverDate;
    private _focusedIndex;
    private _liveText;
    private _dayGrid;
    private _boundClickOutside;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleClickOutside;
    private get _parsedMin();
    private get _parsedMax();
    private get _singleDate();
    private get _rangeStartVal();
    private get _rangeEndVal();
    private get _grid();
    private get _displayText();
    private get _hasValue();
    private _open;
    private _close;
    private _toggle;
    private _prevMonth;
    private _nextMonth;
    private _goToToday;
    private _selectDate;
    private _getDayClasses;
    private _handleFieldKeydown;
    private _handleGridKeydown;
    private _focusCellByIndex;
    private _announceLive;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-datepicker': CaDatepicker;
    }
}
