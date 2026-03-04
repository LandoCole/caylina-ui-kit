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
import './lit/chart.js';
import './lit/gantt-chart.js';

// Stateful / Complex
import './lit/accordion.js';
import './lit/avatar.js';
import './lit/avatar-group.js';
import './lit/datepicker.js';
import './lit/modal.js';
import './lit/drawer.js';
import './lit/select.js';
import './lit/multi-select.js';
import './lit/sidenav.js';
import './lit/split-button.js';
import './lit/textarea.js';
import './lit/toast.js';
import './lit/tooltip.js';

// PM Selectors
import './lit/status-selector.js';
import './lit/priority-selector.js';
import './lit/phase-selector.js';
import './lit/assignee-selector.js';
import './lit/label-selector.js';
import './lit/color-picker.js';
import './lit/estimation-input.js';

// Task Table
import './lit/task-table.js';

// Kanban
import './lit/kanban-card.js';
import './lit/kanban-board.js';

// Rich Content
import './lit/rich-text-editor.js';
import './lit/comment-thread.js';
import './lit/activity-timeline.js';
import './lit/time-log.js';

// Navigation & Feedback
import './lit/breadcrumb.js';
import './lit/empty-state.js';
import './lit/skeleton.js';
import './lit/context-menu.js';
import './lit/bulk-action-bar.js';
import './lit/command-bar.js';
import './lit/notification-center.js';

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
  TableGroup,
} from './lit/table.js';

// Re-export chart types
export type { ChartData, ChartDataset } from './lit/chart.js';
export type { GanttTask } from './lit/gantt-chart.js';

// Re-export task table types
export type { TaskTableColumn, TaskTableRow, TaskTableGroup } from './lit/task-table.js';

// Re-export kanban types
export type { KanbanColumnData, KanbanCardData } from './lit/kanban-board.js';
export type { KanbanCardLabel, KanbanCardAssignee } from './lit/kanban-card.js';

// Re-export PM selector types
export type { ColorPillOption } from './lit/utils/color-pill-base.js';
export type { AssigneeMember } from './lit/assignee-selector.js';
export type { LabelOption } from './lit/label-selector.js';
export type { AvatarGroupMember } from './lit/avatar-group.js';

// Re-export activity/comment types
export type { ActivityTimelineEntry } from './lit/activity-timeline.js';
export type { Comment, CommentUser } from './lit/comment-thread.js';
export type { TimeLogEntry } from './lit/time-log.js';

// Re-export command/notification types
export type { CommandBarItem } from './lit/command-bar.js';
export type { NotificationItem } from './lit/notification-center.js';

// Re-export context menu types
export type { ContextMenuItem } from './lit/context-menu.js';

// Re-export bulk action types
export type { BulkAction } from './lit/bulk-action-bar.js';

// Re-export breadcrumb types
export type { BreadcrumbItem } from './lit/breadcrumb.js';

// Re-export progress bar types
export type { ProgressSegment } from './lit/progress-bar.js';
