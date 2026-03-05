import { LitElement } from 'lit';
export declare class CaAvatar extends LitElement {
    static styles: import("lit").CSSResult;
    src: string;
    alt: string;
    name: string;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    status?: 'online' | 'offline' | 'away';
    /** Dynamic background color (overrides default primary). */
    color: string;
    _imgError: boolean;
    private _getInitials;
    private _handleImgError;
    updated(changedProperties: Map<string, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-avatar': CaAvatar;
    }
}
