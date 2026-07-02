# Side Nav Redesign: Logo Top, Profile Bottom with Actions Menu

## Overview

Restructure `<ca-sidenav>` to have three distinct zones: a logo area at the top (slot-based), navigation sections in the middle (unchanged), and a user profile area at the bottom (slot-based) with a built-in actions popover menu.

## Layout Structure

Top to bottom:

1. **Logo area** — `<slot name="logo">`, separated from nav by a divider
2. **Navigation sections** — unchanged from current implementation (`sections` property, `grow` support, dropdowns, sub-items). This area always gets `flex: 1` so the profile is pinned to the bottom regardless of whether any section uses `grow`.
3. **Profile area** — `<slot name="profile">`, separated from nav by a divider, with optional built-in actions popover

## API Changes

### Removed

- `profile` property — replaced by `<slot name="profile">`
- `_renderProfile()` method and all associated profile styles (`.profile`, `.avatar`, `.avatar-placeholder`, `.profile-text`, `.profile-role`, `.profile-name`)

### Added

#### Slots

- `<slot name="logo">` — Top of the nav. Consumer provides their own logo markup (image, SVG, styled text, etc.). The component wraps this slot in a container with bottom padding and a divider beneath it.
- `<slot name="profile">` — Bottom of the nav. Consumer provides their own profile markup (avatar, name, role, email, etc.). The component wraps this slot in a container with top divider and padding.

#### Properties

- `profileActions` — `Array<{ id: string, label: string, icon?: string, danger?: boolean }>`. When set, renders a kebab menu button next to the profile slot. Clicking it opens a popover with the action items. When empty or unset, no kebab icon appears.

#### Events

- `ca-profile-action` — Dispatched when a profile action menu item is clicked. Detail: `{ id: string }`. Bubbles and is composed (crosses shadow DOM).

### Unchanged

- `collapsed` property (boolean, reflected)
- `active-id` property (string)
- `sections` property (`SideNavSection[]`)
- `ca-navigate` event
- `ca-toggle` event
- All nav item features: dropdowns, sub-items, danger items, section titles, `grow` sections
- Collapse toggle button behavior and positioning
- Tooltip behavior for collapsed nav items
- Popover behavior for collapsed nav items with children

## Collapsed Behavior

- **Logo slot**: The consumer controls their own collapsed appearance. They can use the `[collapsed]` attribute reflected on the host to style their slotted content (e.g., hide app name text, show icon-only).
- **Profile slot**: Same as logo — consumer controls collapsed appearance via the host's `[collapsed]` attribute.
- **Actions popover**: In collapsed mode, clicking the profile area (or kebab icon) opens the actions popover positioned to the right of the sidenav, matching the existing popover style used for nav item children. Click-outside closes it.
- **Kebab icon**: Component-rendered button (not consumer-provided). Remains visible in collapsed mode alongside the profile slot content.

## Render Order

```
┌──────────────────────┐
│  [toggle-btn]        │  ← absolute positioned, right edge
│                      │
│  ┌────────────────┐  │
│  │ <slot logo>    │  │  ← consumer-provided logo
│  └────────────────┘  │
│  ─── divider ──────  │
│                      │
│  ┌────────────────┐  │
│  │ Section 1      │  │  ← from sections property
│  │  • Nav Item    │  │
│  │  • Nav Item    │  │
│  ├────────────────┤  │
│  │ Section 2      │  │
│  │  • Nav Item    │  │
│  └────────────────┘  │
│                      │
│  (flex grow space)   │
│                      │
│  ─── divider ──────  │
│  ┌────────────────┐  │
│  │ <slot profile> │⋮ │  ← consumer-provided profile + kebab
│  └────────────────┘  │
│  [actions popover]   │  ← conditional, on kebab click
└──────────────────────┘
```

## Profile Actions Popover

Reuses the existing popover styling (`.popover`, `.popover-link` classes). Positioned above or to the right of the profile area depending on collapsed state:

- **Expanded mode**: Popover appears above the profile row, aligned to the left edge of the sidenav content area.
- **Collapsed mode**: Popover appears to the right of the sidenav (same positioning as collapsed nav item popovers).

Each action item renders as a button with optional icon and label. Danger items use `--ca-text-danger` color. Clicking an item dispatches `ca-profile-action` with the item's `id` and closes the popover.

## Interfaces

```typescript
// New — replaces SideNavProfile
export interface SideNavProfileAction {
  id: string;
  label: string;
  icon?: string;    // SVG string, same as SideNavItem.icon
  danger?: boolean;
}

// Unchanged
export interface SideNavChild { ... }
export interface SideNavItem { ... }
export interface SideNavSection { ... }

// Removed
// export interface SideNavProfile { ... }
```

## Styling

### New CSS

- `.logo-area` — flex container wrapping the logo slot, with bottom padding
- `.profile-area` — flex container at the bottom wrapping the profile slot and kebab button, with top divider
- `.kebab-btn` — kebab menu button, styled consistently with `.toggle-btn`
- `.profile-popover` — reuses `.popover` styles, positioned contextually

### Removed CSS

- `.profile`, `.avatar`, `.avatar-placeholder`, `.profile-text`, `.profile-role`, `.profile-name` — all replaced by slot-based content

### Retained CSS

- `.divider-line` — reused for both logo and profile dividers
- All `.popover` and `.popover-link` styles — reused for profile actions

## Consumer Usage Example

```html
<ca-sidenav id="nav" active-id="dashboard" style="height:100vh;">
  <div slot="logo" style="display:flex;align-items:center;gap:10px;">
    <img src="/logo.svg" alt="Acme" width="32" height="32" />
    <span class="app-name">Acme App</span>
  </div>

  <div slot="profile" style="display:flex;align-items:center;gap:10px;">
    <img src="https://i.pravatar.cc/36" alt="Jane" style="width:36px;height:36px;border-radius:50%;" />
    <div>
      <div style="font-size:13px;font-weight:500;">Jane Doe</div>
      <div style="font-size:11px;color:var(--ca-text-secondary);">Admin</div>
    </div>
  </div>
</ca-sidenav>

<script>
  const nav = document.getElementById('nav');

  nav.sections = [
    {
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: '<svg>...</svg>' },
        { id: 'projects', label: 'Projects', icon: '<svg>...</svg>' },
        { id: 'settings', label: 'Settings', icon: '<svg>...</svg>',
          children: [
            { id: 'general', label: 'General' },
            { id: 'security', label: 'Security' }
          ]
        }
      ]
    }
  ];

  nav.profileActions = [
    { id: 'account', label: 'Account Settings', icon: '<svg>...</svg>' },
    { id: 'logout', label: 'Log Out', icon: '<svg>...</svg>', danger: true }
  ];

  nav.addEventListener('ca-navigate', (e) => {
    nav.activeId = e.detail.id;
  });

  nav.addEventListener('ca-profile-action', (e) => {
    if (e.detail.id === 'logout') { /* handle logout */ }
  });
</script>
```

## Breaking Changes

- The `profile` property is removed. Consumers using it must migrate to `<slot name="profile">` with their own markup. The slot approach is more flexible but requires slightly more HTML from the consumer.
- The `SideNavProfile` interface is removed from exports.
