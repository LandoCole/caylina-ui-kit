import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface PageNavItem {
  id: string;
  label: string;
  children?: PageNavItem[];
}

const chevronDownSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>`;

@customElement('ca-page-nav')
export class CaPageNav extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--ca-font-family);
    }
    nav {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    /* Parent items */
    .nav-item {
      display: flex;
      align-items: center;
      gap: 8px;
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
      color: var(--ca-text-secondary);
      transition: background-color 0.15s ease, color 0.15s ease;
      box-sizing: border-box;
    }
    .nav-item:hover {
      background-color: var(--ca-surface-hover);
    }
    .nav-item.active {
      color: var(--ca-text-primary);
      background-color: var(--ca-surface-hover);
    }
    .nav-item:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: -2px;
    }
    .nav-label {
      flex: 1;
      min-width: 0;
    }

    /* Chevron */
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

    /* Child items — collapse panel */
    .children-panel {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.15s ease;
    }
    .children-panel.open {
      grid-template-rows: 1fr;
    }
    .children-inner {
      overflow: hidden;
    }
    .children-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding-left: 24px;
    }

    /* Child link */
    .child-item {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      border-radius: var(--ca-radius-md);
      border: none;
      background: none;
      cursor: pointer;
      width: 100%;
      text-align: left;
      font-family: inherit;
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      color: var(--ca-text-secondary);
      transition: background-color 0.15s ease, color 0.15s ease;
      box-sizing: border-box;
    }
    .child-item:hover {
      background-color: var(--ca-surface-hover);
    }
    .child-item.active {
      color: var(--ca-text-primary);
      background-color: var(--ca-surface-hover);
    }
    .child-item:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: -2px;
    }
  `;

  @property({ type: Array })
  items: PageNavItem[] = [];

  @property({ type: String, reflect: true, attribute: 'active-id' })
  activeId = '';

  @property({ type: Number, attribute: 'scroll-offset' })
  scrollOffset = 0;

  @property({ type: String, attribute: 'scroll-behavior' })
  scrollBehavior: 'smooth' | 'auto' = 'smooth';

  @state()
  private _expandedId = '';

  private _observer: IntersectionObserver | null = null;
  private _visibleIds: Set<string> = new Set();

  connectedCallback() {
    super.connectedCallback();
    this._setupObserver();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._teardownObserver();
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('items')) {
      this._teardownObserver();
      this._setupObserver();
    }
  }

  private _getAllIds(): string[] {
    const ids: string[] = [];
    for (const item of this.items) {
      ids.push(item.id);
      if (item.children) {
        for (const child of item.children) {
          ids.push(child.id);
        }
      }
    }
    return ids;
  }

  private _setupObserver() {
    if (!this.items.length) return;

    this._observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this._visibleIds.add(entry.target.id);
          } else {
            this._visibleIds.delete(entry.target.id);
          }
        }
        this._updateActiveFromVisible();
      },
      {
        rootMargin: `-${this.scrollOffset}px 0px 0px 0px`,
        threshold: 0,
      }
    );

    for (const id of this._getAllIds()) {
      const el = document.getElementById(id);
      if (el) this._observer.observe(el);
    }
  }

  private _teardownObserver() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
    this._visibleIds.clear();
  }

  private _updateActiveFromVisible() {
    if (this._visibleIds.size === 0) return;

    const allIds = this._getAllIds();
    let topId = '';
    let topY = Infinity;

    for (const id of allIds) {
      if (!this._visibleIds.has(id)) continue;
      const el = document.getElementById(id);
      if (!el) continue;
      const y = el.getBoundingClientRect().top;
      if (y < topY) {
        topY = y;
        topId = id;
      }
    }

    if (topId && topId !== this.activeId) {
      this.activeId = topId;

      // Auto-expand parent if a child becomes active
      for (const item of this.items) {
        if (item.children?.some((c) => c.id === topId)) {
          this._expandedId = item.id;
          break;
        }
      }
    }
  }

  private _handleItemClick(item: PageNavItem) {
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      if (this._expandedId === item.id) {
        this._expandedId = '';
        return;
      }
      this._expandedId = item.id;
    }

    this._scrollTo(item.id);
    this.dispatchEvent(
      new CustomEvent('ca-navigate', {
        detail: { id: item.id },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleChildClick(child: PageNavItem) {
    this._scrollTo(child.id);
    this.dispatchEvent(
      new CustomEvent('ca-navigate', {
        detail: { id: child.id },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - this.scrollOffset;
    window.scrollTo({ top, behavior: this.scrollBehavior });
  }

  render() {
    return html`<nav>${this.items.map((item) => this._renderItem(item))}</nav>`;
  }

  private _renderItem(item: PageNavItem) {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = this._expandedId === item.id;
    const isActive = this.activeId === item.id;

    return html`
      <div>
        <button
          class=${classMap({
            'nav-item': true,
            active: isActive,
          })}
          @click=${() => this._handleItemClick(item)}
          aria-expanded=${hasChildren ? isExpanded : nothing}
        >
          <span class="nav-label">${item.label}</span>
          ${hasChildren
            ? html`
                <span class=${classMap({ 'nav-chevron': true, 'chevron-open': isExpanded })}>
                  ${unsafeHTML(chevronDownSvg)}
                </span>
              `
            : nothing}
        </button>
        ${hasChildren
          ? html`
              <div class=${classMap({ 'children-panel': true, open: isExpanded })}>
                <div class="children-inner">
                  <div class="children-list">
                    ${item.children!.map(
                      (child) => html`
                        <button
                          class=${classMap({
                            'child-item': true,
                            active: this.activeId === child.id,
                          })}
                          @click=${() => this._handleChildClick(child)}
                        >
                          ${child.label}
                        </button>
                      `
                    )}
                  </div>
                </div>
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-page-nav': CaPageNav;
  }
}
