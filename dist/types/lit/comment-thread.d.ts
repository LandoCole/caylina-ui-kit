import { LitElement } from 'lit';
import './avatar.js';
export interface CommentUser {
    name: string;
    src?: string;
}
export interface Comment {
    id: string;
    user: CommentUser;
    text: string;
    timestamp: string;
    edited?: boolean;
}
/**
 * `<ca-comment-thread>` — Comment list with input.
 *
 * @fires ca-submit - Dispatched when a new comment is submitted. Detail: `{ text }`.
 * @fires ca-edit - Dispatched when a comment is edited. Detail: `{ id, text }`.
 * @fires ca-delete - Dispatched when a comment is deleted. Detail: `{ id }`.
 */
export declare class CaCommentThread extends LitElement {
    static styles: import("lit").CSSResult;
    comments: Comment[];
    currentUser: CommentUser;
    private _editingId;
    private _editText;
    private _newText;
    private _inputEl;
    private _startEdit;
    private _cancelEdit;
    private _saveEdit;
    private _handleDelete;
    private _handleSubmit;
    private _handleKeydown;
    render(): import("lit-html").TemplateResult<1>;
    private _renderComment;
    private _renderEditMode;
    private _renderInput;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-comment-thread': CaCommentThread;
    }
}
