import { LitElement } from 'lit';
export declare class CaInput extends LitElement {
    static styles: import("lit").CSSResult;
    type: string;
    value: string;
    label: string;
    error: string;
    placeholder: string;
    disabled: boolean;
    loading: boolean;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    borderless: boolean;
    private _handleInput;
    private _handleChange;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-input': CaInput;
    }
}
