import { LitElement } from 'lit';
export declare class CaCardButton extends LitElement {
    static styles: import("lit").CSSResult;
    selected: boolean;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    label: string;
    private _hasIcon;
    private _onIconSlotChange;
    private _handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-card-button': CaCardButton;
    }
}
