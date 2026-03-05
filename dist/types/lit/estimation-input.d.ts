import { LitElement } from 'lit';
/**
 * `<ca-estimation-input>` — Compact numeric input with unit label.
 *
 * @fires ca-change - Dispatched when the value changes. detail: `{ value: number }`
 */
export declare class CaEstimationInput extends LitElement {
    static styles: import("lit").CSSResult;
    value: number;
    unit: 'hours' | 'points' | 'days';
    borderless: boolean;
    size: 'xs' | 'sm' | 'md' | 'lg';
    private get _unitLabel();
    private _handleInput;
    private _handleChange;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-estimation-input': CaEstimationInput;
    }
}
