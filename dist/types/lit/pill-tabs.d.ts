import { LitElement } from 'lit';
export interface PillTab {
    id: string;
    label: string;
    count?: string | number;
}
export declare class CaPillTabs extends LitElement {
    static styles: import("lit").CSSResult;
    tabs: PillTab[];
    activeId: string;
    filled: boolean;
    private _handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-pill-tabs': CaPillTabs;
    }
}
