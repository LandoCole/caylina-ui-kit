# Side Nav Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure `<ca-sidenav>` to have a slot-based logo at the top, nav sections in the middle, and a slot-based profile with built-in actions popover at the bottom.

**Architecture:** Replace the `profile` property and its render method with two named slots (`logo` and `profile`). Add a `profileActions` property that renders a kebab menu button and popover reusing existing popover styles. Wrap nav sections in a flex-grow container so the profile area is always pinned to the bottom.

**Tech Stack:** Lit 3, TypeScript, CSS custom properties (design tokens), Vite

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/lit/sidenav.ts` | Modify | Remove profile property/interface/render, add slots, profileActions, kebab, profile popover |
| `src/index.ts` | Modify | Update type re-exports (remove `SideNavProfile`, add `SideNavProfileAction`) |
| `index.html` | Modify | Add sidenav demo section using new slot-based API |
| `GUIDE.md` | Modify | Update Side Nav documentation |

---

### Task 1: Remove profile property and old profile code

**Files:**
- Modify: `src/lit/sidenav.ts`

- [ ] **Step 1: Remove `SideNavProfile` interface**

Delete lines 25-29 of `src/lit/sidenav.ts`:

```typescript
// DELETE this entire interface
export interface SideNavProfile {
  name: string;
  role?: string;
  avatar?: string;
}
```

- [ ] **Step 2: Remove `profile` property from the class**

Delete this property declaration from the `CaSidenav` class:

```typescript
// DELETE
@property({ type: Object })
profile: SideNavProfile | null = null;
```

- [ ] **Step 3: Remove `_renderProfile()` method**

Delete the entire `_renderProfile()` method (lines 507-528):

```typescript
// DELETE this entire method
private _renderProfile() { ... }
```

- [ ] **Step 4: Remove profile call from `render()`**

In the `render()` method, remove the line:

```typescript
// DELETE
${this._renderProfile()}
```

- [ ] **Step 5: Remove old profile CSS**

Delete these CSS rules from the `static styles`:

```css
/* DELETE all of these */
.profile { ... }
.avatar { ... }
.avatar-placeholder { ... }
.profile-text { ... }
.profile-role { ... }
.profile-name { ... }
```

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: Successful build with no TypeScript errors

- [ ] **Step 7: Commit**

```bash
git add src/lit/sidenav.ts
git commit -m "refactor(sidenav): remove profile property and old profile rendering"
```

---

### Task 2: Add `SideNavProfileAction` interface and `profileActions` property

**Files:**
- Modify: `src/lit/sidenav.ts`

- [ ] **Step 1: Add the new interface**

Add after the `SideNavSection` interface in `src/lit/sidenav.ts`:

```typescript
export interface SideNavProfileAction {
  id: string;
  label: string;
  icon?: string;
  danger?: boolean;
}
```

- [ ] **Step 2: Add kebab SVG constant**

Add after the existing `expandSvg` constant:

```typescript
const kebabSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="3" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="8" cy="13" r="1.5"/></svg>`;
```

- [ ] **Step 3: Add `profileActions` property and `_profilePopover` state**

Add to the `CaSidenav` class:

```typescript
@property({ type: Array })
profileActions: SideNavProfileAction[] = [];

@state()
private _profilePopover = false;
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Successful build

- [ ] **Step 5: Commit**

```bash
git add src/lit/sidenav.ts
git commit -m "feat(sidenav): add SideNavProfileAction interface and profileActions property"
```

---

### Task 3: Add logo slot, profile slot, and restructure layout

**Files:**
- Modify: `src/lit/sidenav.ts`

- [ ] **Step 1: Add CSS for new layout zones**

Add these CSS rules to `static styles` (after the existing `.divider-line` rule):

```css
/* Logo area */
.logo-area {
  display: flex;
  align-items: center;
  width: 100%;
}

/* Nav sections wrapper — flex-grow pins profile to bottom */
.nav-sections {
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
  min-height: 0;
  width: 100%;
}
:host([collapsed]) .nav-sections {
  align-items: center;
}

/* Profile area */
.profile-area {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}
.profile-slot-wrapper {
  flex: 1;
  min-width: 0;
}

/* Kebab button */
.kebab-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: var(--ca-radius-md);
  border: none;
  background: none;
  cursor: pointer;
  color: var(--ca-text-secondary);
  transition: background-color 0.15s ease;
  flex-shrink: 0;
}
.kebab-btn:hover {
  background-color: var(--ca-surface-hover);
}
.kebab-btn:focus-visible {
  outline: 2px solid var(--ca-text-primary);
  outline-offset: -2px;
}
.kebab-btn svg {
  width: 16px;
  height: 16px;
}

/* Profile popover — expanded mode (above profile) */
.profile-popover {
  position: absolute;
  bottom: 80px;
  left: 24px;
  right: 24px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  background-color: var(--ca-surface-elevated);
  border: 1px solid var(--ca-border);
  border-radius: var(--ca-radius-lg);
  box-shadow: 0px 100px 80px 0px rgba(0, 0, 0, 0.07),
    0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.05);
}
/* Profile popover — collapsed mode (to the right) */
:host([collapsed]) .profile-popover {
  bottom: auto;
  left: calc(100% + 8px);
  right: auto;
  width: 172px;
}
```

- [ ] **Step 2: Update the `render()` method**

Replace the entire `render()` method with:

```typescript
render() {
  return html`
    <button
      class="toggle-btn"
      @click=${this._toggleCollapse}
      aria-label=${this.collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      ${this.collapsed ? unsafeHTML(expandSvg) : unsafeHTML(collapseSvg)}
    </button>

    <div class="logo-area">
      <slot name="logo"></slot>
    </div>
    <div class="divider-line"></div>

    <div class="nav-sections">
      ${this.sections.map((section, i) => this._renderSection(section, i))}
    </div>

    <div class="divider-line"></div>
    <div class="profile-area">
      <div class="profile-slot-wrapper">
        <slot name="profile"></slot>
      </div>
      ${this.profileActions.length > 0
        ? html`
            <button
              class="kebab-btn"
              @click=${this._toggleProfilePopover}
              aria-label="User menu"
            >
              ${unsafeHTML(kebabSvg)}
            </button>
          `
        : nothing}
    </div>

    ${this._renderProfilePopover()}
    ${this._renderTooltip()}
    ${this._renderPopover()}
  `;
}
```

- [ ] **Step 3: Add `_toggleProfilePopover` and `_renderProfilePopover` methods**

Add these methods to the class:

```typescript
private _toggleProfilePopover() {
  this._profilePopover = !this._profilePopover;
}

private _renderProfilePopover() {
  if (!this._profilePopover || this.profileActions.length === 0) return nothing;

  return html`
    <div class="profile-popover">
      ${this.profileActions.map(
        (action) => html`
          <button
            class=${classMap({
              'popover-link': true,
              danger: !!action.danger,
            })}
            @click=${() => this._handleProfileAction(action.id)}
          >
            ${action.icon
              ? html`<span class="nav-icon">${unsafeHTML(action.icon)}</span>`
              : nothing}
            ${action.label}
          </button>
        `
      )}
    </div>
  `;
}

private _handleProfileAction(id: string) {
  this.dispatchEvent(
    new CustomEvent('ca-profile-action', {
      detail: { id },
      bubbles: true,
      composed: true,
    })
  );
  this._profilePopover = false;
}
```

- [ ] **Step 4: Update `_handleClickOutside` to close profile popover**

Update the existing `_handleClickOutside` method:

```typescript
private _handleClickOutside(e: MouseEvent) {
  if (!this.contains(e.target as Node)) {
    if (this._popover) this._popover = null;
    if (this._profilePopover) this._profilePopover = false;
  }
}
```

- [ ] **Step 5: Add danger style for popover-link**

Add this CSS rule alongside the existing `.popover-link` styles:

```css
.popover-link.danger {
  color: var(--ca-text-danger);
}
```

- [ ] **Step 6: Add gap and icon styling for popover-link with icons**

Add this CSS rule for popover links that contain icons:

```css
.popover-link .nav-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}
.popover-link .nav-icon svg {
  width: 16px;
  height: 16px;
}
```

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: Successful build

- [ ] **Step 8: Commit**

```bash
git add src/lit/sidenav.ts
git commit -m "feat(sidenav): add logo/profile slots, kebab menu, and profile actions popover"
```

---

### Task 4: Update type exports in `src/index.ts`

**Files:**
- Modify: `src/index.ts`

- [ ] **Step 1: Add sidenav type re-exports**

Add the following at the end of `src/index.ts`, after the existing re-export blocks:

```typescript
// Re-export sidenav types
export type {
  SideNavProfileAction,
  SideNavChild,
  SideNavItem,
  SideNavSection,
} from './lit/sidenav.js';
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Successful build

- [ ] **Step 3: Commit**

```bash
git add src/index.ts
git commit -m "feat(sidenav): export sidenav types from package entry"
```

---

### Task 5: Update GUIDE.md documentation

**Files:**
- Modify: `GUIDE.md`

- [ ] **Step 1: Replace the Side Nav section**

Find the `### Side Nav` section in `GUIDE.md` (around line 1100) and replace it entirely with:

````markdown
### Side Nav

`<ca-sidenav>` — Sidebar navigation with logo area, collapsible sections, and user profile.

| Property | Type | Default |
|----------|------|---------|
| `collapsed` | `boolean` | `false` |
| `active-id` | `string` | `''` |
| `sections` | `SideNavSection[]` | `[]` |
| `profileActions` | `SideNavProfileAction[]` | `[]` |

**Slots:**
- `logo` — Logo/brand content at the top
- `profile` — User profile content at the bottom

`SideNavSection`: `{ title?, items: SideNavItem[], grow? }`
`SideNavItem`: `{ id, label, icon?, children?: SideNavChild[], danger? }`
`SideNavProfileAction`: `{ id, label, icon?, danger? }`

**Events:** `ca-navigate` — `{ id }`, `ca-toggle` (collapse toggled), `ca-profile-action` — `{ id }` (profile menu item clicked)

```html
<ca-sidenav id="nav" active-id="dashboard" style="height:100vh;">
  <div slot="logo" style="display:flex;align-items:center;gap:10px;">
    <img src="/logo.svg" alt="Acme" width="32" height="32" />
    <span>Acme App</span>
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
        {
          id: 'settings', label: 'Settings', icon: '<svg>...</svg>',
          children: [
            { id: 'general', label: 'General' },
            { id: 'security', label: 'Security' },
          ],
        },
      ],
    },
  ];
  nav.profileActions = [
    { id: 'account', label: 'Account Settings', icon: '<svg>...</svg>' },
    { id: 'logout', label: 'Log Out', icon: '<svg>...</svg>', danger: true },
  ];
  nav.addEventListener('ca-navigate', (e) => {
    nav.activeId = e.detail.id;
  });
  nav.addEventListener('ca-profile-action', (e) => {
    if (e.detail.id === 'logout') { /* handle logout */ }
  });
</script>
```
````

- [ ] **Step 2: Commit**

```bash
git add GUIDE.md
git commit -m "docs(sidenav): update Side Nav section for slot-based logo/profile API"
```

---

### Task 6: Add sidenav demo to index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Find where to add the demo**

Open `index.html` and find an appropriate place to add a Side Nav demo section (likely near other complex component demos).

- [ ] **Step 2: Add the sidenav demo section**

Add the following demo block:

```html
<h2>Side Nav</h2>
<div style="display:flex;height:500px;border:1px solid var(--ca-border);border-radius:var(--ca-radius-lg);overflow:hidden;">
  <ca-sidenav id="demo-nav" active-id="dashboard">
    <div slot="logo" style="display:flex;align-items:center;gap:10px;">
      <div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:16px;">C</div>
      <span style="font-size:15px;font-weight:600;letter-spacing:-0.3px;">Caylina</span>
    </div>

    <div slot="profile" style="display:flex;align-items:center;gap:10px;">
      <img src="https://i.pravatar.cc/36?u=jane" alt="Jane" style="width:36px;height:36px;border-radius:50%;" />
      <div>
        <div style="font-size:13px;font-weight:500;">Jane Doe</div>
        <div style="font-size:11px;color:var(--ca-text-secondary);">Admin</div>
      </div>
    </div>
  </ca-sidenav>
  <div style="flex:1;padding:24px;display:flex;align-items:center;justify-content:center;color:var(--ca-text-secondary);">
    Main content area
  </div>
</div>
```

- [ ] **Step 3: Add the demo script**

Add a `<script>` block (or append to the existing demo script) to configure the sidenav:

```javascript
// Side Nav demo
(() => {
  const nav = document.getElementById('demo-nav');

  const iconDashboard = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>';
  const iconProjects = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>';
  const iconSettings = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>';
  const iconAccount = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
  const iconLogout = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>';

  nav.sections = [
    {
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: iconDashboard },
        { id: 'projects', label: 'Projects', icon: iconProjects },
        {
          id: 'settings', label: 'Settings', icon: iconSettings,
          children: [
            { id: 'general', label: 'General' },
            { id: 'security', label: 'Security' },
          ],
        },
      ],
    },
  ];

  nav.profileActions = [
    { id: 'account', label: 'Account Settings', icon: iconAccount },
    { id: 'logout', label: 'Log Out', icon: iconLogout, danger: true },
  ];

  nav.addEventListener('ca-navigate', (e) => {
    nav.activeId = e.detail.id;
  });

  nav.addEventListener('ca-toggle', () => {
    nav.collapsed = !nav.collapsed;
  });

  nav.addEventListener('ca-profile-action', (e) => {
    console.log('Profile action:', e.detail.id);
  });
})();
```

- [ ] **Step 4: Verify dev server**

Run: `npm run dev`
Expected: Side nav renders with logo at top, nav items in middle, profile at bottom with kebab menu. Clicking the kebab opens the actions popover.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "demo(sidenav): add side nav demo with new slot-based API"
```

---

### Task 7: Manual verification and final build

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: Clean build, no errors

- [ ] **Step 2: Visual verification in dev server**

Run: `npm run dev`

Verify:
1. Logo slot renders at the top with divider below
2. Nav sections render in the middle
3. Profile slot renders at the bottom with divider above
4. Kebab button appears next to profile
5. Clicking kebab opens actions popover with "Account Settings" and "Log Out"
6. Clicking an action closes the popover and logs to console
7. Clicking outside the popover closes it
8. Toggle collapse button works — logo/profile slots still visible
9. In collapsed mode, kebab click opens popover to the right

- [ ] **Step 3: Commit final build output**

```bash
git add dist/
git commit -m "build: update dist output with sidenav redesign"
```
