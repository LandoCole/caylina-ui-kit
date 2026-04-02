# `<ca-page-nav>` — Page Anchor Navigation Component

## Overview

A table-of-contents / anchor navigation component for in-page section navigation. Renders a collapsible list of page sections where clicking an item scrolls to that section. Tracks the currently visible section via IntersectionObserver and highlights it.

Use cases: documentation pages, settings pages, long-form content with grouped sections.

## Data Model

```ts
interface PageNavItem {
  id: string;       // matches target element's id attribute on the page
  label: string;
  children?: PageNavItem[];  // sub-sections, one level deep
}
```

## Component API

**Tag:** `<ca-page-nav>`

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `items` | `PageNavItem[]` | `[]` | Section list with optional children |
| `activeId` | `string` | `''` | Read-only, reflects currently visible section |
| `scrollOffset` | `number` | `0` | Pixel offset for fixed/sticky headers |
| `scrollBehavior` | `'smooth' \| 'auto'` | `'smooth'` | Scroll behavior on click |

### Events

| Event | Detail | Description |
|---|---|---|
| `ca-navigate` | `{ id: string }` | Fired when user clicks an item |

## Behavior

### Collapsing

- Sections with children are collapsed by default.
- Clicking a parent section expands its children and scrolls to that section.
- Clicking an already-expanded parent collapses its children (no re-scroll).
- Accordion-style: expanding one section collapses any other expanded section.

### Active Tracking

- IntersectionObserver watches all section IDs referenced in `items`.
- The topmost visible section is marked active.
- If a sub-section becomes active, its parent auto-expands.
- Active state is reflected via the `activeId` property.

### Scroll-To

- Clicking any item (parent or child) scrolls to the element matching `id`.
- Uses `window.scrollTo()` targeting `element.getBoundingClientRect().top + window.scrollY - scrollOffset`.
- Default scroll behavior is `smooth`.

## Visual Design

Consistent with existing caylina-ui-kit component styling.

### Parent Items
- Font: 14px, weight 500
- Color: `--ca-text-secondary`
- Padding: 10px 12px
- Border-radius: `--ca-radius-md`
- Chevron: 16px chevron-down icon on the right, rotates 180deg when expanded

### Child Items
- Font: 12px, weight 500
- Indented 24px from parent
- Same padding/radius pattern as parent

### Active State
- Color: `--ca-text-primary`
- 2px left border in `--ca-color-primary`
- Applied to both parent and child items

### Hover
- Background: `--ca-surface-hover`

### Transitions
- Children expand/collapse with ~150ms slide animation
- Chevron rotation: 200ms ease

### Container
- Transparent background — works in sidebars, cards, or inline on page
- Font family: `var(--ca-font-family)`

## File Location

`src/lit/page-nav.ts`

Export from `src/index.ts` as part of the kit.
