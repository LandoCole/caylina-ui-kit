import { LitElement } from 'lit';
import './avatar.js';
export interface AvatarGroupMember {
    name: string;
    src?: string;
    color?: string;
}
/**
 * `<ca-avatar-group>` — Stacked avatar display with +N overflow.
 *
 * @fires ca-click - Dispatched when the group is clicked (e.g. to open assignee selector).
 */
export declare class CaAvatarGroup extends LitElement {
    static styles: import("lit").CSSResult;
    members: AvatarGroupMember[];
    max: number;
    size: 'xs' | 'sm' | 'md' | 'lg';
    interactive: boolean;
    private _handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-avatar-group': CaAvatarGroup;
    }
}
