import { LitElement } from 'lit';
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
export declare class CaNotificationCenter extends LitElement {
    static styles: import("lit").CSSResult;
    notifications: NotificationItem[];
    unreadCount: number;
    open: boolean;
    private _boundClickOutside;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleClickOutside;
    private _toggleDropdown;
    private _handleNotificationClick;
    private _handleMarkAllRead;
    private _handleClearAll;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-notification-center': CaNotificationCenter;
    }
}
