import { LitElement } from 'lit';
/**
 * `<ca-rich-text-editor>` — WYSIWYG editor with toolbar.
 * Uses contentEditable as the editing surface. For production use with
 * full rich text features, lazy-load Tiptap/ProseMirror from CDN.
 *
 * @fires ca-change - Dispatched when content changes. detail: `{ value }` (HTML string)
 * @fires ca-mention - Dispatched when @ is typed. detail: `{ query }`
 */
export declare class CaRichTextEditor extends LitElement {
    static styles: import("lit").CSSResult;
    /** HTML content */
    value: string;
    placeholder: string;
    /** Toolbar buttons to show. Default: common formatting options. */
    toolbar: string[];
    readonly: boolean;
    minHeight: string;
    private _activeFormats;
    private _editor;
    private _debounceTimer;
    updated(changedProps: Map<string, unknown>): void;
    private _handleInput;
    private _handleKeyDown;
    private _execCommand;
    private _updateActiveFormats;
    private _checkMention;
    private _getToolbarIcon;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-rich-text-editor': CaRichTextEditor;
    }
}
