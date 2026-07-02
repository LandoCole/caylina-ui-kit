# `<ca-eta-range>` Component Design

## Overview

A Lit web component that displays ETA (earliest/latest) date ranges organized by period (monthly, quarterly, semi-annual, annual), with toggleable timeline and list views. Designed for read-only display within a `<ca-card>`.

## Data Interface

```typescript
export interface EtaPeriod {
  label: string;          // Display label: "Q1", "Jan", "H1", "2026"
  periodStart: string;    // ISO date — period boundary start, e.g. "2026-01-01"
  periodEnd: string;      // ISO date — period boundary end, e.g. "2026-03-31"
  earliestDate: string;   // ISO date — earliest ETA, e.g. "2026-01-15"
  latestDate: string;     // ISO date — latest ETA, e.g. "2026-02-20"
}

export type EtaFrequency = 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
```

## Properties

| Property    | Type                       | Default          | Description                    |
| ----------- | -------------------------- | ---------------- | ------------------------------ |
| `periods`   | `EtaPeriod[]`              | `[]`             | Period data to display         |
| `frequency` | `EtaFrequency`             | `'quarterly'`    | Frequency label shown in header|
| `view`      | `'timeline' \| 'list'`     | `'timeline'`     | Active view mode               |
| `heading`   | `string`                   | `'ETA Ranges'`   | Card heading text              |

## Views

### Timeline View

Each period renders as:

1. **Header row**: Period label (e.g. "Q1 '26") + period boundary dates in muted text (e.g. "Jan 1 – Mar 31")
2. **Bar row**: Full-width background bar representing the entire period, with a colored gradient bar showing the ETA range position within it
3. **Trailing duration**: Right-aligned day count (e.g. "36d"), always in days

Bar positioning is calculated proportionally:
- `leftPercent = (earliestDate - periodStart) / (periodEnd - periodStart) * 100`
- `rightPercent = (1 - (latestDate - periodStart) / (periodEnd - periodStart)) * 100`

The bar uses a min-width to ensure dates inside the bar remain readable even for short ranges.

Periods are separated by subtle dividers.

### List View

Each period renders as a single row:
- Period badge (label in `--ca-color-primary` with tinted background)
- Earliest date (with "Earliest" micro-label above)
- Arrow separator
- Latest date (with "Latest" micro-label above)
- Trailing day count

Rows are separated by bottom borders.

## View Toggle

A small pill toggle in the top-right of the header area:
- Two segments: timeline icon (bar chart) and list icon (horizontal lines)
- Active segment has dark background with white text
- Clicking toggles the `view` property
- Emits `ca-view-change` custom event: `{ detail: { view: 'timeline' | 'list' }, bubbles: true, composed: true }`

## Styling

- All styling uses existing `--ca-*` design tokens (colors, typography, spacing, radii)
- Bar gradient: `linear-gradient(90deg, var(--ca-color-primary), color-mix(in srgb, var(--ca-color-primary) 70%, white))`
- Bar background track: uses `--ca-surface-active`
- Period labels: `--ca-text-primary` at `--ca-font-size-xs`, `font-weight: 590`
- Period boundaries: `--ca-text-muted` at `10px`
- Duration text: `--ca-text-secondary` at `--ca-font-size-xs`
- Dates inside bar: white, `10px`, `font-weight: 500`
- Dividers: `--ca-border` or `--ca-divider`
- Dark mode: fully supported via existing token overrides, no additional dark-mode CSS needed
- Component has no border/card styling itself — intended to be composed inside `<ca-card>`

## Date Formatting

- Dates inside the timeline bar: short format "Jan 15", "Feb 20" (month abbreviated + day)
- Period boundaries: short format "Jan 1 – Mar 31"
- List view dates: full format "Jan 15, 2026"
- Duration: always in days, calculated as `Math.round((latestDate - earliestDate) / 86400000)` + "d"
- Uses existing `date-utils.ts` for parsing ISO strings; adds a short date formatter

## Events

| Event             | Detail                          | Description              |
| ----------------- | ------------------------------- | ------------------------ |
| `ca-view-change`  | `{ view: 'timeline' \| 'list' }`| Fired when view toggles  |

## File Location

- Component: `src/lit/eta-range.ts`
- Export from: `src/index.ts` (component + `EtaPeriod` and `EtaFrequency` types)
- Demo: add section to `index.html` with sample quarterly data

## Dependencies

- `lit` (existing)
- `src/lit/date-utils.ts` (existing — for `parseISODateString`, `MONTH_NAMES_SHORT`)
- No new external dependencies

## Component Patterns

Follows existing Caylina conventions:
- `@customElement('ca-eta-range')` decorator
- `@property()` for public API, `@state()` for internal state
- Static `css` template literal for scoped styles
- `bubbles: true, composed: true` on all custom events
- TypeScript interfaces exported from `index.ts`
- Global `HTMLElementTagNameMap` augmentation
