import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface SideNavChild {
  id: string;
  label: string;
}

export interface SideNavItem {
  id: string;
  label: string;
  icon?: string;
  children?: SideNavChild[];
  danger?: boolean;
  /** Optional right-aligned accessory — raw HTML string (badge, icon, etc.) */
  accessory?: string;
}

export interface SideNavSection {
  title?: string;
  items: SideNavItem[];
  grow?: boolean;
}

export interface SideNavProfileAction {
  id: string;
  label: string;
  icon?: string;
  danger?: boolean;
}

const chevronDownSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>`;

const collapseSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4l-4 4 4 4"/></svg>`;

const expandSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4l4 4-4 4"/></svg>`;

const kebabSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="3" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="8" cy="13" r="1.5"/></svg>`;

@customElement('ca-sidenav')
export class CaSidenav extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 24px;
      background-color: var(--ca-surface);
      border-right: 1px solid var(--ca-border);
      font-family: var(--ca-font-family);
      position: relative;
      box-sizing: border-box;
      height: 100%;
      transition: width 0.2s ease;
    }
    :host(:not([collapsed])) {
      width: var(--ca-sidenav-width, 256px);
    }
    :host([collapsed]) {
      width: 92px;
      align-items: center;
    }

    /* Logo area */
    .logo-area {
      display: flex;
      align-items: center;
      width: 100%;
    }
    .logo-expanded {
      display: contents;
    }
    .logo-collapsed {
      display: none;
    }
    :host([collapsed]) .logo-area {
      justify-content: center;
    }
    :host([collapsed]) .logo-expanded {
      display: none;
    }
    :host([collapsed]) .logo-collapsed {
      display: contents;
    }

    /* Divider */
    .divider-line {
      width: 100%;
      height: 1px;
      background-color: var(--ca-border);
      flex-shrink: 0;
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

    /* Sections */
    .section {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    }
    .section + .section {
      border-top: 1px solid var(--ca-border);
      padding-top: 24px;
    }
    .section-grow {
      flex: 1;
      min-height: 0;
    }
    .section-title {
      padding: 0 12px;
    }
    .section-title span {
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      line-height: 12px;
      color: var(--ca-text-secondary);
    }
    :host([collapsed]) .section-title {
      display: none;
    }
    :host([collapsed]) .section {
      align-items: center;
    }

    /* Nav Link */
    .nav-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: var(--ca-radius-md);
      border: none;
      background: none;
      cursor: pointer;
      width: 100%;
      text-align: left;
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: -0.28px;
      color: var(--ca-text-secondary);
      transition: background-color 0.15s ease, color 0.15s ease;
      box-sizing: border-box;
    }
    .nav-link:hover {
      background-color: var(--ca-surface-hover);
    }
    .nav-link.active {
      background-color: var(--ca-surface-active);
      color: var(--ca-text-primary);
    }
    .nav-link.danger {
      color: var(--ca-text-danger);
    }
    .nav-link:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: -2px;
    }
    :host([collapsed]) .nav-link {
      width: auto;
      padding: 10px 12px;
    }
    .nav-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      color: inherit;
    }
    .nav-icon svg {
      width: 20px;
      height: 20px;
    }
    .nav-label {
      flex: 1;
      min-width: 0;
    }
    .nav-accessory {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: var(--ca-text-muted);
    }
    .nav-accessory svg {
      width: 16px;
      height: 16px;
    }
    .nav-chevron {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      transition: transform 0.2s ease;
      color: inherit;
    }
    .nav-chevron svg {
      width: 16px;
      height: 16px;
    }
    .chevron-open {
      transform: rotate(180deg);
    }

    /* Sub Items */
    .sub-items {
      display: flex;
      gap: 0;
      padding-left: 32px;
      position: relative;
    }
    .sub-line {
      position: absolute;
      left: 20px;
      top: 0;
      bottom: 16px;
      width: 1px;
      background-color: var(--ca-border);
    }
    .sub-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
    }
    .sub-link {
      display: flex;
      align-items: center;
      gap: 0;
      padding: 8px 12px;
      border-radius: var(--ca-radius-md);
      border: none;
      background: none;
      cursor: pointer;
      font-family: inherit;
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: -0.24px;
      color: var(--ca-text-secondary);
      width: 100%;
      text-align: left;
      position: relative;
      transition: background-color 0.15s ease, color 0.15s ease;
      box-sizing: border-box;
    }
    .sub-link:hover {
      background-color: var(--ca-surface-hover);
    }
    .sub-link.active {
      background-color: var(--ca-surface-active);
      color: var(--ca-text-primary);
    }
    .sub-link:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: -2px;
    }
    .sub-radius {
      position: absolute;
      left: -13px;
      top: 50%;
      transform: translateY(-50%);
      width: 13px;
      height: 8px;
      border-left: 1px solid var(--ca-border);
      border-bottom: 1px solid var(--ca-border);
      border-bottom-left-radius: 8px;
    }
    .item-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }
    :host([collapsed]) .item-group {
      width: auto;
    }

    /* Toggle Button */
    .toggle-btn {
      position: absolute;
      right: -15px;
      top: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      border-radius: var(--ca-radius-md);
      border: 1px solid var(--ca-surface-active);
      background-color: var(--ca-surface);
      cursor: pointer;
      color: var(--ca-text-secondary);
      transition: background-color 0.15s ease;
      z-index: 5;
    }
    .toggle-btn:hover {
      background-color: var(--ca-surface-hover);
    }
    .toggle-btn:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: 2px;
    }
    .toggle-btn svg {
      width: 16px;
      height: 16px;
    }

    /* Profile area */
    .profile-area {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }
    :host([collapsed]) .profile-area {
      justify-content: center;
    }
    .profile-slot-wrapper {
      flex: 1;
      min-width: 0;
    }
    :host([collapsed]) .profile-slot-wrapper {
      display: none;
    }
    :host([collapsed]) .kebab-btn {
      display: none;
    }
    .profile-avatar {
      flex-shrink: 0;
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

    /* Tooltip */
    .tooltip {
      position: absolute;
      left: calc(100% + 8px);
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      z-index: 20;
      pointer-events: none;
    }
    .tooltip-arrow {
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: 6px solid var(--ca-text-primary);
      flex-shrink: 0;
    }
    .tooltip-text {
      display: block;
      padding: 10px 12px;
      border-radius: var(--ca-radius-sm);
      background-color: var(--ca-text-primary);
      color: var(--ca-surface);
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      white-space: nowrap;
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.25);
    }

    /* Popover */
    .popover {
      position: absolute;
      left: calc(100% + 8px);
      z-index: 20;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 8px;
      width: 172px;
      background-color: var(--ca-surface-elevated);
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-lg);
      box-shadow: 0px 100px 80px 0px rgba(0, 0, 0, 0.07),
        0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.05);
    }
    .popover-link {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: var(--ca-radius-md);
      border: none;
      background: none;
      cursor: pointer;
      font-family: inherit;
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: -0.24px;
      color: var(--ca-text-secondary);
      width: 100%;
      text-align: left;
      transition: background-color 0.15s ease, color 0.15s ease;
      box-sizing: border-box;
    }
    .popover-link:hover {
      background-color: var(--ca-surface-hover);
    }
    .popover-link.active {
      background-color: var(--ca-surface-active);
      color: var(--ca-text-primary);
    }
    .popover-link.danger {
      color: var(--ca-text-danger);
    }
    .popover-link .nav-icon {
      width: 16px;
      height: 16px;
    }
    .popover-link .nav-icon svg {
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
  `;

  @property({ type: Boolean, reflect: true })
  collapsed = false;

  @property({ type: String, attribute: 'active-id' })
  activeId = '';

  @property({ type: Array })
  sections: SideNavSection[] = [];

  @property({ type: Array })
  profileActions: SideNavProfileAction[] = [];

  @state()
  private _openDropdowns: Set<string> = new Set();

  @state()
  private _tooltip: { id: string; top: number } | null = null;

  @state()
  private _popover: { id: string; top: number; items: SideNavChild[] } | null = null;

  @state()
  private _profilePopover = false;

  private _boundClickOutside = this._handleClickOutside.bind(this);

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._boundClickOutside);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._boundClickOutside);
  }

  private _handleClickOutside(e: MouseEvent) {
    if (!this.contains(e.target as Node)) {
      if (this._popover) this._popover = null;
      if (this._profilePopover) this._profilePopover = false;
    }
  }

  private _navigate(id: string) {
    this.dispatchEvent(
      new CustomEvent('ca-navigate', {
        detail: { id },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _toggleCollapse() {
    this.dispatchEvent(
      new CustomEvent('ca-toggle', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _toggleDropdown(id: string) {
    const next = new Set(this._openDropdowns);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this._openDropdowns = next;
  }

  private _isItemActive(item: SideNavItem): boolean {
    if (item.id === this.activeId) return true;
    if (item.children) {
      return item.children.some((c) => c.id === this.activeId);
    }
    return false;
  }

  private _handleMouseEnter(item: SideNavItem, e: MouseEvent) {
    if (!this.collapsed) return;
    const target = e.currentTarget as HTMLElement;
    const hostRect = this.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const top = targetRect.top - hostRect.top + targetRect.height / 2;

    if (item.children && item.children.length > 0) {
      this._tooltip = null;
      this._popover = { id: item.id, top: targetRect.top - hostRect.top, items: item.children };
    } else {
      this._popover = null;
      this._tooltip = { id: item.id, top };
    }
  }

  private _handleMouseLeave() {
    if (!this.collapsed) return;
    this._tooltip = null;
  }

  private _handleItemClick(item: SideNavItem) {
    if (item.children && item.children.length > 0) {
      if (this.collapsed) {
        return;
      }
      this._toggleDropdown(item.id);
    } else {
      this._navigate(item.id);
    }
  }

  private _toggleProfilePopover() {
    this._profilePopover = !this._profilePopover;
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

  private _renderSubItems(item: SideNavItem) {
    if (!item.children || item.children.length === 0) return nothing;
    if (this.collapsed) return nothing;
    if (!this._openDropdowns.has(item.id)) return nothing;

    return html`
      <div class="sub-items">
        <div class="sub-line"></div>
        <div class="sub-list">
          ${item.children.map(
            (child) => html`
              <button
                class=${classMap({
                  'sub-link': true,
                  active: child.id === this.activeId,
                })}
                @click=${() => this._navigate(child.id)}
              >
                <span class="sub-radius"></span>
                ${child.label}
              </button>
            `
          )}
        </div>
      </div>
    `;
  }

  private _renderItem(item: SideNavItem) {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = this._openDropdowns.has(item.id);
    const isActive = this._isItemActive(item);

    return html`
      <div class="item-group">
        <button
          class=${classMap({
            'nav-link': true,
            active: isActive,
            danger: !!item.danger,
          })}
          @click=${() => this._handleItemClick(item)}
          @mouseenter=${(e: MouseEvent) => this._handleMouseEnter(item, e)}
          @mouseleave=${() => this._handleMouseLeave()}
        >
          ${item.icon
            ? html`<span class="nav-icon">${unsafeHTML(item.icon)}</span>`
            : nothing}
          ${!this.collapsed
            ? html`<span class="nav-label">${item.label}</span>`
            : nothing}
          ${item.accessory && !this.collapsed
            ? html`<span class="nav-accessory">${unsafeHTML(item.accessory)}</span>`
            : nothing}
          ${hasChildren && !this.collapsed
            ? html`
                <span
                  class=${classMap({
                    'nav-chevron': true,
                    'chevron-open': isOpen,
                  })}
                >
                  ${unsafeHTML(chevronDownSvg)}
                </span>
              `
            : nothing}
        </button>
        ${this._renderSubItems(item)}
      </div>
    `;
  }

  private _renderSection(section: SideNavSection, index: number) {
    return html`
      <div
        class=${classMap({
          section: true,
          'section-grow': !!section.grow,
        })}
      >
        ${section.title
          ? html`
              <div class="section-title">
                <span>${section.title}</span>
              </div>
            `
          : nothing}
        ${section.items.map((item) => this._renderItem(item))}
      </div>
    `;
  }

  private _renderTooltip() {
    if (!this._tooltip || !this.collapsed) return nothing;

    return html`
      <div class="tooltip" style="top: ${this._tooltip.top}px;">
        <div class="tooltip-arrow"></div>
        <span class="tooltip-text">
          ${this._getItemLabel(this._tooltip.id)}
        </span>
      </div>
    `;
  }

  private _renderPopover() {
    if (!this._popover || !this.collapsed) return nothing;

    return html`
      <div class="popover" style="top: ${this._popover.top}px;">
        ${this._popover.items.map(
          (child) => html`
            <button
              class=${classMap({
                'popover-link': true,
                active: child.id === this.activeId,
              })}
              @click=${() => {
                this._navigate(child.id);
                this._popover = null;
              }}
            >
              ${child.label}
            </button>
          `
        )}
      </div>
    `;
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

  private _getItemLabel(id: string): string {
    for (const section of this.sections) {
      for (const item of section.items) {
        if (item.id === id) return item.label;
      }
    }
    return '';
  }

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
        <span class="logo-expanded"><slot name="logo"></slot></span>
        <span class="logo-collapsed"><slot name="logo-collapsed"></slot></span>
      </div>
      <div class="divider-line"></div>

      <div class="nav-sections">
        ${this.sections.map((section, i) => this._renderSection(section, i))}
      </div>

      <div class="divider-line"></div>
      <div class="profile-area">
        <div class="profile-avatar">
          <slot name="profile-avatar"></slot>
        </div>
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
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-sidenav': CaSidenav;
  }
}
