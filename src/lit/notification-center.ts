import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export interface NotificationItem {
  id: string;
  title: string;
  body?: string;
  timestamp: string;
  read: boolean;
  type?: string;
}

/**
 * `<ca-notification-center>` — Bell icon trigger with notification dropdown.
 *
 * @fires ca-read      - Dispatched when a notification is marked as read. detail: `{ id: string }`
 * @fires ca-click     - Dispatched when a notification is clicked. detail: `{ id: string }`
 * @fires ca-clear-all - Dispatched when "Clear all" is clicked.
 */
@customElement('ca-notification-center')
export class CaNotificationCenter extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      position: relative;
      font-family: var(--ca-font-family);
    }

    .trigger {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: none;
      border-radius: var(--ca-radius-md);
      background: none;
      cursor: pointer;
      color: var(--ca-text-secondary);
      transition: background-color var(--ca-transition-fast), color var(--ca-transition-fast);
    }
    .trigger:hover {
      background-color: var(--ca-surface-hover);
      color: var(--ca-text-primary);
    }
    .trigger:focus-visible {
      outline: 2px solid var(--ca-color-focus-ring);
      outline-offset: 2px;
    }
    .trigger:focus:not(:focus-visible) {
      outline: none;
    }

    .bell-icon {
      width: 20px;
      height: 20px;
    }

    .badge {
      position: absolute;
      top: 4px;
      right: 4px;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      border-radius: var(--ca-radius-full);
      background-color: var(--ca-color-danger);
      color: #fff;
      font-size: 10px;
      font-weight: var(--ca-font-weight-semibold);
      line-height: 16px;
      text-align: center;
      box-sizing: border-box;
    }

    /* Dropdown */
    .dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      z-index: 10;
      margin-top: 6px;
      width: 360px;
      max-height: 420px;
      background-color: var(--ca-surface-elevated);
      border: 1px solid var(--ca-border-strong);
      border-radius: var(--ca-radius-lg);
      box-shadow: var(--ca-shadow-menu);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: nc-fade-in 0.15s ease;
    }

    @keyframes nc-fade-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .dropdown-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid var(--ca-border);
    }

    .dropdown-title {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .header-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-xs);
      color: var(--ca-color-primary);
      padding: 2px 6px;
      border-radius: var(--ca-radius-sm);
      transition: background-color var(--ca-transition-fast);
    }
    .header-btn:hover {
      background-color: var(--ca-surface-hover);
    }

    .notification-list {
      overflow-y: auto;
      flex: 1;
    }

    .notification-item {
      display: flex;
      gap: 10px;
      padding: 12px 16px;
      cursor: pointer;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      font-family: var(--ca-font-family);
      box-sizing: border-box;
      transition: background-color var(--ca-transition-fast);
      border-bottom: 1px solid var(--ca-border);
    }
    .notification-item:last-child {
      border-bottom: none;
    }
    .notification-item:hover {
      background-color: var(--ca-surface-hover);
    }
    .notification-item.unread {
      background-color: var(--ca-surface-selected);
    }
    .notification-item.unread:hover {
      background-color: var(--ca-surface-hover);
    }

    .unread-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--ca-color-primary);
      flex-shrink: 0;
      margin-top: 5px;
    }
    .dot-placeholder {
      width: 8px;
      flex-shrink: 0;
    }

    .notification-content {
      flex: 1;
      min-width: 0;
    }

    .notification-title {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .notification-body {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-secondary);
      line-height: 1.4;
      margin-top: 2px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .notification-timestamp {
      font-size: 11px;
      color: var(--ca-text-muted);
      margin-top: 4px;
    }

    .empty-state {
      padding: 32px 16px;
      text-align: center;
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-muted);
    }
  `;

  @property({ type: Array }) notifications: NotificationItem[] = [];
  @property({ type: Number, attribute: 'unread-count' }) unreadCount = 0;
  @property({ type: Boolean, reflect: true }) open = false;

  private _boundClickOutside = this._handleClickOutside.bind(this);

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this._boundClickOutside);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._boundClickOutside);
  }

  private _handleClickOutside(e: MouseEvent): void {
    if (!this.open) return;
    if (!e.composedPath().includes(this)) {
      this.open = false;
    }
  }

  private _toggleDropdown(): void {
    this.open = !this.open;
  }

  private _handleNotificationClick(notification: NotificationItem): void {
    if (!notification.read) {
      this.dispatchEvent(
        new CustomEvent('ca-read', {
          detail: { id: notification.id },
          bubbles: true,
          composed: true,
        })
      );
    }
    this.dispatchEvent(
      new CustomEvent('ca-click', {
        detail: { id: notification.id },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleMarkAllRead(): void {
    for (const n of this.notifications) {
      if (!n.read) {
        this.dispatchEvent(
          new CustomEvent('ca-read', {
            detail: { id: n.id },
            bubbles: true,
            composed: true,
          })
        );
      }
    }
  }

  private _handleClearAll(): void {
    this.dispatchEvent(
      new CustomEvent('ca-clear-all', {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <button class="trigger" @click=${this._toggleDropdown} aria-label="Notifications" aria-haspopup="true" aria-expanded=${this.open}>
        <svg class="bell-icon" viewBox="0 0 24 24" fill="none">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        ${this.unreadCount > 0 ? html`<span class="badge">${this.unreadCount > 99 ? '99+' : this.unreadCount}</span>` : nothing}
      </button>

      ${this.open ? html`
        <div class="dropdown">
          <div class="dropdown-header">
            <span class="dropdown-title">Notifications</span>
            <div class="header-actions">
              <button class="header-btn" @click=${this._handleMarkAllRead}>Mark all read</button>
              <button class="header-btn" @click=${this._handleClearAll}>Clear all</button>
            </div>
          </div>
          <div class="notification-list">
            ${this.notifications.length === 0
              ? html`<div class="empty-state">No notifications</div>`
              : this.notifications.map((n) => html`
                  <button
                    class=${classMap({ 'notification-item': true, unread: !n.read })}
                    @click=${() => this._handleNotificationClick(n)}
                  >
                    ${!n.read
                      ? html`<span class="unread-dot"></span>`
                      : html`<span class="dot-placeholder"></span>`}
                    <div class="notification-content">
                      <div class="notification-title">${n.title}</div>
                      ${n.body ? html`<div class="notification-body">${n.body}</div>` : nothing}
                      <div class="notification-timestamp">${n.timestamp}</div>
                    </div>
                  </button>
                `)}
          </div>
        </div>
      ` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-notification-center': CaNotificationCenter;
  }
}
