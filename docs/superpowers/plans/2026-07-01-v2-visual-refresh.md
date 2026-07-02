# Caylina v2 Visual Refresh — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the Caylina v2 "Refresh" visual direction to the `@caylina/ui-kit` Lit library and make table nested rows recursive — all fully backwards compatible.

**Architecture:** The refresh is a token-value swap: v2 `tokens.css` keeps every v1 property name, so dropping it in refreshes all token-pure components. Remaining work adopts net-new v2 tokens (`on-primary`, `primary-hover`, semantic `-bg/-fg`, type roles) per component, and makes `ca-table` child-row rendering recursive.

**Tech Stack:** Lit 3, TypeScript 5, Vite 5. No test framework — verification is `npm run build` (Vite build + `tsc` type-check) and visual review of `index.html` in light + dark.

## Global Constraints

- **100% backwards compatible.** No changes to any custom-element tag, attribute, property, slot, CSS-part, or event. Styling internals only.
- **No hardcoded hex in component code.** Use tokens; add to `tokens.css` if a token is missing (spec §2).
- **Both themes are first-class.** Verify every touched component in light and `[data-theme="dark"]`.
- **PM status & priority palettes unchanged.** Do not restyle them.
- **Spec:** `docs/superpowers/specs/2026-07-01-v2-visual-refresh-design.md`. Reference: `docs/design/Caylina UI Kit.dc.html` (source of truth for pixel values).

---

## Task 1: Import design sources + v2 tokens

**Files:**
- Create: `docs/design/DESIGN-GUIDELINES.md`, `docs/design/Caylina UI Kit.dc.html`, `docs/design/support.js`
- Modify: `src/tokens.css` (replace with v2)

**Interfaces:**
- Produces: v2 token values on `:root` and `[data-theme="dark"]`; new tokens `--ca-color-primary-hover`, `--ca-color-primary-tint`, `--ca-color-primary-tint-strong`, `--ca-color-on-primary`, `--ca-type-display|heading|subheading|body|caption|label`, `--ca-success-bg/-fg`, `--ca-warning-bg/-fg`, `--ca-danger-bg/-fg`, `--ca-info-bg/-fg`, `--ca-shadow-focus`, `--ca-shadow-chip`, `--ca-color-primary-tint`, `--ca-radius-button`, `--ca-control-height-*`.

- [ ] **Step 1:** Save the three design sources into `docs/design/` (from the Claude Design project, already fetched).
- [ ] **Step 2:** Replace `src/tokens.css` with the v2 file verbatim.
- [ ] **Step 3:** `npm run build` → expect success (tokens.css is copied/emitted; no TS involved yet).
- [ ] **Step 4:** Commit: `Import v2 design sources; drop in v2 tokens.css`.

## Task 2: Font links + host wiring

**Files:**
- Modify: `index.html` (font `<link>`, line ~9), `GUIDE.md` (theming/fonts section)

- [ ] **Step 1:** Replace the Google Fonts `<link>` (Roboto/Poppins/Inconsolata) with `Inter:wght@400;450;500;600;700` + `JetBrains+Mono:wght@400;500;600`.
- [ ] **Step 2:** Update GUIDE.md font/setup snippet to the same links so consumers match.
- [ ] **Step 3:** `npm run dev`, load `index.html`, confirm Inter renders (visual).
- [ ] **Step 4:** Commit: `Switch host + docs fonts to Inter + JetBrains Mono`.

## Task 3: on-primary text (A1) — primary-filled controls

**Files (each `--ca-color-white` usage classified individually — swap to `--ca-color-on-primary` ONLY where it is foreground on a `--ca-color-primary` fill; leave genuine whites e.g. avatar rings):**
- Modify: `button.ts`, `split-button.ts`, `toggle.ts`, `checkbox.ts`, `chip.ts`, `map-chip.ts`, `label-selector.ts`, `assignee-selector.ts`, `multi-select.ts`, `context-menu.ts`, `bulk-action-bar.ts`, `time-log.ts`, `comment-thread.ts`, `process-card.ts`, `empty-state.ts`, `table.ts`, `avatar.ts`, `gantt-chart.ts`

- [ ] **Step 1:** For each file, `grep -n "ca-color-white"`, inspect context; where the rule sets text/icon/checkmark color on a primary background, change `var(--ca-color-white)` → `var(--ca-color-on-primary)`. Leave rings/borders/genuine-white as-is.
- [ ] **Step 2:** `npm run build` → expect success.
- [ ] **Step 3:** Visual: in `index.html` dark mode, primary buttons/chips/toggles show dark (`#0E1220`) text/knob, not white.
- [ ] **Step 4:** Commit: `Use on-primary token for text on primary fills (dark-mode contrast)`.

## Task 4: raw #fff on colored fills (A2)

**Files:** `eta-range.ts:140`, `kanban-card.ts:70`, `notification-center.ts:70`, `task-table.ts:55`, `gantt-chart.ts:170`, `label-selector.ts:58,255`, `datepicker.ts:53`
**Leave as data-domain:** `chart.ts`, `color-picker.ts`.

- [ ] **Step 1:** Replace `color:#fff` / fallback `#ffffff` with `var(--ca-color-on-primary)` where the fill is primary; otherwise the matching semantic `-fg` token. `datepicker.ts:53` `--_selected-color` fallback → `var(--ca-color-on-primary)`.
- [ ] **Step 2:** `npm run build` → success.
- [ ] **Step 3:** Visual check in both themes.
- [ ] **Step 4:** Commit: `Replace raw #fff on colored fills with tokens`.

## Task 5: primary hover intermediate (A3)

**Files:** `button.ts`, `split-button.ts`, `time-log.ts`, `comment-thread.ts`

- [ ] **Step 1:** In `:hover` rules that use `--ca-color-primary-pressed`, change to `--ca-color-primary-hover`; keep `--ca-color-primary-pressed` for `:active`. If no `:active` rule exists, add one using `-pressed`.
- [ ] **Step 2:** `npm run build` → success.
- [ ] **Step 3:** Visual: primary button hover is the intermediate shade, press is darker.
- [ ] **Step 4:** Commit: `Adopt primary-hover intermediate for hover; pressed for active`.

## Task 6: type roles + semantic pairs + focus/chip shadows (A4 + parity)

**Files:** `callout.ts`, `badge.ts`, `empty-state.ts`, `toast.ts`, `card.ts` (+ any composite whose focus ring should use `--ca-shadow-focus`, menus `--ca-shadow-menu`, floating pills `--ca-shadow-chip`)

- [ ] **Step 1:** Where a composite hardcodes semantic tints or composes raw size/weight for a titled role, adopt `--ca-success-bg/-fg` (etc.) pairs and `--ca-type-*` roles. Only where it improves fidelity to the `.dc.html`; do not restructure markup.
- [ ] **Step 2:** Ensure focus states use `var(--ca-shadow-focus)`; dropdown/menu surfaces `var(--ca-shadow-menu)`; small floating pills `var(--ca-shadow-chip)`.
- [ ] **Step 3:** `npm run build` → success.
- [ ] **Step 4:** Visual parity check against `.dc.html`, both themes.
- [ ] **Step 5:** Commit: `Adopt type-role/semantic-pair tokens and explicit focus/chip shadows`.

## Task 7: Recursive nested table rows (§3.4)

**Files:**
- Modify: `src/lit/table.ts` (replace single-level child rendering with recursive tree; ~lines 1516-1521, 1659-1664, 1762-1776, CSS `.child-indent` ~494-496)
- Modify: `src/lit/task-table.ts` (make internal all-rows/select-all helper recursive; ~line 121)
- Modify: `index.html` (extend `#demo-table-expand` with a grandchild level, ~line 605)

**Interfaces:**
- Consumes: existing `TableRow.children?: TableRow[]`, `expandable`, `expandedIds`, `ca-expand`.
- Produces: `private _renderRowTree(row: TableRow, depth: number, index: number, hasActions: boolean): TemplateResult` — renders a row and, when `expandedIds.includes(row.id)`, recurses into `row.children` at `depth+1`. Public API unchanged.

- [ ] **Step 1:** Add a `--_child-indent-step` concept: replace the fixed `.child-indent { padding-left: 28px }` usage with depth-driven inline `padding-left: calc(12px + var(--_depth,0) * 16px)` on the first data cell (level-1 = 28px, preserving current look). Keep `.child-row` background styling.
- [ ] **Step 2:** Implement `_renderRowTree(row, depth, index, hasActions)`: render the row markup (reusing the current `_renderRow` body) with `child-row` class when `depth > 0`, an expand toggle whenever `row.children?.length`, first-cell `style="--_depth:${depth}"`, then when expanded map `row.children` through `_renderRowTree(child, depth+1, ...)`.
- [ ] **Step 3:** Replace both call sites (`_renderGrid` ~1659 and `_renderGroupedGrid` ~1516) to call `_renderRowTree(row, 0, i, hasActions)` and drop the separate one-level `_renderChildRow` branch. Remove now-dead `_renderChildRow` (or keep as thin wrapper if referenced elsewhere — verify with grep).
- [ ] **Step 4:** In `task-table.ts`, make the `_allRows`/row-collection getter recurse through `children` at all depths (replace `if (r.children) rows.push(...r.children)` with a recursive flatten).
- [ ] **Step 5:** Extend `index.html` `#demo-table-expand` data so one child has its own `children` (grandchildren), and add that id to nothing by default (collapsed) — expanding shows multi-level.
- [ ] **Step 6:** `npm run build` → success (type-check clean).
- [ ] **Step 7:** Visual: expand a parent, then expand a child — grandchildren render indented one level deeper; single-level tables look identical to before.
- [ ] **Step 8:** Commit: `Make ca-table nested rows recursive to arbitrary depth`.

## Task 8: Rebuild dist + final verification

**Files:** `dist/` (regenerated)

- [ ] **Step 1:** `npm run build`; confirm `dist/caylina-ui.js` and `dist/tokens.css` regenerated with v2 values.
- [ ] **Step 2:** Grep the whole `src/lit/` for stray raw hex introduced during edits (`grep -rnE "#[0-9A-Fa-f]{3,6}" src/lit | grep -v "var(--"`); confirm only intended data-domain colors remain.
- [ ] **Step 3:** Backwards-compat spot check: `git diff` shows no changes to `@customElement` tags, `@property` names/attributes, or `CustomEvent` names.
- [ ] **Step 4:** Visual pass over `index.html` in both themes: buttons, inputs, selection, badges, chips, avatars, tabs, menu, table (incl. nested), modal/drawer, toast.
- [ ] **Step 5:** Commit: `Rebuild dist for v2; final refresh verification`.

---

## Self-Review

- **Spec coverage:** F1/F2 → Tasks 1–2; A1 → Task 3; A2 → Task 4; A3 → Task 5; A4 + parity → Task 6; §3.4 nested rows → Task 7; dist drift risk → Task 8. All spec sections mapped.
- **Backwards compat:** Task 8 Step 3 explicitly diffs for public-surface changes.
- **No placeholders:** each task names exact files, line anchors, and concrete edits.
- **Type consistency:** `_renderRowTree` signature defined once (Task 7 Interfaces) and used consistently across call sites.
