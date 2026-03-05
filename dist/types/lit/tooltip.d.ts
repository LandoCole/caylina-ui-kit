import { LitElement } from 'lit';
export declare class CaTooltip extends LitElement {
    static styles: import("lit").CSSResult;
    content: string;
    position: 'top' | 'bottom' | 'left' | 'right';
    delay: number;
    private _visible;
    private _coords;
    private _showTimeout;
    private _hideTimeout;
    disconnectedCallback(): void;
    private _show;
    private _hide;
    private _updatePosition;
    private _getTooltipStyle;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-tooltip': CaTooltip;
    }
}
