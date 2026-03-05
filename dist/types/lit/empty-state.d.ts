import { LitElement } from 'lit';
export declare class CaEmptyState extends LitElement {
    static styles: import("lit").CSSResult;
    heading: string;
    description: string;
    actionLabel: string;
    private _handleAction;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-empty-state': CaEmptyState;
    }
}
