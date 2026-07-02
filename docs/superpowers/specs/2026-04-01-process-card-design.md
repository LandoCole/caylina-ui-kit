# ca-process-card Component Design

## Overview

A card component for workflow/processing queues. Items move through configurable phases with a top progress bar, step labels, status pills, and an accordion body for slot content. Designed as a generic primitive — the consuming app composes domain-specific content into slots.

**Inspired by:** Document upload/processing queue use case (upload → text extraction → metadata extraction → ready), but intentionally generic.

## Component Tag

`<ca-process-card>`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `{ label: string; key: string }[]` | `[]` | Ordered processing phases |
| `currentStep` | `string \| null` | `null` | Key of the active step. `null` = not started |
| `status` | `'pending' \| 'processing' \| 'complete' \| 'error'` | `'pending'` | Drives progress bar color and card styling |
| `heading` | `string` | `''` | Primary title text (e.g., filename) |
| `subheading` | `string` | `''` | Optional override for secondary text. If empty, auto-generates from status: step label during processing, "Complete" when done, error message on error |
| `expanded` | `boolean` | `false` | Controlled expand/collapse state |
| `size` | `'sm' \| 'md'` | `'md'` | Card density |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `ca-toggle` | `{ expanded: boolean }` | Fired when user clicks header/chevron to toggle |

Accordion coordination (only-one-open-at-a-time) is the parent's responsibility — listen to `ca-toggle` and set `expanded` on the appropriate card. This matches the existing `ca-accordion` pattern.

## Slots

| Slot | Location | Purpose |
|------|----------|---------|
| `icon` | Left side of header | Custom icon (document, image, etc.) |
| `actions` | Right side of header, before chevron | Action buttons, menus |
| `status` | Right side, replaces auto-generated pill | Override the default status pill |
| (default) | Accordion body | Expandable content area — metadata, forms, entity lists, anything |

## Visual Design

### Progress Bar
- 2.5px tall bar spanning the full card width at the top, inside the border-radius.
- Fill width = `(currentStepIndex + 1) / steps.length * 100%`.
- Colors by status:
  - `pending`: empty (`--ca-border` / `#e0e0e0`)
  - `processing`: `--ca-primary` / `#728EC7`, animated pulse on the fill edge
  - `complete`: `--ca-success` / `#15803D`, full width
  - `error`: `--ca-danger` / `#C13515`, stops at the failed step

### Card States (Collapsed)

All collapsed cards show: icon slot, heading, step label (if processing), status pill, chevron. No metadata visible in collapsed state.

**Pending:**
- Entire card at reduced opacity (0.55)
- Empty progress bar
- "Pending" pill (muted gray)

**Processing:**
- Normal opacity
- Blue progress bar fills proportionally
- Animated dot + "Step N of M — {label}" below heading
- No status pill (step label serves this purpose)

**Complete:**
- Green progress bar (full)
- Checkmark + "Complete — review metadata" subtext
- "Ready" pill (green)

**Error:**
- Red progress bar (stops at failed step)
- Error message as subtext
- "Error" pill (red)
- Red-tinted border

### Chevron
- SVG chevron arrow (not a triangle character)
- Points down when collapsed, rotates up when expanded
- Animated rotation (0.2s ease via `--ca-transition-fast`)
- Always visible and clickable on all states

### Expanded State
- Accordion body slides open with CSS grid animation (matching `ca-accordion` pattern: `grid-template-rows: 0fr → 1fr`)
- Separated from header by a 1px border
- Slightly recessed background (`#fcfcfc` light / appropriate dark mode equivalent)
- Contains whatever the consumer puts in the default slot

### Expanding During Processing
- Cards are expandable at any stage, not just when complete
- Partial data can be shown with shimmer/skeleton placeholders for fields still being extracted
- The component itself doesn't manage this — it just opens the slot. The consumer handles showing partial data vs. placeholders.

## Styling

Uses existing design tokens from `tokens.css`:
- `--ca-primary` for processing state
- `--ca-success` for complete state
- `--ca-danger` for error state
- `--ca-text-primary`, `--ca-text-secondary`, `--ca-text-muted` for text
- `--ca-border`, `--ca-surface`, `--ca-surface-elevated` for card surfaces
- `--ca-radius-md` (8px) for card border-radius
- `--ca-transition-fast` (0.15s) for chevron rotation
- `--ca-shadow-sm` for subtle card elevation when expanded

Supports dark mode via `[data-theme="dark"]` on host/parent.

## Architecture

Single file: `src/lit/process-card.ts`

Follows existing kit patterns:
- Extends `LitElement`
- `@customElement('ca-process-card')` decorator
- `@property()` for all props
- Scoped styles via `static styles = css\`...\``
- CSS grid-based accordion animation (same technique as `ca-accordion`)
- Emits `ca-toggle` via `this.dispatchEvent(new CustomEvent(...))`

Registered in `src/index.ts` with the other component imports.

## Implementation Notes

- The progress bar fill percentage is computed from `currentStep`'s index in the `steps` array.
- If `currentStep` doesn't match any key in `steps`, treat as not started (0% fill).
- The step label ("Step N of M — {label}") is derived from the steps array and currentStep.
- Status pill text/color is derived from the `status` prop. The `status` slot allows overriding.
- Chevron rotation uses CSS transform, toggled by the `expanded` prop.
- Accordion animation: wrapper div with `overflow: hidden` and `grid-template-rows` transition, matching `ca-accordion`'s existing pattern.

## Demo / Usage Example

```html
<!-- Basic usage in a document processing queue -->
<ca-process-card
  heading="JPM Offering Memo Doc.pdf"
  status="processing"
  currentStep="extract-text"
  .steps="${[
    { key: 'upload', label: 'Uploading' },
    { key: 'extract-text', label: 'Extracting text' },
    { key: 'extract-metadata', label: 'Extracting metadata' }
  ]}"
>
  <svg slot="icon" ...><!-- document icon --></svg>

  <!-- Accordion body content -->
  <div class="metadata-fields">
    <!-- Consumer renders their own metadata form here -->
  </div>
</ca-process-card>
```

### Accordion coordination (parent manages which card is open)

```html
<div class="document-queue">
  ${this.documents.map((doc, i) => html`
    <ca-process-card
      heading="${doc.filename}"
      status="${doc.status}"
      currentStep="${doc.currentStep}"
      .steps="${this.processingSteps}"
      .expanded="${this.expandedIndex === i}"
      @ca-toggle="${(e) => this.expandedIndex = e.detail.expanded ? i : -1}"
    >
      <!-- slot content -->
    </ca-process-card>
  `)}
</div>
```
