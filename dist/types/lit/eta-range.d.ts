import { LitElement } from 'lit';
export interface EtaPeriod {
    label: string;
    periodStart: string;
    periodEnd: string;
    earliestDate: string;
    latestDate: string;
}
export type EtaFrequency = 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
/**
 * `<ca-eta-range>` — Displays ETA date ranges organized by period with
 * toggleable timeline (bar) and list views.
 *
 * @fires ca-view-change - Dispatched when the view toggle is clicked. Detail: `{ view: 'timeline' | 'list' }`.
 */
export declare class CaEtaRange extends LitElement {
    static styles: import("lit").CSSResult;
    periods: EtaPeriod[];
    frequency: EtaFrequency;
    view: 'timeline' | 'list';
    heading: string;
    private _setView;
    private _frequencyLabel;
    private _renderHeader;
    private _renderTimeline;
    private _renderList;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-eta-range': CaEtaRange;
    }
}
