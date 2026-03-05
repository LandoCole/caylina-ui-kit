import { LitElement } from 'lit';
import './avatar.js';
import './avatar-group.js';
export interface AssigneeMember {
    value: string;
    label: string;
    src?: string;
    color?: string;
    email?: string;
}
/**
 * `<ca-assignee-selector>` — Avatar-based multi-select with search.
 * Trigger shows `ca-avatar-group`; dropdown shows searchable list with avatar + name + checkbox.
 *
 * @fires ca-change - Dispatched when selection changes. detail: `{ value: string[] }`
 */
export declare class CaAssigneeSelector extends LitElement {
    static styles: import("lit").CSSResult;
    members: AssigneeMember[];
    value: string[];
    size: 'xs' | 'sm' | 'md' | 'lg';
    borderless: boolean;
    searchable: boolean;
    private _isOpen;
    private _searchQuery;
    private _boundClickOutside;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleClickOutside;
    private _toggle;
    private _handleToggleMember;
    private get _filteredMembers();
    private get _selectedMembers();
    render(): import("lit-html").TemplateResult<1>;
    private _renderDropdown;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-assignee-selector': CaAssigneeSelector;
    }
}
