import { LitElement } from 'lit';
export declare class CaCheckbox extends LitElement {
    static styles: import("lit").CSSResult;
    checked: boolean;
    disabled: boolean;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    label: string;
    subtext: string;
    private _handleChange;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-checkbox': CaCheckbox;
    }
}
