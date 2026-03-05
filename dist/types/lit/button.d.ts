import { LitElement } from 'lit';
export declare class CaButton extends LitElement {
    static styles: import("lit").CSSResult;
    variant: 'primary' | 'secondary' | 'tertiary' | 'danger';
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    disabled: boolean;
    loading: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-button': CaButton;
    }
}
