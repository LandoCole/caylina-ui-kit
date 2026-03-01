// Caylina UI Kit — Lit Web Components (self-registering custom elements)

// Tokens are consumed via CSS variables on :root — imported in the HTML entry point
// or via adoptedStyleSheets at the application level.

// Form Controls
import './lit/button.js';
import './lit/input.js';
import './lit/checkbox.js';
import './lit/radio-button.js';
import './lit/toggle.js';

// Presentational
import './lit/badge.js';
import './lit/chip.js';
import './lit/map-chip.js';
import './lit/card.js';
import './lit/card-button.js';
import './lit/callout.js';
import './lit/link.js';

// Layout & Indicators
import './lit/spinner.js';
import './lit/divider.js';
import './lit/underline-tabs.js';
import './lit/pill-tabs.js';
import './lit/menu.js';
import './lit/progress-bar.js';

// Data Display
import './lit/table.js';

// Stateful / Complex
import './lit/accordion.js';
import './lit/avatar.js';
import './lit/datepicker.js';
import './lit/modal.js';
import './lit/select.js';
import './lit/sidenav.js';
import './lit/split-button.js';
import './lit/textarea.js';
import './lit/toast.js';
import './lit/tooltip.js';

// Re-export programmatic APIs
export { toast } from './lit/toast.js';

// Re-export date utilities
export {
  MONTH_NAMES,
  MONTH_NAMES_SHORT,
  WEEKDAY_LABELS,
  buildCalendarGrid,
  formatDate,
  toISODateString,
  parseISODateString,
  isSameDay,
  isInRange,
  isDateDisabled,
} from './lit/date-utils.js';
export type { CalendarCell } from './lit/date-utils.js';

// Re-export table types
export type {
  TableColumn,
  TableRow,
  TableFilterTab,
  TableAction,
  TablePagination,
  TableSort,
} from './lit/table.js';
