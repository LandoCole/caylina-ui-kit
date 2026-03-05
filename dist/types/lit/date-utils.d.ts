export declare const MONTH_NAMES: readonly ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export declare const MONTH_NAMES_SHORT: readonly ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export declare const WEEKDAY_LABELS: readonly ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
export interface CalendarCell {
    year: number;
    month: number;
    day: number;
    isCurrentMonth: boolean;
}
export declare function getDaysInMonth(year: number, month: number): number;
export declare function getFirstDayOfWeek(year: number, month: number): number;
export declare function buildCalendarGrid(year: number, month: number): CalendarCell[];
export declare function formatDate(date: Date): string;
export declare function toISODateString(date: Date): string;
export declare function parseISODateString(str: string): Date | null;
export declare function isSameDay(a: Date, b: Date): boolean;
export declare function isInRange(date: Date, start: Date, end: Date): boolean;
export declare function isDateDisabled(date: Date, min?: Date | null, max?: Date | null): boolean;
