import { LitElement } from 'lit';
import './avatar.js';
export interface ActivityTimelineEntry {
    id: string;
    user: {
        name: string;
        src?: string;
    };
    action: string;
    timestamp: string;
    details?: string;
}
/**
 * `<ca-activity-timeline>` — Vertical activity log.
 *
 * @fires ca-load-more - Dispatched when the "Load more" button is clicked.
 */
export declare class CaActivityTimeline extends LitElement {
    static styles: import("lit").CSSResult;
    entries: ActivityTimelineEntry[];
    loading: boolean;
    private _handleLoadMore;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-activity-timeline': CaActivityTimeline;
    }
}
