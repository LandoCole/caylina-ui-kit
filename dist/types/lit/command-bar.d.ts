import { LitElement, nothing } from 'lit';
export interface CommandBarItem {
    id: string;
    label: string;
    icon?: string;
    group?: string;
    shortcut?: string;
}
/**
 * `<ca-command-bar>` — Keyboard-triggered command palette.
 *
 * @fires ca-select  - Dispatched when a command is selected. detail: `{ id: string }`
 * @fires ca-search  - Dispatched when the search query changes. detail: `{ query: string }`
 * @fires ca-close   - Dispatched when the command bar is dismissed.
 */
export declare class CaCommandBar extends LitElement {
    static styles: import("lit").CSSResult;
    open: boolean;
    commands: CommandBarItem[];
    placeholder: string;
    private _query;
    private _focusedIndex;
    private _searchInput;
    private _previouslyFocused;
    private _boundKeydown;
    updated(changed: Map<string, unknown>): void;
    disconnectedCallback(): void;
    private _onOpen;
    private _onClose;
    private get _filteredCommands();
    private _handleKeydown;
    private _handleSearchInput;
    private _selectCommand;
    private _emitClose;
    private _handleOverlayClick;
    render(): typeof nothing | import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-command-bar': CaCommandBar;
    }
}
