import { LitElement, nothing } from 'lit';
export interface BulkAction {
    id: string;
    label: string;
    icon?: string;
}
export declare class CaBulkActionBar extends LitElement {
    static styles: import("lit").CSSResult;
    count: number;
    open: boolean;
    actions: BulkAction[];
    private _closing;
    private _handleAction;
    private _handleClear;
    render(): typeof nothing | import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-bulk-action-bar': CaBulkActionBar;
    }
}
