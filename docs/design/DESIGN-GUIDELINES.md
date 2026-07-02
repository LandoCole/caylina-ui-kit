# Caylina Design System — v2 Guidelines

Status: **current**. Supersedes the v1 tokens shipped in `@caylina/ui-kit`.
Companion files: `tokens.css` (drop-in token replacement), `Caylina UI Kit.dc.html` (live visual reference — foundations + every component, light & dark).

---

## 1. Direction

Caylina v2 is a crisp, dense, information-first system for dashboards and workflow tools: a restrained periwinkle accent, cool neutral surfaces, sharp geometry, and a tight elevation scale. It reads as enterprise software, not a marketing site — legibility and density beat decoration.

**Principles**
- Foundations before components. Every component is built only from tokens below — no one-off colors, radii, or shadows in component code.
- Sharp over soft. Radii top out at 12px; most controls use 4–6px.
- Neutral-cool, not neutral-warm. Grays lean blue/gray, never beige.
- One accent family. Periwinkle (`--ca-color-primary`) is the only saturated brand color; everything else is neutral or semantic (success/warning/danger).
- Light and dark are equally first-class — every token has a dark-mode value, not just an inverted filter.

---

## 2. Color

### Brand
| Token | Light | Dark | Use |
|---|---|---|---|
| `--ca-color-primary` | `#4B5FC6` | `#8093EA` | Primary actions, active/selected states, links-as-accent |
| `--ca-color-primary-hover` | `#4152B0` | `#909FEE` | Hover state of primary-filled elements |
| `--ca-color-primary-pressed` | `#39499C` | `#7183E0` | Active/pressed state |
| `--ca-color-primary-tint` | `#EEF0FB` | `rgba(128,147,234,.15)` | Selected-row / info-banner backgrounds |
| `--ca-color-on-primary` | `#FFFFFF` | `#0E1220` | Text/icons on a filled primary surface |
| `--ca-color-link` | `#4152B0` | `#A5B4FC` | Inline text links |

### Neutrals & surfaces
`--ca-bg-page` → app canvas · `--ca-surface` → cards/panels · `--ca-surface-hover` / `--ca-surface-active` → interactive states · `--ca-surface-elevated` → modals/drawers/menus. `--ca-text-primary` / `-secondary` / `-muted` step down in emphasis; never use raw grays.

### Semantic
`--ca-color-success` / `--ca-color-warning` / `--ca-color-danger` are icon/dot colors. Their `-bg` / `-fg` pairs (`--ca-success-bg` + `--ca-success-fg`, etc., plus `--ca-info-bg/-fg`) are for badges, callouts, and toasts — always use the pair together, never the solid color as a large fill (fails contrast).

### Domain color (PM status & priority)
Status (`todo` / `in-progress` / `done`) and priority (`urgent` / `high` / `medium` / `low`) each ship a base color + tinted `-bg`/`-fg` pair, unchanged from v1. These are data semantics, not brand — don't repurpose them for generic UI.

**Rule:** never hardcode a hex in product code. If a token doesn't exist for the case you need, add one to `tokens.css` rather than inlining.

---

## 3. Typography

Font stack: **Inter** (UI + display), **JetBrains Mono** (labels, metadata, code, token names). Only weights 400 / 450 / 500 / 600 / 700 are loaded — Inter's variable weight 450 ("book") is used deliberately for body copy, sitting between regular and medium for slightly richer text at small sizes.

Prefer the **role tokens** over raw size/weight combinations:

| Role token | Size / weight | Use |
|---|---|---|
| `--ca-type-display` | 34px / 600, −0.025em | Page-level H1 |
| `--ca-type-heading` | 20px / 600, −0.015em | Section H2 |
| `--ca-type-subheading` | 16px / 600, −0.01em | Card/module titles |
| `--ca-type-body` | 14px / 450 | Default body & UI text |
| `--ca-type-caption` | 13px / 450 | Secondary/supporting text |
| `--ca-type-label` | 11px / 600, mono, +0.08em, uppercase | Eyebrows, table headers, metadata tags |

Raw scale tokens (`--ca-font-size-xs` … `-2xl`, `--ca-font-weight-*`) remain available for cases the role tokens don't cover.

---

## 4. Spacing, radius, elevation

**Spacing** — two equivalent scales, use whichever reads clearer at the call site: t-shirt (`--ca-space-xs/sm/md/lg/xl` = 4/8/16/24/32px) or numeric (`--ca-space-0-5` … `--ca-space-8`) for finer control.

**Radius** — sharp and consistent:
`--ca-radius-xs` 2px (checkbox) · `-sm` 4px (buttons, inputs, chips-square) · `-md` 6px (cards, dropdowns) · `-lg` 8px (panels, modals) · `-xl` 12px (large surfaces) · `-full` (pills, avatars, toggles). `--ca-radius-button` = 4px is the canonical control radius; don't override per-component.

**Elevation** — three tight, layered shadow steps (`sm`/`md`/`lg`) plus two purpose-built shadows (`-menu` for dropdowns/menus, `-chip` for small floating pills). Dark mode shadows are pure black at higher opacity, not colored — glow effects are not part of this system.

---

## 5. Motion

Two transition tokens only: `--ca-transition-fast` (0.15s, hover/press states) and `--ca-transition-normal` (0.2s, expand/collapse, tab indicators, toggle travel). Easing is always `ease` — no springs, no bounce. Loading states use `ca-spin` (circular spinners) or `ca-pulse` (skeletons, dot-loaders).

---

## 6. Dark mode

Activate with `[data-theme="dark"]` on `<html>` — every token flips via the CSS layer, no component code branches on theme. Dark isn't "light, inverted": surfaces step up in lightness with depth (`page` `#0B0C0F` → `surface` `#131519` → `elevated` `#1A1D22`), text uses reduced-opacity white rather than flat gray, and primary shifts lighter (`#8093EA`) to hold contrast on dark surfaces.

---

## 7. v1 → v2 token diff

Token **names** are unchanged (drop-in for existing components). Notable value changes:

- Primary hue: `#728EC7` (muted blue) → `#4B5FC6` (richer periwinkle); added `--ca-color-primary-hover` as a new intermediate state.
- Neutrals shifted cooler: page `#F4F4F5→#FAFAFB`, text-primary `#1A1A1A→#16181D`, borders lightened (`--ca-border-strong` `#B0B0B0→#D5D7DC`) for a quieter, less boxy grid.
- Type: `Roboto`/`Poppins` → `Inter` throughout; added role-based `--ca-type-*` tokens.
- Radius scale sharpened: `lg` 10px→8px, `xl` 14px→12px, button radius 8px→4px.
- Shadows retuned cooler/tighter; added `--ca-shadow-focus` and `--ca-shadow-chip` as explicit tokens.
- Disabled state redesigned: light muted surface + muted text, replacing the v1 solid-gray-bg/white-text pattern.
- `--ca-toggle-active` now always resolves to `--ca-color-primary` (v1 had an inconsistent hardcoded green in dark mode).
- New general-purpose `-bg`/`-fg` pairs added for success/warning/danger/info (badges, callouts, toasts) — previously only PM status/priority had this pattern.
- PM status and priority palettes are **unchanged** — intentionally left out of this refresh.

---

## 8. Reference

See `Caylina UI Kit.dc.html` for the full visual foundation + component reference (color scales, type scale, spacing/radius/elevation swatches, and every component in both themes). Use it as the source of truth for pixel values when `tokens.css` and the guide disagree.
