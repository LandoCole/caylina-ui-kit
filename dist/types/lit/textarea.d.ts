import { LitElement } from 'lit';
export declare class CaTextarea extends LitElement {
    static styles: import("lit").CSSResult;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    label: string;
    error: string;
    maxlength?: number;
    autoresize: boolean;
    rows: number;
    disabled: boolean;
    value: string;
    placeholder: string;
    _charCount: number;
    _textareaEl: HTMLTextAreaElement;
    connectedCallback(): void;
    updated(changedProperties: Map<string, unknown>): void;
    private _handleInput;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-textarea': CaTextarea;
    }
}
