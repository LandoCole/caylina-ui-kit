import { LitElement } from 'lit';
export declare class CaBadge extends LitElement {
    static styles: import("lit").CSSResult;
    variant: 'default' | 'success' | 'warning' | 'danger';
    size: 'sm' | 'md';
    dot: boolean;
    /** Arbitrary background color (overrides variant). */
    color: string;
    updated(changedProperties: Map<string, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-badge': CaBadge;
    }
}
