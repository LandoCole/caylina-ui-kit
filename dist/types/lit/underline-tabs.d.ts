import { LitElement } from 'lit';
export interface UnderlineTab {
    id: string;
    label: string;
    icon?: string;
}
export declare class CaUnderlineTabs extends LitElement {
    static styles: import("lit").CSSResult;
    tabs: UnderlineTab[];
    activeId: string;
    private _handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-underline-tabs': CaUnderlineTabs;
    }
}
