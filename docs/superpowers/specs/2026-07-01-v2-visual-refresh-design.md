# Caylina UI Kit — v2 Visual Refresh (Design Spec)

Date: 2026-07-01
Status: **approved (scope: full refresh)**

## 1. Goal

Apply the Caylina **v2 "Refresh"** visual direction (restrained periwinkle accent,
cool neutral surfaces, sharp geometry, tight/layered elevation, Inter + JetBrains
Mono) to the `@caylina/ui-kit` Lit component library.

**Hard constraint: this is a UI-only refresh and must stay 100% backwards compatible.**
No changes to any component's public API — no renamed/added/removed custom-element
tags, attributes, properties, slots, CSS-shadow-parts contracts, or events. Only
internal styling (the values components resolve from design tokens) changes.

## 2. Source of truth

Three design sources are imported from the Claude Design project
"Caylina UI kit refresh" and saved into the repo as the reference of record:

- `src/tokens.css` — v2 drop-in token file (replaces v1; **identical property names**).
- `docs/design/DESIGN-GUIDELINES.md` — principles, color/type/spacing/radius/elevation
  rules, and the v1→v2 diff.
- `docs/design/Caylina UI Kit.dc.html` — live visual reference (foundations + every
  component, light & dark). Per the guidelines: **the `.dc.html` is the source of
  truth for pixel values when the token file and the guide disagree.**

## 3. Architecture of the refresh

The refresh is designed as a **token-value swap**. v2 keeps every v1 custom-property
name and only changes values (plus a handful of net-new tokens). Because the library
is already token-pure — audit shows the only hex literals in component code are
`var(--token, #fallback)` fallbacks or genuine data-domain colors (chart palette,
color-picker swatches, avatar auto-colors) — swapping `tokens.css` refreshes the
majority of all 59 components automatically.

The remaining work is adopting the **net-new v2 tokens** that components can't pick
up from a value swap alone. Everything below is internal styling; no public surface
changes.

### 3.1 Foundation (broad, low-risk)

- **F1.** Replace `src/tokens.css` with the v2 file. Rebuild `dist/tokens.css`.
- **F2.** Update the demo host `index.html` `<link>` fonts: remove
  `Roboto` / `Poppins` / `Inconsolata`; add
  `Inter:wght@400;450;500;600;700` and `JetBrains Mono:wght@400;500;600`.
  (Components reference the family via `--ca-font-family*`; only the host loads the
  webfont. Consumer docs in GUIDE.md updated to match.)

### 3.2 New-token adoption (per-component, backwards-compatible internals)

- **A1 — on-primary text.** Replace `--ca-color-white` with `--ca-color-on-primary`
  **only where it is foreground (text/icon/checkmark) on a `--ca-color-primary`
  fill.** In light mode both are `#FFFFFF` (no visual change); in v2 dark mode
  on-primary is `#0E1220`, so periwinkle-filled controls get correct dark text.
  Genuine whites (e.g. a 2px avatar-group ring against the surface) are left alone —
  this requires per-usage judgment, not a blind replace.

  Candidate files (each `--ca-color-white` usage classified individually):
  `button.ts`, `split-button.ts`, `toggle.ts`, `checkbox.ts`, `chip.ts`,
  `map-chip.ts`, `label-selector.ts`, `assignee-selector.ts`, `multi-select.ts`,
  `context-menu.ts`, `bulk-action-bar.ts`, `time-log.ts`, `comment-thread.ts`,
  `process-card.ts`, `empty-state.ts`, `table.ts`, `avatar.ts`, `gantt-chart.ts`.

- **A2 — raw `#fff` on colored fills** → `--ca-color-on-primary` where the fill is
  primary, or the matching semantic `-fg` token otherwise:
  `eta-range.ts:140`, `kanban-card.ts:70`, `notification-center.ts:70`,
  `task-table.ts:55`, `gantt-chart.ts:170`, `label-selector.ts:58,255`,
  `datepicker.ts:53` (`--_selected-color` fallback `#ffffff` → on-primary).
  Left as data-domain: `chart.ts` (SVG strokes/labels), `color-picker.ts`
  (`#ffffff`/`#000000` default swatch value + placeholder text).

- **A3 — primary hover intermediate.** Where `--ca-color-primary-pressed` is
  currently used for the hover state, move hover to the new
  `--ca-color-primary-hover` and reserve `-pressed` for the active/pressed state:
  `button.ts`, `split-button.ts`, `time-log.ts`, `comment-thread.ts`.

- **A4 — type roles & semantic pairs (where it matters).** Adopt `--ca-type-*`
  role tokens and the new `--ca-success-bg/-fg` / `-warning-` / `-danger-` /
  `-info-` pairs in composite components that currently compose raw size/weight or
  hardcode semantic tints (e.g. `callout.ts`, `badge.ts`, `empty-state.ts`,
  `toast.ts`, `card.ts` titles). Applied only where it improves fidelity to the
  `.dc.html`; not a mechanical sweep.

### 3.3 Visual parity pass

For each touched component, verify against the `.dc.html` in **both** themes:
focus rings use `--ca-shadow-focus`; control heights/radii match; menu/popover
surfaces use `--ca-shadow-menu`; small floating pills use `--ca-shadow-chip`.
Fix only genuine gaps; do not restructure markup.

## 4. Out of scope

- No public API changes of any kind (backwards-compatibility constraint).
- PM **status** and **priority** palettes are intentionally unchanged (v2 keeps them).
- No new components; no markup restructuring beyond what a token/value swap requires.
- Data-domain colors (chart series, color-picker swatches, avatar auto-color hashing)
  stay as-is.

## 5. Verification

- Build succeeds (`npm run build`); `dist/tokens.css` regenerated.
- Every touched component reviewed against `.dc.html` in light **and** dark
  (`[data-theme="dark"]` on `<html>`).
- Spot-check backwards compatibility: no diffs to exported tag names, attributes,
  properties, or events; existing `index.html` demos render unchanged structurally.
- Primary-filled controls show correct on-primary text in dark mode.

## 6. Risks

- **`--ca-color-white` over-replacement.** Mitigated by per-usage classification
  (A1) — only foreground-on-primary is swapped.
- **Font swap affects consumers.** The kit only names the family; hosts load the
  webfont. GUIDE.md documents the required font links so consumers update too.
- **`dist/` drift.** Rebuild dist and commit so CDN/direct consumers get v2.
