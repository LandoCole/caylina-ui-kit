import { LitElement } from 'lit';
export declare class CaSkeleton extends LitElement {
    static styles: import("lit").CSSResult;
    variant: 'text' | 'circle' | 'rect';
    width: string;
    height: string;
    animation: 'pulse' | 'wave';
    updated(changedProperties: Map<string, unknown>): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-skeleton': CaSkeleton;
    }
}
