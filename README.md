# Caylina UI Kit

A lightweight, CDN-ready web component library built with [Lit 3](https://lit.dev). Drop it into any HTML page — no build step required.

## Getting Started

Add the tokens stylesheet and component bundle to your HTML:

```html
<link rel="stylesheet" href="https://unpkg.com/@caylina/ui-kit/tokens.css">
<script type="module" src="https://unpkg.com/@caylina/ui-kit/caylina-ui.js"></script>
```

Then use any component:

```html
<ca-button variant="primary">Get Started</ca-button>
<ca-toggle label="Dark mode"></ca-toggle>
<ca-chip>Tag</ca-chip>
```

### Dark Mode

Toggle dark mode by setting `data-theme="dark"` on the `<html>` element:

```js
document.documentElement.setAttribute('data-theme', 'dark');
```

All components and tokens respond automatically.

## Components

| Component | Tag | Description |
|-----------|-----|-------------|
| Accordion | `<ca-accordion>` | Expandable content sections |
| Avatar | `<ca-avatar>` | User avatar with initials fallback |
| Badge | `<ca-badge>` | Status indicators and counters |
| Button | `<ca-button>` | Primary, secondary, and tertiary buttons |
| Callout | `<ca-callout>` | Highlight and info banners |
| Card | `<ca-card>` | Content container with padding options |
| Card Button | `<ca-card-button>` | Selectable card with icon |
| Checkbox | `<ca-checkbox>` | Checkbox with label and sizes xs–xl |
| Chip | `<ca-chip>` | Selectable pill tag (sm/md) |
| Date Picker | `<ca-datepicker>` | Single date and range picker |
| Divider | `<ca-divider>` | Horizontal rule with spacing |
| Input | `<ca-input>` | Text input with label and validation |
| Link | `<ca-link>` | Subtle and legal link styles |
| Map Chip | `<ca-map-chip>` | Map marker chip with icon-after slot |
| Menu | `<ca-menu>` | Dropdown menu with sections |
| Modal | `<ca-modal>` | Dialog with header, body, footer slots |
| Pill Tabs | `<ca-pill-tabs>` | Pill-style tab navigation |
| Radio Button | `<ca-radio>` | Radio with label and sizes xs–xl |
| Select | `<ca-select>` | Dropdown select |
| Side Nav | `<ca-sidenav>` | Sidebar navigation |
| Spinner | `<ca-spinner>` | Loading indicator (dots/circular) |
| Split Button | `<ca-split-button>` | Button with dropdown actions |
| Textarea | `<ca-textarea>` | Multi-line input with character count |
| Toast | `<ca-toast-container>` | Notification toasts (success/error/info/warning) |
| Toggle | `<ca-toggle>` | Switch toggle with label |
| Tooltip | `<ca-tooltip>` | Hover tooltip |
| Underline Tabs | `<ca-underline-tabs>` | Tab navigation with optional icons |

## Programmatic API

### Toast

```js
import { toast } from '@caylina/ui-kit';

toast('Saved successfully', { type: 'success' });
toast('Something went wrong', { type: 'error', duration: 8000 });
```

## Install via npm

```bash
npm install @caylina/ui-kit
```

```js
import '@caylina/ui-kit';
```

## Author

**Landon Thornton**

## License

MIT
