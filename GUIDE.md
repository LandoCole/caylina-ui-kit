# Caylina UI Kit — Implementation Guide

A comprehensive guide to using and customizing every component in the Caylina UI Kit. Built with [Lit 3](https://lit.dev) web components — framework-agnostic, CDN-ready, and fully themeable.

---

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Theming & Dark Mode](#theming--dark-mode)
3. [Design Tokens](#design-tokens)
4. [Components](#components)
   - [Button](#button)
   - [Input](#input)
   - [Checkbox](#checkbox)
   - [Radio Button](#radio-button)
   - [Toggle](#toggle)
   - [Select](#select)
   - [Textarea](#textarea)
   - [Date Picker](#date-picker)
   - [Badge](#badge)
   - [Chip](#chip)
   - [Map Chip](#map-chip)
   - [Card](#card)
   - [Card Button](#card-button)
   - [Callout](#callout)
   - [Link](#link)
   - [Avatar](#avatar)
   - [Spinner](#spinner)
   - [Divider](#divider)
   - [Progress Bar](#progress-bar)
   - [Underline Tabs](#underline-tabs)
   - [Pill Tabs](#pill-tabs)
   - [Menu](#menu)
   - [Accordion](#accordion)
   - [Tooltip](#tooltip)
   - [Modal](#modal)
   - [Drawer](#drawer)
   - [Split Button](#split-button)
   - [Side Nav](#side-nav)
   - [Toast](#toast)
   - [Table](#table)
   - [Multi Select](#multi-select)
5. [PM Selectors](#pm-selectors)
   - [Status Selector](#status-selector)
   - [Priority Selector](#priority-selector)
   - [Phase Selector](#phase-selector)
   - [Assignee Selector](#assignee-selector)
   - [Label Selector](#label-selector)
   - [Avatar Group](#avatar-group)
   - [Color Picker](#color-picker)
   - [Estimation Input](#estimation-input)
6. [Kanban](#kanban)
   - [Kanban Board](#kanban-board)
   - [Kanban Card](#kanban-card)
7. [Data Visualization](#data-visualization)
   - [Chart](#chart)
   - [Gantt Chart](#gantt-chart)
8. [Rich Content](#rich-content)
   - [Rich Text Editor](#rich-text-editor)
   - [Comment Thread](#comment-thread)
   - [Activity Timeline](#activity-timeline)
   - [Time Log](#time-log)
9. [Navigation & Feedback](#navigation--feedback)
   - [Breadcrumb](#breadcrumb)
   - [Empty State](#empty-state)
   - [Skeleton](#skeleton)
   - [Context Menu](#context-menu)
   - [Bulk Action Bar](#bulk-action-bar)
   - [Command Bar](#command-bar)
   - [Notification Center](#notification-center)
10. [Table Deep Dive](#table-deep-dive)
   - [Sorting](#feature-sorting)
   - [Selection](#feature-selection)
   - [Drag-to-Reorder](#feature-drag-to-reorder)
   - [Row Actions](#feature-row-actions)
   - [Search & Filters](#feature-search--filters)
   - [Pagination](#feature-pagination)
   - [Row Height](#feature-row-height)
   - [Column Width](#feature-column-width)
   - [Column Resizing](#feature-column-resizing)
   - [Per-Column Filtering](#feature-per-column-filtering)
   - [Expandable Rows](#feature-expandable-rows-nested-data)
   - [Header Actions Slot](#feature-header-actions-slot)
   - [Editable Cells](#feature-editable-cells-inline-editing)
11. [Customization Patterns](#customization-patterns)

---

## Installation & Setup

### CDN (no build step)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="https://unpkg.com/@caylina/ui-kit/tokens.css">
  <script type="module" src="https://unpkg.com/@caylina/ui-kit/caylina-ui.js"></script>
</head>
<body>
  <ca-button variant="primary">Hello Caylina</ca-button>
</body>
</html>
```

### npm

```bash
npm install @caylina/ui-kit
```

```js
// Import all components (self-registering)
import '@caylina/ui-kit';

// Import programmatic APIs
import { toast } from '@caylina/ui-kit';
```

Import the tokens CSS in your HTML or bundler entry:

```html
<link rel="stylesheet" href="node_modules/@caylina/ui-kit/dist/tokens.css">
```

Or in your CSS/bundler:

```css
@import '@caylina/ui-kit/tokens.css';
```

---

## Theming & Dark Mode

All components automatically respond to the design token CSS variables on `:root`. Dark mode is activated by setting `data-theme="dark"` on the `<html>` element.

### Toggle dark mode

```js
// Enable dark mode
document.documentElement.setAttribute('data-theme', 'dark');

// Disable dark mode
document.documentElement.removeAttribute('data-theme');

// Toggle
const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
document.documentElement.setAttribute('data-theme', isDark ? '' : 'dark');
```

### Respect system preference

```js
const mq = window.matchMedia('(prefers-color-scheme: dark)');
document.documentElement.setAttribute('data-theme', mq.matches ? 'dark' : '');
mq.addEventListener('change', (e) => {
  document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : '');
});
```

### Theme toggle button example

```html
<ca-button variant="secondary" size="sm" id="theme-btn">Toggle Dark Mode</ca-button>
<script>
  document.getElementById('theme-btn').addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    isDark ? html.removeAttribute('data-theme') : html.setAttribute('data-theme', 'dark');
  });
</script>
```

---

## Design Tokens

The library ships a token system as CSS custom properties. Override any token on `:root` or scoped selectors to customize the look globally.

### Color tokens

| Token | Light Default | Dark Default | Purpose |
|-------|--------------|--------------|---------|
| `--ca-color-primary` | `#728EC7` | `#728EC7` | Primary brand color (buttons, accents) |
| `--ca-color-primary-pressed` | `#657EAB` | `#657EAB` | Primary pressed/active state |
| `--ca-color-secondary` | `#222222` | `rgba(255,255,255,0.85)` | Secondary brand color |
| `--ca-color-link` | `#004CC4` | `#7EB3FF` | Link text color |
| `--ca-color-danger` | `#C13515` | `#CC8889` | Error/danger state |
| `--ca-color-success` | `#15803D` | `#22C55E` | Success state |
| `--ca-color-warning` | `#CA8A04` | `#EAB308` | Warning state |

### Surface tokens

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| `--ca-surface` | `#FFFFFF` | `#161A23` | Page/card backgrounds |
| `--ca-surface-hover` | `#F7F7F7` | `#2D2F39` | Hover backgrounds |
| `--ca-surface-active` | `#F6F6F6` | `#2D2F39` | Active/pressed backgrounds |
| `--ca-surface-elevated` | `#FFFFFF` | `#1E222D` | Modals, drawers, elevated panels |

### Text tokens

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| `--ca-text-primary` | `#222222` | `rgba(255,255,255,0.8)` | Headings, labels, body text |
| `--ca-text-secondary` | `#757575` | `rgba(255,255,255,0.5)` | Supporting text |
| `--ca-text-muted` | `#717171` | `rgba(255,255,255,0.5)` | Placeholder, disabled text |

### Typography tokens

| Token | Default | Purpose |
|-------|---------|---------|
| `--ca-font-family` | `"Inter", -apple-system, ...` | Global font stack |
| `--ca-font-weight-semibold` | `590` | Semibold weight |
| `--ca-font-size-xs` | `11px` | Extra small text |
| `--ca-font-size-sm` | `13px` | Small text |
| `--ca-font-size-md` | `14px` | Medium/body text |
| `--ca-font-size-lg` | `16px` | Large text |

### Spacing tokens

| Token | Value |
|-------|-------|
| `--ca-space-xs` | `4px` |
| `--ca-space-sm` | `8px` |
| `--ca-space-md` | `16px` |
| `--ca-space-lg` | `24px` |
| `--ca-space-xl` | `32px` |

### Border radius tokens

| Token | Value |
|-------|-------|
| `--ca-radius-sm` | `4px` |
| `--ca-radius-md` | `8px` |
| `--ca-radius-lg` | `12px` |
| `--ca-radius-xl` | `16px` |
| `--ca-radius-full` | `9999px` |

### Customizing tokens

Override tokens globally:

```css
:root {
  --ca-color-primary: #E63946;
  --ca-color-primary-pressed: #C1272D;
  --ca-radius-button: 20px;
  --ca-font-family: 'Inter', sans-serif;
}
```

Or scope overrides to a container:

```css
.my-section {
  --ca-color-primary: #2D6A4F;
  --ca-surface: #F0F4F0;
}
```

---

## Components

### Button

`<ca-button>` — Primary, secondary, and tertiary variants with multiple sizes.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disable interaction |
| `loading` | `boolean` | `false` | Show loading spinner |

**Slots:** default (label text), `icon` (before label, hidden during loading)

```html
<!-- Variants -->
<ca-button variant="primary">Primary</ca-button>
<ca-button variant="secondary">Secondary</ca-button>
<ca-button variant="tertiary">Tertiary</ca-button>

<!-- Sizes -->
<ca-button size="xs">Extra Small</ca-button>
<ca-button size="sm">Small</ca-button>
<ca-button size="md">Medium</ca-button>
<ca-button size="lg">Large</ca-button>
<ca-button size="xl">Extra Large</ca-button>

<!-- States -->
<ca-button disabled>Disabled</ca-button>
<ca-button loading>Loading</ca-button>

<!-- With icon -->
<ca-button variant="primary">
  <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 5v14M5 12h14"/>
  </svg>
  Add Item
</ca-button>
```

---

### Input

`<ca-input>` — Text input with label, error state, loading indicator, and icon slots.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `string` | `'text'` | HTML input type |
| `value` | `string` | `''` | Current value |
| `label` | `string` | `''` | Label text above input |
| `error` | `string` | `''` | Error message (shown in red below input) |
| `placeholder` | `string` | `''` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable interaction |
| `loading` | `boolean` | `false` | Show loading spinner |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Input size |
| `borderless` | `boolean` | `false` | Remove border and background (ideal for inline/table editing) |

**Events:** `ca-input` (every keystroke), `ca-change` (on blur/commit)
**Slots:** `icon` (before input), `icon-after` (after input)

```html
<ca-input label="Email" type="email" placeholder="you@example.com"></ca-input>
<ca-input label="Name" error="This field is required"></ca-input>
<ca-input label="Searching" loading placeholder="Loading..."></ca-input>
<ca-input label="Small" size="sm"></ca-input>
<ca-input label="Large" size="lg"></ca-input>
```

Listening for changes:

```html
<ca-input label="Search" id="search-input"></ca-input>
<script>
  document.getElementById('search-input').addEventListener('ca-input', (e) => {
    console.log('Typing:', e.detail.value);
  });
  document.getElementById('search-input').addEventListener('ca-change', (e) => {
    console.log('Committed:', e.detail.value);
  });
</script>
```

---

### Checkbox

`<ca-checkbox>` — Checkbox with label, subtext, and five size options.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | `boolean` | `false` | Checked state |
| `disabled` | `boolean` | `false` | Disable interaction |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Checkbox size |
| `label` | `string` | `''` | Label text |
| `subtext` | `string` | `''` | Helper text below label |

**Events:** `ca-change` — `{ checked: boolean }`

```html
<ca-checkbox checked label="Remember me"></ca-checkbox>
<ca-checkbox label="With helper text" subtext="Check this for updates" size="lg"></ca-checkbox>
<ca-checkbox disabled label="Disabled"></ca-checkbox>

<!-- All sizes -->
<ca-checkbox size="xs" label="XS"></ca-checkbox>
<ca-checkbox size="sm" label="SM"></ca-checkbox>
<ca-checkbox size="md" label="MD"></ca-checkbox>
<ca-checkbox size="lg" label="LG"></ca-checkbox>
<ca-checkbox size="xl" label="XL"></ca-checkbox>
```

---

### Radio Button

`<ca-radio>` — Radio button with label and subtext. Group radios by matching `name`.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | `boolean` | `false` | Selected state |
| `disabled` | `boolean` | `false` | Disable interaction |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Radio size |
| `name` | `string` | `''` | Group name |
| `value` | `string` | `''` | Radio value |
| `label` | `string` | `''` | Label text |
| `subtext` | `string` | `''` | Description text |

**Events:** `ca-change` — `{ value, name }`

```html
<ca-radio name="plan" value="free" label="Free" checked></ca-radio>
<ca-radio name="plan" value="pro" label="Pro"></ca-radio>
<ca-radio name="plan" value="enterprise" label="Enterprise" subtext="Custom pricing"></ca-radio>

<script>
  // Radio group behavior — uncheck siblings
  document.querySelectorAll('ca-radio[name="plan"]').forEach((radio) => {
    radio.addEventListener('ca-change', (e) => {
      document.querySelectorAll('ca-radio[name="plan"]').forEach((r) => {
        if (r !== e.target) r.checked = false;
      });
    });
  });
</script>
```

---

### Toggle

`<ca-toggle>` — On/off switch with label and optional subtext.

| Property | Type | Default |
|----------|------|---------|
| `checked` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `size` | `'sm' \| 'md'` | `'md'` |
| `label` | `string` | `''` |
| `subtext` | `string` | `''` |

**Events:** `ca-change` — `{ checked: boolean }`

```html
<ca-toggle checked label="Notifications"></ca-toggle>
<ca-toggle label="Marketing emails" subtext="Receive promotional content"></ca-toggle>
<ca-toggle size="sm" label="Small toggle"></ca-toggle>
<ca-toggle disabled label="Disabled"></ca-toggle>
```

---

### Select

`<ca-select>` — Dropdown select with search-style UI.

| Property | Type | Default |
|----------|------|---------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `label` | `string` | `''` |
| `placeholder` | `string` | `'Placeholder text'` |
| `options` | `{ value, label }[]` | `[]` |
| `value` | `string` | `''` |
| `loading` | `boolean` | `false` |
| `borderless` | `boolean` | `false` |
| `searchable` | `boolean` | `false` | Enable type-to-search filtering within options |
| `allow-create` | `boolean` | `false` | Allow creating new options by typing a custom value |

**Events:** `ca-change` — `{ value: string }`, `ca-create` — `{ query: string }` (when user creates a new option)

```html
<ca-select label="Country" placeholder="Select country" id="country-select"></ca-select>
<script>
  const sel = document.getElementById('country-select');
  sel.options = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
  ];
  sel.addEventListener('ca-change', (e) => console.log('Selected:', e.detail.value));
</script>

<!-- Searchable select -->
<ca-select label="Country" searchable placeholder="Type to search..."></ca-select>

<!-- Creatable select -->
<ca-select label="Tag" searchable allow-create placeholder="Search or create..."></ca-select>
```

---

### Textarea

`<ca-textarea>` — Multi-line input with optional character counter and auto-resize.

| Property | Type | Default |
|----------|------|---------|
| `label` | `string` | `''` |
| `error` | `string` | `''` |
| `maxlength` | `number \| undefined` | `undefined` |
| `autoresize` | `boolean` | `false` |
| `rows` | `number` | `3` |
| `disabled` | `boolean` | `false` |
| `value` | `string` | `''` |
| `placeholder` | `string` | `''` |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |

**Events:** `ca-input` — `{ value: string }`

```html
<ca-textarea label="Bio" placeholder="Tell us about yourself" maxlength="500"></ca-textarea>
<ca-textarea label="Notes" rows="6" autoresize></ca-textarea>
```

---

### Date Picker

`<ca-datepicker>` — Calendar picker supporting single date and date range modes.

| Property | Type | Default |
|----------|------|---------|
| `mode` | `'single' \| 'range'` | `'single'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `value` | `string` (ISO `YYYY-MM-DD`) | `''` |
| `start-date` | `string` | `''` |
| `end-date` | `string` | `''` |
| `label` | `string` | `''` |
| `error` | `string` | `''` |
| `placeholder` | `string` | `'Select date'` |
| `min-date` | `string` | `''` |
| `max-date` | `string` | `''` |
| `disabled` | `boolean` | `false` |
| `borderless` | `boolean` | `false` | Remove border and background (ideal for inline/table editing) |
| `overdue` | `boolean` | `false` | Show the date in red to indicate an overdue state |

**Events:** `ca-change` — single: `{ value }`, range: `{ startDate, endDate }`

```html
<!-- Single date -->
<ca-datepicker label="Start date" placeholder="Pick a date"></ca-datepicker>

<!-- Date range -->
<ca-datepicker label="Trip dates" mode="range" placeholder="Select range"></ca-datepicker>

<!-- Constrained range -->
<ca-datepicker label="Booking" min-date="2026-03-01" max-date="2026-12-31"></ca-datepicker>

<!-- Borderless (inline editing) -->
<ca-datepicker borderless placeholder="Due date"></ca-datepicker>

<!-- Overdue state -->
<ca-datepicker value="2026-02-01" overdue></ca-datepicker>
```

---

### Badge

`<ca-badge>` — Status indicator, counter, or dot badge.

| Property | Type | Default |
|----------|------|---------|
| `variant` | `'default' \| 'success' \| 'warning' \| 'danger'` | `'default'` |
| `size` | `'sm' \| 'md'` | `'md'` |
| `dot` | `boolean` | `false` |
| `color` | `string` | `''` | Custom background color (CSS color value). Overrides `variant`. |

```html
<ca-badge>3</ca-badge>
<ca-badge variant="success">Active</ca-badge>
<ca-badge variant="danger">5</ca-badge>
<ca-badge variant="warning">!</ca-badge>
<ca-badge size="md">12</ca-badge>
<ca-badge dot></ca-badge>
<ca-badge dot variant="success"></ca-badge>
<ca-badge dot variant="danger"></ca-badge>

<!-- Custom color -->
<ca-badge color="#6D28D9">Custom</ca-badge>
<ca-badge color="#0891B2" dot></ca-badge>
```

---

### Chip

`<ca-chip>` — Selectable pill-shaped tag.

| Property | Type | Default |
|----------|------|---------|
| `selected` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `size` | `'sm' \| 'md'` | `'md'` |

**Events:** `ca-change` — `{ selected: boolean }`

```html
<ca-chip>React</ca-chip>
<ca-chip selected>Vue</ca-chip>
<ca-chip size="md">Svelte</ca-chip>
<ca-chip disabled>Angular</ca-chip>
```

---

### Map Chip

`<ca-map-chip>` — Map marker chip with selected/viewed states and an icon-after slot.

| Property | Type | Default |
|----------|------|---------|
| `selected` | `boolean` | `false` |
| `viewed` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

**Events:** `ca-change` — `{ selected: boolean }`
**Slots:** default (label), `icon-after`

```html
<ca-map-chip>Coffee Shop</ca-map-chip>
<ca-map-chip selected>Selected</ca-map-chip>
<ca-map-chip viewed>Already Viewed</ca-map-chip>
<ca-map-chip>
  Favorited
  <svg slot="icon-after" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
</ca-map-chip>
```

---

### Card

`<ca-card>` — Container with configurable padding.

| Property | Type | Default |
|----------|------|---------|
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` |

```html
<ca-card>
  <h3>Default Card</h3>
  <p>Standard padding content.</p>
</ca-card>

<ca-card padding="sm">Compact card</ca-card>
<ca-card padding="lg">Spacious card</ca-card>
<ca-card padding="none">No padding card</ca-card>
```

---

### Card Button

`<ca-card-button>` — Selectable card with an icon and label.

| Property | Type | Default |
|----------|------|---------|
| `selected` | `boolean` | `false` |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `label` | `string` | `''` |

**Events:** `ca-change` — `{ selected: boolean }`
**Slots:** `icon` (default grid icon shown when empty)

```html
<ca-card-button label="Option A"></ca-card-button>
<ca-card-button label="Option B" selected></ca-card-button>
<ca-card-button label="Small" size="sm"></ca-card-button>
```

---

### Callout

`<ca-callout>` — Highlight or info banner.

| Property | Type | Default |
|----------|------|---------|
| `variant` | `'highlight' \| 'info'` | `'highlight'` |

**Slots:** default (body content), `icon`

```html
<ca-callout variant="highlight">Important: Review your settings before continuing.</ca-callout>
<ca-callout variant="info">Tip: You can drag rows to reorder them.</ca-callout>
```

---

### Link

`<ca-link>` — Styled anchor link in subtle or legal styles.

| Property | Type | Default |
|----------|------|---------|
| `href` | `string` | `''` |
| `target` | `string` | `''` |
| `type` | `'subtle' \| 'legal'` | `'subtle'` |
| `size` | `'md' \| 'sm'` | `'md'` |

**Slots:** default (label), `icon` (after text)

```html
<ca-link href="/about" type="subtle">About Us</ca-link>
<ca-link href="/terms" type="legal" size="sm">Terms of Service</ca-link>
<ca-link href="https://example.com" target="_blank">External Link</ca-link>
```

---

### Avatar

`<ca-avatar>` — User avatar with image or initials fallback.

| Property | Type | Default |
|----------|------|---------|
| `src` | `string` | `''` |
| `alt` | `string` | `''` |
| `name` | `string` | `''` |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `status` | `'online' \| 'offline' \| 'away' \| undefined` | `undefined` |
| `color` | `string` | `''` | Custom background color for initials fallback (CSS color value) |

```html
<!-- With image -->
<ca-avatar name="Jane Doe" src="https://i.pravatar.cc/80?img=1" size="lg"></ca-avatar>

<!-- Initials fallback -->
<ca-avatar name="John Smith" size="md"></ca-avatar>

<!-- With status indicator -->
<ca-avatar name="Alice" status="online"></ca-avatar>
<ca-avatar name="Bob" status="away"></ca-avatar>
<ca-avatar name="Carol" status="offline"></ca-avatar>

<!-- Custom color for initials -->
<ca-avatar name="John Smith" color="#6D28D9"></ca-avatar>
<ca-avatar name="Jane Doe" color="#0891B2"></ca-avatar>
```

---

### Spinner

`<ca-spinner>` — Loading indicator in dots or circular style.

| Property | Type | Default |
|----------|------|---------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `variant` | `'dots' \| 'circular'` | `'dots'` |

```html
<ca-spinner></ca-spinner>
<ca-spinner size="sm"></ca-spinner>
<ca-spinner size="lg"></ca-spinner>
<ca-spinner variant="circular"></ca-spinner>
<ca-spinner variant="circular" size="lg"></ca-spinner>
```

---

### Divider

`<ca-divider>` — Horizontal or vertical rule with configurable spacing.

| Property | Type | Default |
|----------|------|---------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `spacing` | `'sm' \| 'md' \| 'lg' \| ''` | `''` |

```html
<ca-divider></ca-divider>
<ca-divider spacing="md"></ca-divider>
<ca-divider spacing="lg"></ca-divider>

<!-- Vertical (inside a flex row) -->
<div style="display:flex; align-items:center; height:40px; gap:12px;">
  <span>Left</span>
  <ca-divider orientation="vertical"></ca-divider>
  <span>Right</span>
</div>
```

---

### Progress Bar

`<ca-progress-bar>` — Horizontal progress indicator with optional label.

| Property | Type | Default |
|----------|------|---------|
| `value` | `number` | `0` |
| `max` | `number` | `100` |
| `show-label` | `boolean` | `false` |
| `size` | `'sm' \| 'md'` | `'md'` |
| `labelSuffix` | `string` | `''` |
| `color` | `string` | `''` | Custom bar color (CSS color value). Overrides default primary color. |
| `segments` | `ProgressSegment[]` | `[]` | Stacked segments for multi-part progress. Each segment: `{ value: number, color: string, label?: string }`. |

```html
<ca-progress-bar value="75" max="100" show-label></ca-progress-bar>
<ca-progress-bar value="37" max="60" show-label label-suffix="times"></ca-progress-bar>
<ca-progress-bar value="50" max="100" size="md" show-label></ca-progress-bar>

<!-- Custom color -->
<ca-progress-bar value="60" max="100" color="#10B981"></ca-progress-bar>

<!-- Stacked segments -->
<ca-progress-bar id="stacked-progress" max="100" show-label></ca-progress-bar>
<script>
  document.getElementById('stacked-progress').segments = [
    { value: 40, color: '#10B981', label: 'Complete' },
    { value: 25, color: '#F59E0B', label: 'In Progress' },
    { value: 15, color: '#EF4444', label: 'Blocked' },
  ];
</script>
```

---

### Underline Tabs

`<ca-underline-tabs>` — Tab navigation with underline indicator and optional icons.

| Property | Type | Default |
|----------|------|---------|
| `tabs` | `{ id, label, icon? }[]` | `[]` |
| `active-id` | `string` | `''` |

**Events:** `ca-change` — `{ id: string }`

```html
<ca-underline-tabs active-id="overview" id="my-tabs"></ca-underline-tabs>
<script>
  const tabs = document.getElementById('my-tabs');
  tabs.tabs = [
    { id: 'overview', label: 'Overview', icon: '<svg viewBox="0 0 24 24" ...>...</svg>' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Settings' },
  ];
  tabs.addEventListener('ca-change', (e) => {
    tabs.activeId = e.detail.id;
    console.log('Active tab:', e.detail.id);
  });
</script>
```

---

### Pill Tabs

`<ca-pill-tabs>` — Pill-style tab navigation.

| Property | Type | Default |
|----------|------|---------|
| `tabs` | `{ id, label }[]` | `[]` |
| `active-id` | `string` | `''` |

**Events:** `ca-change` — `{ id: string }`

```html
<ca-pill-tabs active-id="day" id="period-tabs"></ca-pill-tabs>
<script>
  document.getElementById('period-tabs').tabs = [
    { id: 'day', label: 'Day' },
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
  ];
</script>
```

---

### Menu

`<ca-menu>` — Dropdown menu with sections. Items can be links (`href`) or buttons (`action`).

| Property | Type | Default |
|----------|------|---------|
| `sections` | `{ items: MenuItem[] }[]` | `[]` |

`MenuItem`: `{ label, href?, bold?, action? }`

**Events:** `ca-select` — `{ label, action }`

```html
<ca-menu id="user-menu"></ca-menu>
<script>
  document.getElementById('user-menu').sections = [
    {
      items: [
        { label: 'Profile', bold: true },
        { label: 'Settings' },
      ],
    },
    {
      items: [
        { label: 'Documentation', href: 'https://docs.example.com' },
        { label: 'Log Out', action: 'logout' },
      ],
    },
  ];
  document.getElementById('user-menu').addEventListener('ca-select', (e) => {
    if (e.detail.action === 'logout') {
      // handle logout
    }
  });
</script>
```

---

### Accordion

`<ca-accordion>` — Expandable content sections with smooth animation.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `{ id, title, content }[]` | `[]` | Accordion items |
| `multiple` | `boolean` | `false` | Allow multiple open sections |
| `openIds` | `string[] \| undefined` | `undefined` | Controlled open state |

**Events:** `ca-open-change` — `{ ids: string[] }`

```html
<ca-accordion id="faq" multiple></ca-accordion>
<script>
  document.getElementById('faq').items = [
    { id: '1', title: 'What is Caylina?', content: 'A UI component library built with Lit.' },
    { id: '2', title: 'How do I install it?', content: 'Via CDN or npm install @caylina/ui-kit.' },
    { id: '3', title: 'Is dark mode supported?', content: 'Yes! Set data-theme="dark" on the html element.' },
  ];
</script>
```

Controlled mode:

```html
<ca-accordion id="controlled-acc"></ca-accordion>
<script>
  const acc = document.getElementById('controlled-acc');
  acc.items = [
    { id: 'a', title: 'Section A', content: 'Content A' },
    { id: 'b', title: 'Section B', content: 'Content B' },
  ];
  acc.openIds = ['a']; // A starts open
  acc.addEventListener('ca-open-change', (e) => {
    acc.openIds = e.detail.ids;
  });
</script>
```

---

### Tooltip

`<ca-tooltip>` — Hover tooltip wrapping any element.

| Property | Type | Default |
|----------|------|---------|
| `content` | `string` | `''` |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| `delay` | `number` (ms) | `300` |

```html
<ca-tooltip content="Save your changes" position="bottom">
  <ca-button variant="primary">Save</ca-button>
</ca-tooltip>

<ca-tooltip content="Quick info" delay="0" position="right">
  <span>Hover me</span>
</ca-tooltip>
```

---

### Modal

`<ca-modal>` — Dialog overlay with header, body, and footer slots.

| Property | Type | Default |
|----------|------|---------|
| `open` | `boolean` | `false` |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` |

**Events:** `ca-close` (ESC, backdrop click, or close button)
**Slots:** `header`, default (body), `footer`

```html
<ca-button variant="primary" id="open-modal">Open Modal</ca-button>

<ca-modal id="my-modal" size="md">
  <span slot="header">Confirm Action</span>
  <p>Are you sure you want to proceed? This cannot be undone.</p>
  <div slot="footer">
    <ca-button variant="secondary" id="modal-cancel">Cancel</ca-button>
    <ca-button variant="primary" id="modal-confirm">Confirm</ca-button>
  </div>
</ca-modal>

<script>
  const modal = document.getElementById('my-modal');
  document.getElementById('open-modal').addEventListener('click', () => modal.open = true);
  document.getElementById('modal-cancel').addEventListener('click', () => modal.open = false);
  document.getElementById('modal-confirm').addEventListener('click', () => {
    // do something
    modal.open = false;
  });
  modal.addEventListener('ca-close', () => modal.open = false);
</script>
```

---

### Drawer

`<ca-drawer>` — Slide-in panel from the right or bottom edge of the screen.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls visibility |
| `position` | `'right' \| 'bottom'` | `'right'` | Slide direction |
| `size` | `string` | `'40%'` | Width (right) or height (bottom) — any CSS value |
| `heading` | `string` | `''` | Header title |
| `backdrop` | `boolean` | `true` | Show semi-transparent backdrop |
| `no-padding` | `boolean` | `false` | Remove default body padding (useful for full-bleed content) |

**Events:** `ca-close` (ESC, backdrop click, or close button)
**Slots:** default (body), `header-actions`, `footer`

```html
<!-- Right drawer -->
<ca-button variant="primary" id="open-drawer">Open Drawer</ca-button>

<ca-drawer id="detail-drawer" heading="User Details" size="450px">
  <div slot="header-actions">
    <ca-button variant="tertiary" size="sm">Edit</ca-button>
  </div>

  <p>Drawer body content goes here.</p>
  <ca-input label="Name" placeholder="Enter name"></ca-input>

  <div slot="footer" style="display:flex; gap:8px; justify-content:flex-end;">
    <ca-button variant="secondary" id="drawer-cancel">Cancel</ca-button>
    <ca-button variant="primary" id="drawer-save">Save</ca-button>
  </div>
</ca-drawer>

<script>
  const drawer = document.getElementById('detail-drawer');
  document.getElementById('open-drawer').addEventListener('click', () => drawer.open = true);
  drawer.addEventListener('ca-close', () => drawer.open = false);
  document.getElementById('drawer-cancel').addEventListener('click', () => drawer.open = false);
  document.getElementById('drawer-save').addEventListener('click', () => drawer.open = false);
</script>
```

```html
<!-- Bottom drawer with percentage height -->
<ca-drawer id="bottom-sheet" heading="Quick Settings" position="bottom" size="35%">
  <ca-toggle label="Notifications" checked></ca-toggle>
  <ca-toggle label="Auto-save" checked></ca-toggle>
</ca-drawer>
```

Custom sizes:

```html
<ca-drawer size="60%">...</ca-drawer>   <!-- 60% of viewport width -->
<ca-drawer size="400px">...</ca-drawer> <!-- Fixed 400px width -->
<ca-drawer size="80vw">...</ca-drawer>  <!-- 80% viewport width -->
<ca-drawer position="bottom" size="300px">...</ca-drawer> <!-- Fixed 300px height -->
```

---

### Split Button

`<ca-split-button>` — Primary button with dropdown options.

| Property | Type | Default |
|----------|------|---------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `label` | `string` | `''` |
| `options` | `{ value, label }[]` | `[]` |
| `value` | `string` | `''` |
| `loading` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

**Events:** `ca-click` (primary button), `ca-change` (dropdown option) — `{ value }`

```html
<ca-split-button label="Save" variant="primary" id="save-btn"></ca-split-button>
<script>
  const btn = document.getElementById('save-btn');
  btn.options = [
    { value: 'save-draft', label: 'Save as Draft' },
    { value: 'save-publish', label: 'Save & Publish' },
    { value: 'save-template', label: 'Save as Template' },
  ];
  btn.addEventListener('ca-click', () => console.log('Primary save clicked'));
  btn.addEventListener('ca-change', (e) => console.log('Option:', e.detail.value));
</script>
```

---

### Side Nav

`<ca-sidenav>` — Sidebar navigation with collapsible sections and user profile.

| Property | Type | Default |
|----------|------|---------|
| `collapsed` | `boolean` | `false` |
| `active-id` | `string` | `''` |
| `profile` | `{ name, role?, avatar? } \| null` | `null` |
| `sections` | `SideNavSection[]` | `[]` |

`SideNavSection`: `{ title?, items: SideNavItem[], grow? }`
`SideNavItem`: `{ id, label, icon?, children?: SideNavChild[], danger? }`

**Events:** `ca-navigate` — `{ id }`, `ca-toggle` (collapse toggled)

```html
<ca-sidenav id="nav" active-id="dashboard" style="height:100vh;"></ca-sidenav>
<script>
  const nav = document.getElementById('nav');
  nav.profile = { name: 'Jane Doe', role: 'Admin', avatar: 'https://i.pravatar.cc/40' };
  nav.sections = [
    {
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: '<svg>...</svg>' },
        { id: 'projects', label: 'Projects', icon: '<svg>...</svg>' },
        {
          id: 'settings', label: 'Settings', icon: '<svg>...</svg>',
          children: [
            { id: 'general', label: 'General' },
            { id: 'security', label: 'Security' },
          ],
        },
      ],
    },
    {
      grow: true, // pushes this section to the bottom
      items: [
        { id: 'logout', label: 'Log Out', danger: true },
      ],
    },
  ];
  nav.addEventListener('ca-navigate', (e) => {
    nav.activeId = e.detail.id;
  });
</script>
```

---

### Toast

`<ca-toast-container>` — Notification toasts via a programmatic API.

**Types:** `'success' | 'error' | 'info' | 'warning'`

```js
import { toast } from '@caylina/ui-kit';

// Basic usage
toast('File saved successfully', { type: 'success' });
toast('Network error occurred', { type: 'error' });
toast('New update available', { type: 'info' });
toast('Storage almost full', { type: 'warning' });

// Custom duration (default is 4000ms)
toast('This stays longer', { type: 'info', duration: 8000 });
```

For CDN usage:

```html
<script type="module">
  import { toast } from './src/lit/toast.ts';
  // or from the built bundle:
  // import { toast } from '@caylina/ui-kit';

  document.getElementById('my-btn').addEventListener('click', () => {
    toast('Action completed!', { type: 'success' });
  });
</script>
```

---

### Table

`<ca-table>` — Full-featured data table. See [Table Deep Dive](#table-deep-dive) for complete documentation.

Quick example:

```html
<ca-table id="users-table" heading="Users" selectable></ca-table>
<script>
  const table = document.getElementById('users-table');
  table.columns = [
    { key: 'name', heading: 'Name', type: 'bold-text', sortable: true },
    { key: 'email', heading: 'Email' },
    { key: 'status', heading: 'Status', type: 'badge', badgeMap: { Active: 'success', Inactive: 'danger' } },
  ];
  table.rows = [
    { id: '1', name: 'Alice', email: 'alice@example.com', status: 'Active' },
    { id: '2', name: 'Bob', email: 'bob@example.com', status: 'Inactive' },
  ];
</script>
```

---

### Multi Select

`<ca-multi-select>` — Dropdown multi-select with chip display for selected items.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `options` | `{ value, label }[]` | `[]` | Available options |
| `value` | `string[]` | `[]` | Selected values |
| `label` | `string` | `''` | Label text above input |
| `placeholder` | `string` | `'Select...'` | Placeholder text |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Component size |
| `borderless` | `boolean` | `false` | Remove border and background |
| `loading` | `boolean` | `false` | Show loading spinner |
| `allow-create` | `boolean` | `false` | Allow creating new options by typing a custom value |

**Events:** `ca-change` — `{ value: string[] }`, `ca-create` — `{ query: string }` (when user creates a new option)

```html
<ca-multi-select label="Tags" placeholder="Select tags..." id="tag-select"></ca-multi-select>
<script>
  const ms = document.getElementById('tag-select');
  ms.options = [
    { value: 'bug', label: 'Bug' },
    { value: 'feature', label: 'Feature' },
    { value: 'docs', label: 'Documentation' },
  ];
  ms.addEventListener('ca-change', (e) => console.log('Selected:', e.detail.value));
</script>

<!-- Creatable multi-select -->
<ca-multi-select label="Labels" allow-create placeholder="Search or create..."></ca-multi-select>
```

---

## PM Selectors

Specialized selector components designed for project management workflows. These provide rich, task-specific inputs with color coding, avatar support, and inline creation.

### Status Selector

`<ca-status-selector>` — Colored pill dropdown for selecting task statuses. Displays the current status as a color-coded pill and opens a dropdown to change it.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `options` | `ColorPillOption[]` | `[]` | Status options. Each: `{ value, label, color }` |
| `value` | `string` | `''` | Currently selected status value |
| `size` | `'sm' \| 'md'` | `'md'` | Selector size |
| `borderless` | `boolean` | `false` | Remove outer border |
| `allow-create` | `boolean` | `false` | Allow creating new statuses via text input |
| `placeholder` | `string` | `'Select status'` | Placeholder text when no value is selected |

**Events:** `ca-change` — `{ value: string }`, `ca-create` — `{ query: string }`

```html
<ca-status-selector id="status-sel" placeholder="Set status"></ca-status-selector>
<script>
  const sel = document.getElementById('status-sel');
  sel.options = [
    { value: 'todo', label: 'To Do', color: '#6B7280' },
    { value: 'in-progress', label: 'In Progress', color: '#3B82F6' },
    { value: 'review', label: 'In Review', color: '#F59E0B' },
    { value: 'done', label: 'Done', color: '#10B981' },
  ];
  sel.value = 'in-progress';
  sel.addEventListener('ca-change', (e) => console.log('Status:', e.detail.value));
</script>
```

---

### Priority Selector

`<ca-priority-selector>` — Priority selector with icon support. Displays a colored pill with an optional icon for each priority level.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `options` | `ColorPillOption[]` | `[]` | Priority options. Each: `{ value, label, color, icon? }` |
| `value` | `string` | `''` | Currently selected priority value |
| `size` | `'sm' \| 'md'` | `'md'` | Selector size |
| `borderless` | `boolean` | `false` | Remove outer border |
| `allow-create` | `boolean` | `false` | Allow creating new priorities |
| `placeholder` | `string` | `'Set priority'` | Placeholder text |

**Events:** `ca-change` — `{ value: string }`, `ca-create` — `{ query: string }`

```html
<ca-priority-selector id="priority-sel" placeholder="Priority"></ca-priority-selector>
<script>
  const sel = document.getElementById('priority-sel');
  sel.options = [
    { value: 'urgent', label: 'Urgent', color: '#EF4444' },
    { value: 'high', label: 'High', color: '#F59E0B' },
    { value: 'medium', label: 'Medium', color: '#3B82F6' },
    { value: 'low', label: 'Low', color: '#6B7280' },
  ];
  sel.value = 'high';
  sel.addEventListener('ca-change', (e) => console.log('Priority:', e.detail.value));
</script>
```

---

### Phase Selector

`<ca-phase-selector>` — Phase or milestone selector. Uses color-coded pills to represent project phases.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `options` | `ColorPillOption[]` | `[]` | Phase options. Each: `{ value, label, color }` |
| `value` | `string` | `''` | Currently selected phase value |
| `size` | `'sm' \| 'md'` | `'md'` | Selector size |
| `borderless` | `boolean` | `false` | Remove outer border |
| `allow-create` | `boolean` | `false` | Allow creating new phases |
| `placeholder` | `string` | `'Set phase'` | Placeholder text |

**Events:** `ca-change` — `{ value: string }`, `ca-create` — `{ query: string }`

```html
<ca-phase-selector id="phase-sel" placeholder="Phase"></ca-phase-selector>
<script>
  const sel = document.getElementById('phase-sel');
  sel.options = [
    { value: 'planning', label: 'Planning', color: '#8B5CF6' },
    { value: 'design', label: 'Design', color: '#EC4899' },
    { value: 'development', label: 'Development', color: '#3B82F6' },
    { value: 'qa', label: 'QA', color: '#F59E0B' },
    { value: 'launch', label: 'Launch', color: '#10B981' },
  ];
  sel.value = 'development';
</script>
```

---

### Assignee Selector

`<ca-assignee-selector>` — Avatar-based multi-select for assigning team members. Displays selected users as avatars and provides a searchable dropdown.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `members` | `AssigneeMember[]` | `[]` | Available members. Each: `{ value, label, src?, color?, email? }` |
| `value` | `string[]` | `[]` | Selected member values |
| `size` | `'sm' \| 'md'` | `'md'` | Selector size |
| `borderless` | `boolean` | `false` | Remove outer border |
| `searchable` | `boolean` | `true` | Enable type-to-search filtering |

**Events:** `ca-change` — `{ value: string[] }`

```html
<ca-assignee-selector id="assignee-sel"></ca-assignee-selector>
<script>
  const sel = document.getElementById('assignee-sel');
  sel.members = [
    { value: 'alice', label: 'Alice Chen', src: 'https://i.pravatar.cc/80?img=1', email: 'alice@example.com' },
    { value: 'bob', label: 'Bob Smith', color: '#3B82F6', email: 'bob@example.com' },
    { value: 'carol', label: 'Carol Davis', src: 'https://i.pravatar.cc/80?img=3' },
  ];
  sel.value = ['alice'];
  sel.addEventListener('ca-change', (e) => console.log('Assignees:', e.detail.value));
</script>
```

---

### Label Selector

`<ca-label-selector>` — Color-coded label multi-select with inline creation. Displays labels as colored chips and lets users add or create new labels.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `labels` | `LabelOption[]` | `[]` | Available labels. Each: `{ value, label, color }` |
| `value` | `string[]` | `[]` | Selected label values |
| `allow-create` | `boolean` | `false` | Allow creating new labels with a color picker |
| `size` | `'sm' \| 'md'` | `'md'` | Selector size |
| `borderless` | `boolean` | `false` | Remove outer border |

**Events:** `ca-change` — `{ value: string[] }`, `ca-create` — `{ label: string, color: string }`

```html
<ca-label-selector id="label-sel" allow-create></ca-label-selector>
<script>
  const sel = document.getElementById('label-sel');
  sel.labels = [
    { value: 'bug', label: 'Bug', color: '#EF4444' },
    { value: 'feature', label: 'Feature', color: '#3B82F6' },
    { value: 'design', label: 'Design', color: '#EC4899' },
    { value: 'docs', label: 'Documentation', color: '#8B5CF6' },
  ];
  sel.value = ['bug', 'feature'];
  sel.addEventListener('ca-create', (e) => console.log('New label:', e.detail.label, e.detail.color));
</script>
```

---

### Avatar Group

`<ca-avatar-group>` — Stacked avatar display showing multiple team members. Automatically truncates to show a "+N" overflow indicator when exceeding the max count.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `members` | `AvatarGroupMember[]` | `[]` | Members to display. Each: `{ name, src?, color? }` |
| `max` | `number` | `3` | Maximum avatars to show before overflow |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | Avatar size |
| `interactive` | `boolean` | `false` | Show pointer cursor and enable click events |

**Events:** `ca-click` — emitted when the group is clicked (requires `interactive`)

```html
<ca-avatar-group id="team-avatars" max="4" size="sm" interactive></ca-avatar-group>
<script>
  document.getElementById('team-avatars').members = [
    { name: 'Alice Chen', src: 'https://i.pravatar.cc/80?img=1' },
    { name: 'Bob Smith', color: '#3B82F6' },
    { name: 'Carol Davis', src: 'https://i.pravatar.cc/80?img=3' },
    { name: 'Dave Wilson', color: '#10B981' },
    { name: 'Eve Johnson', color: '#F59E0B' },
  ];
</script>
```

---

### Color Picker

`<ca-color-picker>` — Swatch grid color picker with optional custom color input. Presents a grid of preset color swatches for quick selection.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | Currently selected color (hex string) |
| `presets` | `string[]` | (default palette) | Array of hex color strings to display as swatches |
| `size` | `'sm' \| 'md'` | `'md'` | Swatch size |
| `allow-custom` | `boolean` | `false` | Show a custom hex input field |

**Events:** `ca-change` — `{ value: string }`

```html
<ca-color-picker value="#3B82F6" allow-custom></ca-color-picker>

<ca-color-picker id="custom-palette"></ca-color-picker>
<script>
  document.getElementById('custom-palette').presets = [
    '#EF4444', '#F59E0B', '#10B981', '#3B82F6',
    '#8B5CF6', '#EC4899', '#6B7280', '#1F2937',
  ];
</script>
```

---

### Estimation Input

`<ca-estimation-input>` — Numeric input with a unit suffix for time or point estimates. Provides an inline, compact input suitable for task estimation fields.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `number` | `0` | Current numeric value |
| `unit` | `'hours' \| 'points' \| 'days'` | `'hours'` | Unit label displayed after the number |
| `borderless` | `boolean` | `false` | Remove border and background |
| `size` | `'sm' \| 'md'` | `'md'` | Input size |

**Events:** `ca-change` — `{ value: number }`

```html
<ca-estimation-input value="8" unit="hours"></ca-estimation-input>
<ca-estimation-input value="5" unit="points" borderless></ca-estimation-input>
<ca-estimation-input value="3" unit="days" size="sm"></ca-estimation-input>
```

---

## Kanban

Drag-and-drop kanban board components for visual task management workflows.

### Kanban Board

`<ca-kanban-board>` — Drag-and-drop column-based board for organizing tasks into status columns. Supports card creation, reordering, and cross-column dragging.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | `KanbanColumnData[]` | `[]` | Column definitions with cards. Each: `{ id, title, color?, cards: KanbanCardData[] }` |
| `allow-create` | `boolean` | `false` | Show "Add card" button at the bottom of each column |

**Events:**

| Event | Detail | Description |
|-------|--------|-------------|
| `ca-card-move` | `{ cardId, fromColumnId, toColumnId, toIndex }` | Card dragged to a new position |
| `ca-card-click` | `{ card, columnId }` | Card clicked |
| `ca-card-create` | `{ columnId, title }` | New card created via inline input |

```html
<ca-kanban-board id="board" allow-create></ca-kanban-board>
<script>
  document.getElementById('board').columns = [
    {
      id: 'todo', title: 'To Do', color: '#6B7280',
      cards: [
        { id: 'task-1', title: 'Design homepage', taskKey: 'CA-101', priorityColor: '#F59E0B' },
        { id: 'task-2', title: 'Write API docs', taskKey: 'CA-102' },
      ],
    },
    {
      id: 'progress', title: 'In Progress', color: '#3B82F6',
      cards: [
        { id: 'task-3', title: 'Build auth flow', taskKey: 'CA-103', priorityColor: '#EF4444' },
      ],
    },
    {
      id: 'done', title: 'Done', color: '#10B981',
      cards: [],
    },
  ];
</script>
```

---

### Kanban Card

`<ca-kanban-card>` — Individual card for use within a kanban board. Displays task metadata including labels, assignees, and counts.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | `''` | Card title |
| `task-key` | `string` | `''` | Task identifier (e.g. "CA-101") |
| `priority-color` | `string` | `''` | Left-border color indicating priority |
| `due-date` | `string` | `''` | Due date string |
| `overdue` | `boolean` | `false` | Show due date in red |
| `labels` | `{ label, color }[]` | `[]` | Color-coded label chips |
| `assignees` | `{ name, src?, color? }[]` | `[]` | Assignee avatars |
| `comments-count` | `number` | `0` | Comment count indicator |
| `attachments-count` | `number` | `0` | Attachment count indicator |

**Events:** `ca-click`

```html
<ca-kanban-card
  title="Design homepage"
  task-key="CA-101"
  priority-color="#F59E0B"
  due-date="Mar 15"
  comments-count="3"
  attachments-count="2"
></ca-kanban-card>
```

---

## Data Visualization

Charts and timeline components for visualizing project data and progress.

### Chart

`<ca-chart>` — SVG-based chart supporting bar, line, pie, and doughnut types. Lightweight and themeable without external chart library dependencies.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'bar' \| 'line' \| 'pie' \| 'doughnut'` | `'bar'` | Chart type |
| `data` | `ChartData` | `{}` | Chart data. `{ labels: string[], datasets: [{ label, data: number[], color? }] }` |
| `show-legend` | `boolean` | `false` | Display a legend below the chart |

**Events:** `ca-segment-click` — `{ datasetIndex, dataIndex, value, label }`

```html
<ca-chart id="status-chart" type="doughnut" show-legend></ca-chart>
<script>
  document.getElementById('status-chart').data = {
    labels: ['To Do', 'In Progress', 'Done'],
    datasets: [{
      label: 'Tasks',
      data: [12, 8, 24],
      color: ['#6B7280', '#3B82F6', '#10B981'],
    }],
  };
</script>

<ca-chart id="velocity-chart" type="bar" show-legend></ca-chart>
<script>
  document.getElementById('velocity-chart').data = {
    labels: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4'],
    datasets: [
      { label: 'Planned', data: [20, 25, 22, 28], color: '#3B82F6' },
      { label: 'Completed', data: [18, 24, 22, 26], color: '#10B981' },
    ],
  };
</script>
```

---

### Gantt Chart

`<ca-gantt-chart>` — Timeline view with horizontal task bars and drag-to-resize support. Displays tasks across a time axis with dependency visualization.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `tasks` | `GanttTask[]` | `[]` | Task bars. Each: `{ id, title, startDate, endDate, color?, progress?, group? }` |
| `view-mode` | `'day' \| 'week' \| 'month'` | `'week'` | Time axis granularity |
| `show-today-marker` | `boolean` | `true` | Show a vertical marker at today's date |

**Events:**

| Event | Detail | Description |
|-------|--------|-------------|
| `ca-task-resize` | `{ id, startDate, endDate }` | Task bar dragged to new dates |
| `ca-task-click` | `{ task }` | Task bar clicked |
| `ca-range-change` | `{ startDate, endDate }` | Visible date range changed (scroll/zoom) |

```html
<ca-gantt-chart id="project-gantt" view-mode="week" show-today-marker></ca-gantt-chart>
<script>
  document.getElementById('project-gantt').tasks = [
    { id: '1', title: 'Research', startDate: '2026-03-01', endDate: '2026-03-07', color: '#8B5CF6', progress: 100 },
    { id: '2', title: 'Design', startDate: '2026-03-05', endDate: '2026-03-14', color: '#EC4899', progress: 60 },
    { id: '3', title: 'Development', startDate: '2026-03-10', endDate: '2026-03-28', color: '#3B82F6', progress: 20 },
    { id: '4', title: 'QA Testing', startDate: '2026-03-25', endDate: '2026-04-04', color: '#F59E0B', progress: 0 },
  ];
</script>
```

---

## Rich Content

Components for rich text editing, comments, activity feeds, and time tracking.

### Rich Text Editor

`<ca-rich-text-editor>` — WYSIWYG rich text editor with configurable toolbar. Supports formatting, lists, links, mentions, and HTML output.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | Current content (HTML string) |
| `placeholder` | `string` | `'Start typing...'` | Placeholder text |
| `toolbar` | `string[]` | `['bold','italic','underline','strike','link','ol','ul','mention']` | Toolbar buttons to display |
| `readonly` | `boolean` | `false` | Disable editing |
| `min-height` | `string` | `'120px'` | Minimum editor height (CSS value) |

**Events:** `ca-change` — `{ value: string }`, `ca-mention` — `{ query: string }` (triggered when user types `@`)

```html
<ca-rich-text-editor
  placeholder="Describe the task..."
  min-height="200px"
></ca-rich-text-editor>

<!-- Read-only display -->
<ca-rich-text-editor id="task-desc" readonly></ca-rich-text-editor>
<script>
  document.getElementById('task-desc').value = '<p>This task involves <strong>building</strong> the new dashboard.</p>';
</script>
```

---

### Comment Thread

`<ca-comment-thread>` — Threaded comment list with an input area for new comments. Supports editing and deleting existing comments.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `comments` | `Comment[]` | `[]` | Comment data. Each: `{ id, user: { name, src?, color? }, text, timestamp, edited? }` |
| `current-user` | `CommentUser` | `{}` | Current user info for the input avatar: `{ name, src?, color? }` |

**Events:**

| Event | Detail | Description |
|-------|--------|-------------|
| `ca-submit` | `{ text }` | New comment submitted |
| `ca-edit` | `{ id, text }` | Existing comment edited |
| `ca-delete` | `{ id }` | Comment deleted |

```html
<ca-comment-thread id="task-comments"></ca-comment-thread>
<script>
  const thread = document.getElementById('task-comments');
  thread.currentUser = { name: 'Alice Chen', src: 'https://i.pravatar.cc/80?img=1' };
  thread.comments = [
    {
      id: 'c1',
      user: { name: 'Bob Smith', color: '#3B82F6' },
      text: 'Can we move this to next sprint?',
      timestamp: '2026-03-02T10:30:00Z',
    },
    {
      id: 'c2',
      user: { name: 'Alice Chen', src: 'https://i.pravatar.cc/80?img=1' },
      text: 'Sure, I will reprioritize.',
      timestamp: '2026-03-02T11:00:00Z',
      edited: true,
    },
  ];
  thread.addEventListener('ca-submit', (e) => console.log('New comment:', e.detail.text));
</script>
```

---

### Activity Timeline

`<ca-activity-timeline>` — Vertical timeline displaying activity log entries. Supports infinite scroll with a load-more trigger.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `entries` | `ActivityTimelineEntry[]` | `[]` | Activity entries. Each: `{ id, user: { name, src?, color? }, action, timestamp, details? }` |
| `loading` | `boolean` | `false` | Show loading indicator at the bottom |

**Events:** `ca-load-more` — emitted when scrolled near the bottom (for infinite scroll)

```html
<ca-activity-timeline id="task-activity"></ca-activity-timeline>
<script>
  document.getElementById('task-activity').entries = [
    { id: 'a1', user: { name: 'Alice Chen' }, action: 'changed status to In Progress', timestamp: '2026-03-02T14:00:00Z' },
    { id: 'a2', user: { name: 'Bob Smith' }, action: 'added label Bug', timestamp: '2026-03-02T13:30:00Z', details: 'Priority set to High' },
    { id: 'a3', user: { name: 'Carol Davis' }, action: 'created this task', timestamp: '2026-03-01T09:00:00Z' },
  ];
</script>
```

---

### Time Log

`<ca-time-log>` — Time entry list with optional add-entry support. Displays logged time with user, duration, date, and billable status.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `entries` | `TimeLogEntry[]` | `[]` | Time entries. Each: `{ id, user: { name, src?, color? }, duration, date, description?, billable? }` |
| `allow-add` | `boolean` | `false` | Show an "Add time" button |
| `total-logged` | `string` | `''` | Total logged time display string (e.g. "16h 30m") |

**Events:** `ca-add` — add button clicked, `ca-delete` — `{ id }` — entry deleted

```html
<ca-time-log id="task-time" allow-add total-logged="12h 30m"></ca-time-log>
<script>
  document.getElementById('task-time').entries = [
    { id: 't1', user: { name: 'Alice Chen' }, duration: '4h', date: '2026-03-02', description: 'Frontend implementation', billable: true },
    { id: 't2', user: { name: 'Bob Smith' }, duration: '2h 30m', date: '2026-03-01', description: 'Code review', billable: true },
    { id: 't3', user: { name: 'Alice Chen' }, duration: '6h', date: '2026-02-28', description: 'Research & planning', billable: false },
  ];
</script>
```

---

## Navigation & Feedback

Navigation aids, loading states, context menus, and user feedback components.

### Breadcrumb

`<ca-breadcrumb>` — Navigation breadcrumb trail. Displays a hierarchical path with clickable segments for navigation.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | `[]` | Breadcrumb items. Each: `{ label, href?, id? }` |
| `separator` | `string` | `'/'` | Separator character between items |

**Events:** `ca-navigate` — `{ item }` — breadcrumb segment clicked

```html
<ca-breadcrumb id="nav-crumbs"></ca-breadcrumb>
<script>
  document.getElementById('nav-crumbs').items = [
    { label: 'Projects', id: 'projects' },
    { label: 'Caylina UI', id: 'caylina' },
    { label: 'Sprint 4', id: 'sprint-4' },
    { label: 'CA-203' },
  ];
</script>
```

---

### Empty State

`<ca-empty-state>` — Illustrated empty placeholder displayed when content is absent. Provides a heading, description, and optional call-to-action button.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `heading` | `string` | `''` | Heading text |
| `description` | `string` | `''` | Descriptive body text |
| `action-label` | `string` | `''` | Label for the action button (hidden if empty) |

**Events:** `ca-action` — action button clicked
**Slots:** default — custom illustration or icon

```html
<ca-empty-state
  heading="No tasks yet"
  description="Create your first task to get started with this project."
  action-label="Create Task"
>
  <svg slot="default" width="120" height="120" viewBox="0 0 120 120"><!-- illustration --></svg>
</ca-empty-state>
```

---

### Skeleton

`<ca-skeleton>` — Loading placeholder that mimics content shapes during data fetching. Provides visual feedback to indicate content is loading.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'text' \| 'circle' \| 'rect'` | `'text'` | Shape variant |
| `width` | `string` | `'100%'` | Width (CSS value) |
| `height` | `string` | `'1em'` | Height (CSS value) |
| `animation` | `'pulse' \| 'wave'` | `'pulse'` | Animation style |

```html
<!-- Text skeleton -->
<ca-skeleton width="80%"></ca-skeleton>
<ca-skeleton width="60%"></ca-skeleton>

<!-- Circle (avatar placeholder) -->
<ca-skeleton variant="circle" width="40px" height="40px"></ca-skeleton>

<!-- Rectangle (card placeholder) -->
<ca-skeleton variant="rect" width="100%" height="200px" animation="wave"></ca-skeleton>
```

---

### Context Menu

`<ca-context-menu>` — Positioned right-click context menu. Opens at specific coordinates and displays a list of actions with optional icons and danger states.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `ContextMenuItem[]` | `[]` | Menu items. Each: `{ id, label, icon?, danger?, divider? }` |
| `open` | `boolean` | `false` | Controls visibility |
| `x` | `number` | `0` | Horizontal position (px) |
| `y` | `number` | `0` | Vertical position (px) |

**Events:** `ca-select` — `{ id }` — menu item selected, `ca-close` — menu closed (click outside or ESC)

```html
<ca-context-menu id="row-menu"></ca-context-menu>
<script>
  const menu = document.getElementById('row-menu');
  menu.items = [
    { id: 'edit', label: 'Edit' },
    { id: 'duplicate', label: 'Duplicate' },
    { id: 'move', label: 'Move to...' },
    { divider: true },
    { id: 'delete', label: 'Delete', danger: true },
  ];

  document.querySelector('table').addEventListener('contextmenu', (e) => {
    e.preventDefault();
    menu.x = e.clientX;
    menu.y = e.clientY;
    menu.open = true;
  });

  menu.addEventListener('ca-select', (e) => console.log('Action:', e.detail.id));
  menu.addEventListener('ca-close', () => menu.open = false);
</script>
```

---

### Bulk Action Bar

`<ca-bulk-action-bar>` — Floating action bar displayed when multiple items are selected. Provides batch operations with a selection count indicator.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `count` | `number` | `0` | Number of selected items |
| `open` | `boolean` | `false` | Controls visibility |
| `actions` | `BulkAction[]` | `[]` | Available actions. Each: `{ id, label, icon? }` |

**Events:** `ca-action` — `{ id }` — action button clicked, `ca-clear` — clear selection button clicked

```html
<ca-bulk-action-bar id="bulk-bar"></ca-bulk-action-bar>
<script>
  const bar = document.getElementById('bulk-bar');
  bar.actions = [
    { id: 'assign', label: 'Assign' },
    { id: 'label', label: 'Add Label' },
    { id: 'move', label: 'Move' },
    { id: 'delete', label: 'Delete' },
  ];

  // Show the bar when table rows are selected
  document.querySelector('ca-table').addEventListener('ca-select', (e) => {
    bar.count = e.detail.selectedIds.length;
    bar.open = bar.count > 0;
  });

  bar.addEventListener('ca-action', (e) => console.log('Bulk action:', e.detail.id));
  bar.addEventListener('ca-clear', () => bar.open = false);
</script>
```

---

### Command Bar

`<ca-command-bar>` — Command palette (Cmd+K / Ctrl+K) for keyboard-driven navigation and actions. Provides fuzzy search across commands grouped by category.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls visibility |
| `commands` | `CommandBarItem[]` | `[]` | Available commands. Each: `{ id, label, icon?, group?, shortcut? }` |
| `placeholder` | `string` | `'Type a command...'` | Search input placeholder |

**Events:** `ca-select` — `{ id }` — command selected, `ca-search` — `{ query }` — search input changed, `ca-close` — dialog closed

```html
<ca-command-bar id="cmd-bar"></ca-command-bar>
<script>
  const cmdBar = document.getElementById('cmd-bar');
  cmdBar.commands = [
    { id: 'new-task', label: 'Create New Task', group: 'Actions', shortcut: 'Ctrl+N' },
    { id: 'search-tasks', label: 'Search Tasks', group: 'Actions', shortcut: 'Ctrl+F' },
    { id: 'board', label: 'Go to Board', group: 'Navigation' },
    { id: 'backlog', label: 'Go to Backlog', group: 'Navigation' },
    { id: 'settings', label: 'Open Settings', group: 'Navigation', shortcut: 'Ctrl+,' },
  ];

  // Toggle with keyboard shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      cmdBar.open = !cmdBar.open;
    }
  });

  cmdBar.addEventListener('ca-select', (e) => {
    console.log('Command:', e.detail.id);
    cmdBar.open = false;
  });
  cmdBar.addEventListener('ca-close', () => cmdBar.open = false);
</script>
```

---

### Notification Center

`<ca-notification-center>` — Bell icon button with a dropdown notification list. Displays unread count badge and supports mark-as-read and clear-all actions.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `notifications` | `NotificationItem[]` | `[]` | Notification items. Each: `{ id, title, body?, timestamp, read, type? }` |
| `unread-count` | `number` | `0` | Badge count on the bell icon |
| `open` | `boolean` | `false` | Controls dropdown visibility |

**Events:**

| Event | Detail | Description |
|-------|--------|-------------|
| `ca-read` | `{ id }` | Notification marked as read |
| `ca-click` | `{ id }` | Notification clicked |
| `ca-clear-all` | — | Clear all button clicked |

```html
<ca-notification-center id="notif-center"></ca-notification-center>
<script>
  const center = document.getElementById('notif-center');
  center.notifications = [
    { id: 'n1', title: 'Task assigned to you', body: 'Alice assigned CA-203 to you', timestamp: '2026-03-03T09:00:00Z', read: false, type: 'assignment' },
    { id: 'n2', title: 'Comment on CA-187', body: 'Bob commented: "Looks good!"', timestamp: '2026-03-02T16:30:00Z', read: false, type: 'comment' },
    { id: 'n3', title: 'Sprint 4 started', timestamp: '2026-03-01T08:00:00Z', read: true, type: 'system' },
  ];
  center.unreadCount = 2;
  center.addEventListener('ca-click', (e) => console.log('Notification clicked:', e.detail.id));
  center.addEventListener('ca-read', (e) => console.log('Marked read:', e.detail.id));
  center.addEventListener('ca-clear-all', () => console.log('Cleared all'));
</script>
```

---

## Table Deep Dive

The `<ca-table>` component is the most feature-rich component in the library. This section covers every feature in depth.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | `TableColumn[]` | `[]` | Column definitions |
| `rows` | `TableRow[]` | `[]` | Row data |
| `heading` | `string` | `''` | Card header title |
| `heading-badge` | `string` | `''` | Badge text next to heading |
| `supporting-text` | `string` | `''` | Subtitle below heading |
| `selectable` | `boolean` | `false` | Show row checkboxes |
| `draggable` | `boolean` | `false` | Enable drag-to-reorder |
| `show-search` | `boolean` | `false` | Show search input |
| `show-filters` | `boolean` | `false` | Show filters button |
| `filterTabs` | `TableFilterTab[]` | `[]` | Tab-style filter buttons |
| `active-filter-tab` | `string` | `''` | Active filter tab ID |
| `rowActions` | `TableAction[]` | `[]` | Per-row action dropdown |
| `pagination` | `TablePagination` | `undefined` | Pagination config |
| `sort` | `TableSort` | `undefined` | Current sort state |
| `selectedIds` | `string[]` | `[]` | Currently selected row IDs |
| `row-height` | `'compact' \| 'default' \| 'relaxed'` | `'default'` | Row padding density |
| `expandable` | `boolean` | `false` | Enable expand/collapse arrows |
| `expandedIds` | `string[]` | `[]` | Currently expanded row IDs |
| `resizable` | `boolean` | `false` | Enable column resize handles |
| `columnFilters` | `Record<string, string[]>` | `{}` | Active filter values per column |
| `groups` | `TableGroup[]` | `[]` | Grouped row sections. Each group: `{ id, label, rows, collapsed? }`. |
| `inline-add` | `boolean` | `false` | Show an "Add row" button at the bottom of the table (or per group) |
| `virtual-scroll` | `boolean` | `false` | Enable virtual scrolling for large datasets (renders only visible rows) |
| `clickable-rows` | `boolean` | `false` | Make entire rows clickable (pointer cursor, hover highlight) |

**Slots:** `header-actions` — buttons in the card header

### Events

| Event | Detail | When |
|-------|--------|------|
| `ca-sort` | `{ key, direction }` | Column header clicked |
| `ca-select` | `{ selectedIds }` | Row checkbox toggled |
| `ca-row-action` | `{ action, row }` | Row action menu item clicked |
| `ca-filter-tab` | `{ id }` | Filter tab clicked |
| `ca-search` | `{ query }` | Search input changed (debounced) |
| `ca-filter-click` | `{}` | Filters button clicked |
| `ca-page` | `{ page, pageSize }` | Pagination button clicked |
| `ca-reorder` | `{ rowId, fromIndex, toIndex, rows }` | Row drag completed |
| `ca-cell-toggle` | `{ key, row, checked }` | Toggle cell changed |
| `ca-expand` | `{ id, expanded, expandedIds }` | Expand/collapse arrow clicked |
| `ca-column-filter` | `{ key, values }` | Column filter checkbox toggled |
| `ca-column-resize` | `{ key, width }` | Column resize handle released |
| `ca-group-toggle` | `{ id, collapsed }` | Group header expand/collapse toggled |
| `ca-row-click` | `{ row }` | Row clicked (requires `clickable-rows`) |
| `ca-row-create` | `{ groupId? }` | Inline add row button clicked |

### Types

```typescript
interface TableColumn {
  key: string;                // Property key in row data
  heading: string;            // Column header text
  type?: 'text' | 'bold-text' | 'badge' | 'toggle' | 'progress' | 'custom';
  width?: string;             // CSS width, e.g. '200px', 'minmax(120px, 1fr)'
  sortable?: boolean;
  filterable?: boolean;        // Enable per-column filter dropdown
  badgeMap?: Record<string, string>;   // For badge type: value → variant
  progressMax?: string;                // For progress type: row property for max
  progressSuffix?: string;            // For progress type: label suffix
  render?: (value, row) => TemplateResult;  // For custom type
}

interface TableRow {
  id: string;
  children?: TableRow[];      // Nested child rows (expandable)
  [key: string]: unknown;
}

interface TableFilterTab {
  id: string;
  label: string;
  count?: number;
}

interface TableAction {
  label: string;
  action: string;
}

interface TablePagination {
  page: number;
  pageSize: number;
  totalItems: number;
}

interface TableSort {
  key: string;
  direction: 'asc' | 'desc';
}

interface TableGroup {
  id: string;
  label: string;
  rows: TableRow[];
  collapsed?: boolean;
}
```

### Column Types

#### text (default)

Standard text cell with ellipsis overflow:

```js
{ key: 'email', heading: 'Email' }
// or explicitly:
{ key: 'email', heading: 'Email', type: 'text' }
```

#### bold-text

Semibold text in primary color, great for name/title columns:

```js
{ key: 'name', heading: 'Name', type: 'bold-text', sortable: true }
```

#### badge

Renders a `<ca-badge>` using a `badgeMap` to determine the variant:

```js
{
  key: 'status',
  heading: 'Status',
  type: 'badge',
  badgeMap: {
    'Active': 'success',
    'Inactive': 'danger',
    'Pending': 'warning',
    'Draft': 'default',
  },
}
```

#### toggle

Renders a `<ca-toggle>` switch:

```js
{ key: 'enabled', heading: 'Enabled', type: 'toggle' }
```

Listen for changes with `ca-cell-toggle`:

```js
table.addEventListener('ca-cell-toggle', (e) => {
  const { key, row, checked } = e.detail;
  // Update your data
});
```

#### progress

Renders a `<ca-progress-bar>`:

```js
{
  key: 'progress',
  heading: 'Progress',
  type: 'progress',
  progressMax: 'total',      // row property for max value
  progressSuffix: 'times',   // shown after the label
}
```

Row data: `{ id: '1', progress: 37, total: 60 }`

#### custom

Render anything using a function that returns a Lit `TemplateResult`:

```js
import { html } from 'lit';

{
  key: 'avatar',
  heading: 'User',
  type: 'custom',
  render: (value, row) => html`
    <div style="display:flex; align-items:center; gap:8px;">
      <ca-avatar name="${row.name}" size="xs"></ca-avatar>
      <span>${row.name}</span>
    </div>
  `,
}
```

### Feature: Sorting

Enable sorting on individual columns with `sortable: true`. Sortable columns display stacked up/down chevron arrows in the header — the active sort direction is highlighted while the other stays muted. Clicking the header toggles between ascending and descending. The table emits `ca-sort` events — you handle the actual sort logic:

```html
<ca-table id="sorted-table"></ca-table>
<script>
  const table = document.getElementById('sorted-table');
  table.columns = [
    { key: 'name', heading: 'Name', type: 'bold-text', sortable: true },
    { key: 'date', heading: 'Date', sortable: true },
    { key: 'status', heading: 'Status' }, // not sortable
  ];
  table.rows = [/* ... */];
  table.sort = { key: 'name', direction: 'asc' };

  table.addEventListener('ca-sort', (e) => {
    table.sort = e.detail;  // { key, direction }
    // Re-sort your data and update table.rows
    const { key, direction } = e.detail;
    table.rows = [...table.rows].sort((a, b) => {
      const cmp = String(a[key]).localeCompare(String(b[key]));
      return direction === 'asc' ? cmp : -cmp;
    });
  });
</script>
```

### Feature: Selection

Enable row selection with `selectable`. The header gets a select-all checkbox:

```html
<ca-table id="sel-table" selectable></ca-table>
<script>
  const table = document.getElementById('sel-table');
  table.columns = [/* ... */];
  table.rows = [/* ... */];
  table.selectedIds = ['1', '3'];  // pre-select rows

  table.addEventListener('ca-select', (e) => {
    table.selectedIds = e.detail.selectedIds;
    console.log('Selected:', e.detail.selectedIds);
  });
</script>
```

### Feature: Drag-to-Reorder

Enable drag handles with `draggable`:

```html
<ca-table id="drag-table" draggable></ca-table>
<script>
  const table = document.getElementById('drag-table');
  table.columns = [/* ... */];
  table.rows = [/* ... */];

  table.addEventListener('ca-reorder', (e) => {
    table.rows = e.detail.rows;  // already reordered
    console.log(`Moved row ${e.detail.rowId} from ${e.detail.fromIndex} to ${e.detail.toIndex}`);
  });
</script>
```

### Feature: Row Actions

Add a three-dot menu with per-row actions:

```html
<ca-table id="actions-table"></ca-table>
<script>
  const table = document.getElementById('actions-table');
  table.columns = [/* ... */];
  table.rows = [/* ... */];
  table.rowActions = [
    { label: 'Edit', action: 'edit' },
    { label: 'Duplicate', action: 'duplicate' },
    { label: 'Delete', action: 'delete' },
  ];

  table.addEventListener('ca-row-action', (e) => {
    const { action, row } = e.detail;
    switch (action) {
      case 'edit':
        console.log('Edit row:', row.id);
        break;
      case 'delete':
        table.rows = table.rows.filter((r) => r.id !== row.id);
        break;
    }
  });
</script>
```

### Feature: Search & Filters

```html
<ca-table id="filter-table" show-search show-filters></ca-table>
<script>
  const table = document.getElementById('filter-table');
  table.columns = [/* ... */];
  table.rows = [/* ... */];
  table.filterTabs = [
    { id: 'all', label: 'All', count: 50 },
    { id: 'active', label: 'Active', count: 35 },
    { id: 'inactive', label: 'Inactive', count: 15 },
  ];
  table.activeFilterTab = 'all';

  table.addEventListener('ca-filter-tab', (e) => {
    table.activeFilterTab = e.detail.id;
    // Re-filter your data
  });

  table.addEventListener('ca-search', (e) => {
    console.log('Search query:', e.detail.query);
    // Filter rows by query
  });

  table.addEventListener('ca-filter-click', () => {
    // Open an advanced filter panel/modal
  });
</script>
```

### Feature: Pagination

```html
<ca-table id="paged-table"></ca-table>
<script>
  const table = document.getElementById('paged-table');
  table.columns = [/* ... */];
  table.rows = [/* page 1 data */];
  table.pagination = { page: 1, pageSize: 10, totalItems: 87 };

  table.addEventListener('ca-page', (e) => {
    table.pagination = { ...table.pagination, page: e.detail.page };
    // Fetch and set new page data
  });
</script>
```

### Feature: Row Height

Control row density with the `row-height` attribute:

```html
<ca-table row-height="compact">...</ca-table>  <!-- Tight padding -->
<ca-table row-height="default">...</ca-table>  <!-- Normal (default) -->
<ca-table row-height="relaxed">...</ca-table>  <!-- Spacious padding -->
```

### Feature: Column Width

Control column widths using the `width` property in column definitions:

```js
table.columns = [
  { key: 'name', heading: 'Name', width: '200px' },                   // Fixed width
  { key: 'email', heading: 'Email', width: 'minmax(200px, 2fr)' },    // Flexible with min
  { key: 'role', heading: 'Role', width: '120px' },                   // Fixed width
  { key: 'bio', heading: 'Bio' },                                      // Default: minmax(120px, 1fr)
];
```

### Feature: Column Resizing

Enable drag-to-resize column handles with `resizable`. Users can drag the right edge of any column header to adjust its width:

```html
<ca-table id="resize-table" resizable></ca-table>
<script>
  const table = document.getElementById('resize-table');
  table.columns = [
    { key: 'name', heading: 'Name', type: 'bold-text' },
    { key: 'email', heading: 'Email' },
    { key: 'role', heading: 'Role' },
  ];
  table.rows = [/* ... */];

  table.addEventListener('ca-column-resize', (e) => {
    console.log(`Column "${e.detail.key}" resized to ${e.detail.width}px`);
  });
</script>
```

The minimum column width is 60px. Resized widths override the `width` property in column definitions.

### Feature: Per-Column Filtering

Enable filter dropdowns on individual columns with `filterable: true`. The table collects unique values from your row data and renders a checkbox list. The component emits `ca-column-filter` — you handle the actual filtering:

```html
<ca-table id="col-filter-table"></ca-table>
<script>
  const table = document.getElementById('col-filter-table');
  const allRows = [
    { id: '1', name: 'Alice', role: 'Designer', status: 'Active' },
    { id: '2', name: 'Bob', role: 'Developer', status: 'Active' },
    { id: '3', name: 'Charlie', role: 'Manager', status: 'Inactive' },
  ];
  table.columns = [
    { key: 'name', heading: 'Name', type: 'bold-text' },
    { key: 'role', heading: 'Role', filterable: true },
    { key: 'status', heading: 'Status', filterable: true },
  ];
  table.rows = [...allRows];

  table.addEventListener('ca-column-filter', (e) => {
    const { key, values } = e.detail;
    const filters = { ...table.columnFilters, [key]: values };
    table.columnFilters = filters;

    // Apply all active filters
    let filtered = [...allRows];
    for (const [colKey, colValues] of Object.entries(filters)) {
      if (colValues.length > 0) {
        filtered = filtered.filter((row) => colValues.includes(String(row[colKey])));
      }
    }
    table.rows = filtered;
  });
</script>
```

The filter icon appears in the header cell for filterable columns. When a filter is active, the icon highlights with the primary color. Columns with more than 8 unique values show a search bar in the dropdown.

### Feature: Expandable Rows (Nested Data)

Show parent rows with expand/collapse arrows that reveal child rows:

```html
<ca-table id="expand-table" expandable></ca-table>
<script>
  const table = document.getElementById('expand-table');
  table.columns = [
    { key: 'task', heading: 'Task', type: 'bold-text' },
    { key: 'assignee', heading: 'Assignee' },
    { key: 'status', heading: 'Status', type: 'badge', badgeMap: { Done: 'success', 'In Progress': 'warning', 'To Do': 'default' } },
  ];
  table.rows = [
    {
      id: 'p1',
      task: 'Design System',
      assignee: 'Alice',
      status: 'In Progress',
      children: [
        { id: 'p1-1', task: 'Color tokens', assignee: 'Alice', status: 'Done' },
        { id: 'p1-2', task: 'Typography scale', assignee: 'Alice', status: 'In Progress' },
        { id: 'p1-3', task: 'Spacing guidelines', assignee: 'Bob', status: 'To Do' },
      ],
    },
    {
      id: 'p2',
      task: 'Component Library',
      assignee: 'Charlie',
      status: 'To Do',
      children: [
        { id: 'p2-1', task: 'Button component', assignee: 'Charlie', status: 'To Do' },
        { id: 'p2-2', task: 'Input component', assignee: 'Diana', status: 'To Do' },
      ],
    },
    { id: 'p3', task: 'Documentation', assignee: 'Eve', status: 'To Do' }, // no children = no arrow
  ];

  // Pre-expand first row
  table.expandedIds = ['p1'];

  table.addEventListener('ca-expand', (e) => {
    table.expandedIds = e.detail.expandedIds;
    console.log(`Row ${e.detail.id} ${e.detail.expanded ? 'expanded' : 'collapsed'}`);
  });
</script>
```

### Feature: Header Actions Slot

Add buttons or controls to the table card header:

```html
<ca-table id="my-table" heading="Team Members" heading-badge="Active">
  <div slot="header-actions" style="display:flex; gap:8px;">
    <ca-button variant="tertiary" size="sm">Export</ca-button>
    <ca-button variant="primary" size="sm">Add Member</ca-button>
  </div>
</ca-table>
```

### Feature: Editable Cells (Inline Editing)

Use `type: 'custom'` with a `render` function to embed interactive components — inputs, selects, multi-selects, toggles — directly inside table cells. No special table variant is needed.

**Key concepts:**

- **`type: 'custom'` + `render`** — The render function receives `(value, row)` and returns a Lit `TemplateResult`. You can return any Caylina component.
- **`borderless`** — Add the `borderless` attribute to `<ca-input>` and `<ca-select>` so they blend into the table row. The border appears on focus/hover.
- **Auto-sizing** — `ca-input`, `ca-select`, and `ca-multi-select` automatically stretch to fill the column width when placed inside table cells.
- **`type: 'toggle'`** — For simple boolean columns, use the built-in `toggle` type instead of a custom render. The table emits `ca-cell-toggle` events.
- **Sorting, filtering, and resizing** all work alongside editable cells — add `sortable`, `filterable`, and `resizable` as usual.

```html
<ca-table id="editable-table" heading="Project Tracker" resizable></ca-table>
<script type="module">
  import { html } from 'lit';

  const table = document.getElementById('editable-table');

  // Keep a mutable source-of-truth array
  const allRows = [
    { id: '1', task: 'Design homepage', assignee: 'alice', priority: 'High', hours: '12', approved: true },
    { id: '2', task: 'Build API endpoints', assignee: 'bob', priority: 'High', hours: '24', approved: false },
    { id: '3', task: 'Write unit tests', assignee: 'charlie', priority: 'Medium', hours: '8', approved: false },
    { id: '4', task: 'Set up CI/CD', assignee: 'alice', priority: 'Low', hours: '4', approved: true },
    { id: '5', task: 'Database migration', assignee: 'bob', priority: 'Medium', hours: '16', approved: false },
  ];

  const assigneeOptions = [
    { value: 'alice', label: 'Alice' },
    { value: 'bob', label: 'Bob' },
    { value: 'charlie', label: 'Charlie' },
  ];

  const priorityOptions = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
  ];

  // Helper: mutate the source row and refresh the table
  function updateRow(id, key, value) {
    const row = allRows.find((r) => r.id === id);
    if (row) row[key] = value;
    applyFiltersAndSort();
  }

  // Helper: filter from full dataset, then sort
  function applyFiltersAndSort() {
    const filters = table.columnFilters || {};
    let result = [...allRows];
    for (const [colKey, colValues] of Object.entries(filters)) {
      if (colValues.length > 0) {
        result = result.filter((row) => colValues.includes(String(row[colKey])));
      }
    }
    if (table.sort) {
      const { key, direction } = table.sort;
      result.sort((a, b) => {
        const cmp = String(a[key]).localeCompare(String(b[key]), undefined, { numeric: true });
        return direction === 'asc' ? cmp : -cmp;
      });
    }
    table.rows = result;
  }

  // Column definitions
  table.columns = [
    {
      key: 'task',
      heading: 'Task',
      type: 'custom',
      sortable: true,
      width: 'minmax(200px, 2fr)',
      render: (value, row) => html`
        <ca-input size="sm" borderless
          .value=${String(value)}
          @ca-change=${(e) => updateRow(row.id, 'task', e.detail.value)}
        ></ca-input>
      `,
    },
    {
      key: 'assignee',
      heading: 'Assignee',
      type: 'custom',
      sortable: true,
      filterable: true,
      width: 'minmax(140px, 1fr)',
      render: (value, row) => html`
        <ca-select size="sm" borderless
          .value=${String(value)}
          .options=${assigneeOptions}
          @ca-change=${(e) => updateRow(row.id, 'assignee', e.detail.value)}
        ></ca-select>
      `,
    },
    {
      key: 'priority',
      heading: 'Priority',
      type: 'custom',
      sortable: true,
      filterable: true,
      width: 'minmax(130px, 1fr)',
      render: (value, row) => html`
        <ca-select size="sm" borderless
          .value=${String(value)}
          .options=${priorityOptions}
          @ca-change=${(e) => updateRow(row.id, 'priority', e.detail.value)}
        ></ca-select>
      `,
    },
    {
      key: 'hours',
      heading: 'Est. Hours',
      type: 'custom',
      sortable: true,
      width: '120px',
      render: (value, row) => html`
        <ca-input size="sm" borderless type="number"
          .value=${String(value)}
          @ca-change=${(e) => updateRow(row.id, 'hours', e.detail.value)}
        ></ca-input>
      `,
    },
    {
      key: 'approved',
      heading: 'Approved',
      type: 'toggle',
      width: '100px',
    },
  ];

  table.rows = [...allRows];

  // Event handlers
  table.addEventListener('ca-sort', (e) => {
    table.sort = e.detail;
    applyFiltersAndSort();
  });

  table.addEventListener('ca-column-filter', (e) => {
    const { key, values } = e.detail;
    table.columnFilters = { ...table.columnFilters, [key]: values };
    applyFiltersAndSort();
  });

  table.addEventListener('ca-cell-toggle', (e) => {
    updateRow(e.detail.row.id, e.detail.key, e.detail.checked);
  });
</script>
```

**How it works step by step:**

1. **Define a mutable `allRows` array** as your source of truth. The table's `rows` property always receives a copy derived from this array.

2. **Write an `updateRow` helper** that mutates the source row in `allRows`, then calls `applyFiltersAndSort()` to refresh the table. Every `ca-change` handler from your inputs/selects calls this.

3. **Write an `applyFiltersAndSort` helper** that starts from the full `allRows`, applies any active column filters, then sorts. This ensures edits, filters, and sorts all compose correctly.

4. **Use `type: 'custom'` with `render`** on each editable column. The render function returns a Lit template containing a Caylina component. Add `borderless` so inputs/selects blend into the row and only show a border on interaction.

5. **For boolean columns**, use the built-in `type: 'toggle'` instead of a custom render — it's simpler and emits `ca-cell-toggle` with `{ key, row, checked }`.

6. **Add `resizable` to the `<ca-table>` element** to enable drag-to-resize column handles. Add `sortable: true` and `filterable: true` on individual columns as needed.

**Tips:**

- Use `size="sm"` on embedded components so they fit comfortably in table rows.
- The `borderless` attribute works on `<ca-input>`, `<ca-select>`, and `<ca-multi-select>`. The border and background are transparent by default; focus reveals the standard 2px focus ring, and hover reveals the border on selects.
- Numeric sorting works correctly because `localeCompare` with `{ numeric: true }` handles number strings like `"8"` < `"12"` < `"24"`.
- Filter dropdowns automatically collect unique values from the full (unfiltered) dataset, so options don't disappear after filtering.

### Combining Features

All table features work together. Here's a fully-loaded example:

```html
<ca-table
  id="full-table"
  heading="Project Board"
  heading-badge="Sprint 4"
  supporting-text="Manage tasks and track progress."
  selectable
  draggable
  expandable
  show-search
  show-filters
  row-height="default"
></ca-table>
<script>
  const table = document.getElementById('full-table');

  table.columns = [
    { key: 'task', heading: 'Task', type: 'bold-text', sortable: true },
    { key: 'assignee', heading: 'Assignee', sortable: true },
    { key: 'status', heading: 'Status', type: 'badge', badgeMap: { Done: 'success', Active: 'warning', Blocked: 'danger' } },
    { key: 'progress', heading: 'Progress', type: 'progress', progressMax: 'total' },
  ];

  table.rows = [
    {
      id: '1', task: 'Authentication', assignee: 'Alice', status: 'Active', progress: 7, total: 10,
      children: [
        { id: '1a', task: 'Login flow', assignee: 'Alice', status: 'Done', progress: 3, total: 3 },
        { id: '1b', task: 'OAuth integration', assignee: 'Alice', status: 'Active', progress: 4, total: 7 },
      ],
    },
    { id: '2', task: 'Dashboard UI', assignee: 'Bob', status: 'Active', progress: 3, total: 8 },
  ];

  table.filterTabs = [
    { id: 'all', label: 'All', count: 12 },
    { id: 'active', label: 'Active', count: 5 },
    { id: 'done', label: 'Done', count: 7 },
  ];
  table.activeFilterTab = 'all';
  table.sort = { key: 'task', direction: 'asc' };
  table.pagination = { page: 1, pageSize: 10, totalItems: 12 };
  table.rowActions = [
    { label: 'Edit', action: 'edit' },
    { label: 'Delete', action: 'delete' },
  ];

  // Wire up all events
  table.addEventListener('ca-sort', (e) => table.sort = e.detail);
  table.addEventListener('ca-select', (e) => table.selectedIds = e.detail.selectedIds);
  table.addEventListener('ca-expand', (e) => table.expandedIds = e.detail.expandedIds);
  table.addEventListener('ca-filter-tab', (e) => table.activeFilterTab = e.detail.id);
  table.addEventListener('ca-page', (e) => table.pagination = { ...table.pagination, page: e.detail.page });
  table.addEventListener('ca-reorder', (e) => table.rows = e.detail.rows);
  table.addEventListener('ca-search', (e) => console.log('Search:', e.detail.query));
  table.addEventListener('ca-row-action', (e) => console.log('Action:', e.detail.action, e.detail.row));
</script>
```

---

## Customization Patterns

### Override brand colors globally

```css
:root {
  --ca-color-primary: #6D28D9;        /* Purple primary */
  --ca-color-primary-pressed: #5B21B6;
  --ca-color-secondary: #1F2937;
}

[data-theme="dark"] {
  --ca-color-primary: #8B5CF6;
  --ca-color-primary-pressed: #7C3AED;
  --ca-color-secondary: rgba(255, 255, 255, 0.9);
}
```

### Custom font

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

:root {
  --ca-font-family: 'Inter', sans-serif;
  --ca-font-weight-semibold: 600;
}
```

### Rounded buttons

```css
:root {
  --ca-radius-button: 9999px;  /* Fully rounded pill buttons */
}
```

### Compact spacing

```css
:root {
  --ca-space-xs: 2px;
  --ca-space-sm: 4px;
  --ca-space-md: 8px;
  --ca-space-lg: 16px;
  --ca-space-xl: 24px;
}
```

### Scoped theme for a section

```html
<div class="admin-panel" style="
  --ca-color-primary: #DC2626;
  --ca-surface: #FEF2F2;
  --ca-border: #FECACA;
">
  <ca-button variant="primary">Admin Action</ca-button>
  <ca-callout variant="highlight">Admin-only area</ca-callout>
</div>
```

### Working with frameworks

#### React

```jsx
function App() {
  const handleSort = (e) => {
    console.log('Sort:', e.detail);
  };

  return (
    <ca-table
      ref={(el) => {
        if (el) {
          el.columns = [/* ... */];
          el.rows = [/* ... */];
          el.addEventListener('ca-sort', handleSort);
        }
      }}
      heading="Users"
      selectable
    />
  );
}
```

#### Vue

```vue
<template>
  <ca-table
    ref="table"
    heading="Users"
    selectable
    @ca-sort="handleSort"
    @ca-select="handleSelect"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';

const table = ref(null);

onMounted(() => {
  table.value.columns = [/* ... */];
  table.value.rows = [/* ... */];
});

function handleSort(e) {
  table.value.sort = e.detail;
}
function handleSelect(e) {
  table.value.selectedIds = e.detail.selectedIds;
}
</script>
```

#### Vanilla JS (module)

```js
import '@caylina/ui-kit';
import { toast } from '@caylina/ui-kit';

const table = document.querySelector('ca-table');
table.columns = [/* ... */];
table.rows = [/* ... */];
table.addEventListener('ca-sort', (e) => { /* ... */ });

toast('Ready!', { type: 'success' });
```

---

## License

MIT — **Landon Thornton**
