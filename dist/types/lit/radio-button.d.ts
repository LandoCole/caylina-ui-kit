import { LitElement } from 'lit';
export declare class CaRadio extends LitElement {
    static styles: import("lit").CSSResult;
    checked: boolean;
    disabled: boolean;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    name: string;
    value: string;
    label: string;
    subtext: string;
    private _handleClick;
    private _handleKeyDown;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-radio': CaRadio;
    }
}
