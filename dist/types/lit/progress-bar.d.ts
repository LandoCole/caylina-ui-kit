import { LitElement } from 'lit';
export interface ProgressSegment {
    value: number;
    color: string;
    label?: string;
}
export declare class CaProgressBar extends LitElement {
    static styles: import("lit").CSSResult;
    value: number;
    max: number;
    showLabel: boolean;
    size: 'sm' | 'md';
    labelSuffix: string;
    /** Dynamic fill color (overrides default primary). */
    color: string;
    /** Stacked mode: array of segments for multi-segment progress (e.g. group headers). */
    segments: ProgressSegment[];
    private get _percent();
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-progress-bar': CaProgressBar;
    }
}
