# Caylina Design System — v3 "CA" Guidelines

Status: **current**. Supersedes the v2 periwinkle direction (`DESIGN-GUIDELINES.md`).
Companion files: `../../src/tokens.css` (drop-in token replacement — same custom-property
names, new values), `Caylina UI Kit.dc.html` / `../../index.html` (live visual reference).

This guide translates the **CA Component Library 2024** reference aesthetic (see
`/CA UI Images`) into the Caylina Lit component library. Component names don't map 1:1
between the two systems — the goal is to carry the *general aesthetic*, not to clone
every frame.

---

## 1. Direction

CA-3.0 is an **enterprise, institutional-finance** system: portfolio dashboards,
analytics grids, workflow tools. It reads as considered and authoritative, not playful.
The look is built on four pillars:

1. **A navy + aqua dual accent.** Deep **Navy** (`#0C3980`) is the voice of authority —
   primary buttons, headers, top-level emphasis. **Aqua** (`#3CABC9`) is the voice of
   interaction — anything the user toggles, checks, drags, or selects. Navy commits;
   aqua responds. Never use navy for a checkbox or aqua for a "Save" button.
2. **Uppercase micro-typography.** Buttons, badges, tabs, table headers, field labels,
   and eyebrows are **UPPERCASE, letter-spaced sans**. This tracked-caps treatment is the
   single most recognizable trait of the reference and does more for the aesthetic than
   any color choice.
3. **Sharp geometry.** Corners are near-square: controls at 2px, chips/badges at 3px,
   cards/panels at 4–6px. Nothing is pill-soft except true pills (avatars, toggles,
   status dots).
4. **Restraint in color, generosity in the data palette.** Chrome is neutral grey and
   navy. Saturated color is reserved for **data** — badges, tags, chart series, semantic
   status — drawn from a fixed 14-hue palette.

**Principles**
- Foundations before components. Every component is built only from the tokens in §2–§5 —
  no one-off hexes, radii, or shadows in component code. If a token is missing, add it to
  `tokens.css`; don't inline.
- Navy is authority, aqua is interaction. Keep the two roles disciplined.
- Neutral chrome, colorful data. Grey/navy frame; the 14-hue palette only for data.
- Light and dark are equally first-class — every token has a dark-mode value.

---

## 2. Color

### 2.1 Brand — Navy (authority)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--ca-color-primary` | `#0C3980` | `#5A82D6` | Primary buttons, active/selected chrome, top headers, links-as-accent |
| `--ca-color-primary-hover` | `#476BB3` | `#6E92DE` | Hover of primary-filled elements *(reference "Navy Hover")* |
| `--ca-color-primary-pressed` | `#082C63` | `#4E77CE` | Active/pressed |
| `--ca-color-primary-tint` | `#E9EEF7` | `rgba(90,130,214,.16)` | Selected-row / info-band backgrounds |
| `--ca-color-primary-tint-strong` | `#CFDCEE` | `rgba(90,130,214,.26)` | Stronger selected state |
| `--ca-color-on-primary` | `#FFFFFF` | `#0B1220` | Text/icons on filled navy |
| `--ca-color-link` | `#2A5EA8` | `#9DB6E8` | Inline text links |

### 2.2 Accent — Aqua (interaction)

Aqua is for **interactive selection controls**: checkbox/radio checked state, toggle "on",
slider fill + thumb, active tab underline, date-picker selection, star favorites, and
split/action buttons. It is *not* a substitute for the primary button.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--ca-color-accent` | `#3CABC9` | `#5AC4E0` | Checked/on/selected control state, active tab, slider fill |
| `--ca-color-accent-hover` | `#2F93AE` | `#6ECFE8` | Hover of accent controls |
| `--ca-color-accent-pressed` | `#287A90` | `#4FB6D4` | Pressed *(reference "Aqua Hover")* |
| `--ca-color-accent-tint` | `#E4F3F7` | `rgba(90,196,224,.16)` | Aqua-selected background wash |
| `--ca-color-on-accent` | `#FFFFFF` | `#08202A` | Text/icons on filled aqua |

Component wiring: the control override tokens resolve to accent —
`--ca-checkbox-checked-bg/-border`, `--ca-radio-checked-color`, `--ca-toggle-active`,
and the tab/slider fills all point at `--ca-color-accent`.

### 2.3 Data palette (14 hues)

For badges, tags, chart series, and category color — **never** for chrome. Exact reference
values, exposed as `--ca-palette-*`:

| Name | Token | Hex | · | Name | Token | Hex |
|---|---|---|---|---|---|---|
| Navy | `--ca-palette-navy` | `#0C3980` | · | Turquoise | `--ca-palette-turquoise` | `#26A299` |
| Aqua | `--ca-palette-aqua` | `#3CABC9` | · | Salmon | `--ca-palette-salmon` | `#F26851` |
| Blue Grey | `--ca-palette-blue-grey` | `#83A1C2` | · | Grape | `--ca-palette-grape` | `#716ABA` |
| Purple | `--ca-palette-purple` | `#B55F99` | · | Ruby | `--ca-palette-ruby` | `#9E5A6A` |
| Yellow | `--ca-palette-yellow` | `#FFD800` | · | Lime | `--ca-palette-lime` | `#C9C42D` |
| Green | `--ca-palette-green` | `#63AB64` | · | Medium Blue | `--ca-palette-medium-blue` | `#3C81C3` |
| Orange | `--ca-palette-orange` | `#E78024` | · | Red | `--ca-palette-red` | `#D50000` |

### 2.4 Neutrals & surfaces (reference greyscale)

Greys are **true neutral**, not blue-black. Text tops out at `#333` (Dark Grey), never pure
black. One cool tint (`Blueish Grey #F2F4F7`) is allowed for subtle selected/active surfaces.

| Token | Value | Reference name |
|---|---|---|
| `--ca-bg-page` | `#FAFAFA` | Lightest Grey |
| `--ca-surface` | `#FFFFFF` | White |
| `--ca-surface-hover` | `#F3F3F3` | Hover Grey |
| `--ca-surface-active` | `#F2F4F7` | Blueish Grey |
| `--ca-surface-elevated` | `#FFFFFF` | White |
| `--ca-text-primary` | `#333333` | Dark Grey |
| `--ca-text-secondary` | `#555555` | Muted Grey |
| `--ca-text-muted` | `#919191` | Light Grey |
| `--ca-text-tertiary` | `#AAAAAA` | Icon Grey |
| `--ca-border` / `-input` | `#DDDDDD` | Grey Border |
| `--ca-border-strong` | `#C4C4C4` | — |
| `--ca-divider` | `#E4E4E4` | — |

### 2.5 Semantic (status)

Each has a **solid** base (dark enough for white text — used for toasts) plus a tinted
`-bg`/`-fg` pair (used for badges, callouts, subtle fills). Always use the pair together;
never the tint bg with white text.

| Role | Base (solid) | `-bg` (tint) | `-fg` (text) |
|---|---|---|---|
| success | `--ca-color-success` `#3E8E43` | `#E4F1E5` | `#2F6D34` |
| warning | `--ca-color-warning` `#D9822B` | `#FBEBD9` | `#9A5B12` |
| danger | `--ca-color-danger` `#C6392B` | `#FBE5E2` | `#A32C20` |
| info | `--ca-color-info` `#2E86AB` | `#E3F0F6` | `#1F6285` |

**Rule:** never hardcode a hex in component code. Missing case → add a token.

---

## 3. Typography

Font stack: **Inter** for UI + display (the reference uses a Proxima-Nova-class humanist
sans; Inter is the closest web-safe substitute). JetBrains Mono stays available for genuine
numeric/tabular and code contexts.

**Micro-labels are the signature.** Buttons, badges, tabs, table headers, field labels
(`TITLE HERE`), and eyebrows (`COMPONENT LIBRARY 2024`) are uppercase, letter-spaced sans —
**not** monospace. This is the v2→v3 reversal: labels move from mono back to tracked caps.

Prefer the **role tokens**:

| Role token | Spec | Use |
|---|---|---|
| `--ca-type-display` | 34px / 700, −0.02em | Page H1 |
| `--ca-type-heading` | 20px / 700, −0.01em | Section H2 |
| `--ca-type-subheading` | 16px / 600 | Card/module titles |
| `--ca-type-body` | 14px / 450 | Default body & UI text |
| `--ca-type-caption` | 13px / 450 | Secondary/supporting text |
| `--ca-type-label` | 11px / 700, sans, **+0.07em, uppercase** | Eyebrows, table headers, field labels, badges |
| `--ca-type-button` | 13px / 600, **+0.045em, uppercase** | Button text |

Uppercasing is done in CSS (`text-transform: uppercase`) so content stays readable in the
DOM — never author copy in caps.

---

## 4. Spacing, radius, elevation

**Spacing** — unchanged dual scale: t-shirt (`--ca-space-xs/sm/md/lg/xl` = 4/8/16/24/32)
or numeric (`--ca-space-0-5`…`-8`).

**Radius — sharpened toward the reference's near-square controls:**

| Token | Value | Use |
|---|---|---|
| `--ca-radius-xs` | `2px` | Checkbox |
| `--ca-radius-sm` | `3px` | Badges, chips-square, small tags |
| `--ca-radius-md` | `4px` | Cards, dropdowns, inputs |
| `--ca-radius-lg` | `6px` | Panels, modals |
| `--ca-radius-xl` | `8px` | Large surfaces |
| `--ca-radius-button` | `2px` | **Canonical control radius** — buttons/inputs/selects |
| `--ca-radius-full` | `9999px` | Avatars, toggles, status dots only |

**Elevation** — the reference is nearly flat. Keep the tight `sm`/`md`/`lg` steps plus
`-menu` and `-chip`. Shadows are neutral-black, never colored; no glows. Prefer a `1px`
border over a shadow wherever a border reads.

---

## 5. Motion

Two transitions: `--ca-transition-fast` (0.15s — hover/press) and `--ca-transition-normal`
(0.2s — expand/collapse, tab indicator, toggle travel). Easing is always `ease`. No springs.

---

## 6. Signature components

These carry the CA look. Build others to match their idiom.

- **Button.** UPPERCASE tracked label. Primary = solid **navy**, white text, 2px radius.
  Secondary = white fill, navy text + `--ca-border`. **Split/action** button ("＋ ACTION ▾")
  = solid **aqua**. Danger = solid red. Compact height; sharp corners.
- **Underline tabs.** Text tabs seated on a baseline; the active tab shows a 2px **aqua**
  indicator on the baseline. Labels may be title-case or uppercase.
- **Badge / tag.** Small solid-fill pill, 3px radius, UPPERCASE label. Fill drawn from the
  14-hue data palette or a semantic base.
- **Callout / alert.** Understated: a thick (3px) **colored left border** + text on the page
  surface — success/warning/danger/info from the semantic base. No heavy fill.
- **Toast.** The loud counterpart: **solid semantic fill**, white text, leading status icon,
  trailing close ✕. success green / warning orange / danger red / info blue.
- **Interactive controls** (checkbox, radio, toggle, slider, date-picker) — **aqua** checked/
  on/fill state, sharp boxes, indeterminate = aqua minus.
- **Breadcrumb.** Muted text with `/` separators; current crumb is `--ca-text-primary`
  semibold. (The reference's angled "asset-group" chips are a domain flourish — optional,
  not part of the base component.)

**Brand motif (optional).** Page-level headers in the reference use a faceted triangle
cluster (navy / teal / green / magenta) mirrored in the top corners, an eyebrow
(`COMPONENT LIBRARY 2024`), a large display title, and a metadata row (Last Updated /
Designer / Description). Reserve this for showcase/landing headers, not in-app chrome.

---

## 7. Dark mode

Activate with `[data-theme="dark"]` on `<html>` — every token flips via the CSS layer.
Surfaces step up with depth (`#0B0C0F` → `#14161B` → `#1B1E24`); text is reduced-opacity
neutral; **navy** lightens to `#5A82D6` and **aqua** to `#5AC4E0` to hold contrast. Shadows
are pure black, never colored.

---

## 8. v2 → v3 diff

Token **names** are unchanged (drop-in). Value/role changes:

- **Primary hue:** periwinkle `#4B5FC6` → **Navy `#0C3980`**. Hover now the reference
  "Navy Hover" `#476BB3`.
- **New aqua accent family** (`--ca-color-accent*`) added and wired into all interactive
  controls; toggle/checkbox/radio/slider/active-tab move from primary → accent.
- **Data palette** (`--ca-palette-*`, 14 reference hues) added.
- **Neutrals** re-based on the reference greyscale: text `#16181D`→`#333333`,
  borders `#E8E9EC`→`#DDDDDD`, page `#FAFAFB`→`#FAFAFA`, surfaces true-neutral with one
  `#F2F4F7` blueish tint. Added `--ca-text-tertiary` (`#AAAAAA`).
- **Semantic colors** re-tuned to reference toast/alert hues; bases are now solid-usable
  (white text) with matching tints.
- **Radius sharpened:** button `4px`→`2px`, sm `4px`→`3px`, md `6px`→`4px`, lg `8px`→`6px`,
  xl `12px`→`8px`.
- **Label typography reversed:** `--ca-type-label` moves mono → **uppercase tracked sans**;
  new `--ca-type-button` for tracked-caps button text.
- PM status/priority palettes retuned toward the navy/aqua family but kept as domain
  semantics — don't repurpose for generic UI.
