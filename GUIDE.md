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
5. [Table Deep Dive](#table-deep-dive)
6. [Customization Patterns](#customization-patterns)

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
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | Visual style |
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
<ca-button size="thin">Thin</ca-button>
<ca-button size="full">Full Width</ca-button>

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

**Events:** `ca-change` — `{ value: string }`

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

**Events:** `ca-change` — single: `{ value }`, range: `{ startDate, endDate }`

```html
<!-- Single date -->
<ca-datepicker label="Start date" placeholder="Pick a date"></ca-datepicker>

<!-- Date range -->
<ca-datepicker label="Trip dates" mode="range" placeholder="Select range"></ca-datepicker>

<!-- Constrained range -->
<ca-datepicker label="Booking" min-date="2026-03-01" max-date="2026-12-31"></ca-datepicker>
```

---

### Badge

`<ca-badge>` — Status indicator, counter, or dot badge.

| Property | Type | Default |
|----------|------|---------|
| `variant` | `'default' \| 'success' \| 'warning' \| 'danger'` | `'default'` |
| `size` | `'sm' \| 'md'` | `'md'` |
| `dot` | `boolean` | `false` |

```html
<ca-badge>3</ca-badge>
<ca-badge variant="success">Active</ca-badge>
<ca-badge variant="danger">5</ca-badge>
<ca-badge variant="warning">!</ca-badge>
<ca-badge size="md">12</ca-badge>
<ca-badge dot></ca-badge>
<ca-badge dot variant="success"></ca-badge>
<ca-badge dot variant="danger"></ca-badge>
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
<ca-link href="/terms" type="legal" size="small">Terms of Service</ca-link>
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

```html
<!-- With image -->
<ca-avatar name="Jane Doe" src="https://i.pravatar.cc/80?img=1" size="lg"></ca-avatar>

<!-- Initials fallback -->
<ca-avatar name="John Smith" size="md"></ca-avatar>

<!-- With status indicator -->
<ca-avatar name="Alice" status="online"></ca-avatar>
<ca-avatar name="Bob" status="away"></ca-avatar>
<ca-avatar name="Carol" status="offline"></ca-avatar>
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

```html
<ca-progress-bar value="75" max="100" show-label></ca-progress-bar>
<ca-progress-bar value="37" max="60" show-label label-suffix="times"></ca-progress-bar>
<ca-progress-bar value="50" max="100" size="md" show-label></ca-progress-bar>
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

### Types

```typescript
interface TableColumn {
  key: string;                // Property key in row data
  heading: string;            // Column header text
  type?: 'text' | 'bold-text' | 'badge' | 'toggle' | 'progress' | 'custom';
  width?: string;             // CSS width, e.g. '200px', 'minmax(120px, 1fr)'
  sortable?: boolean;
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

Enable sorting on individual columns with `sortable: true`. The table emits `ca-sort` events — you handle the actual sort logic:

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
