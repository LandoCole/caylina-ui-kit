import { LitElement } from 'lit';
export interface AccordionItem {
    id: string;
    title: string;
    content: string;
}
export declare class CaAccordion extends LitElement {
    static styles: import("lit").CSSResult;
    items: AccordionItem[];
    multiple: boolean;
    openIds?: string[];
    _internalIds: string[];
    private get _openIds();
    private _toggle;
    private _isOpen;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-accordion': CaAccordion;
    }
}
