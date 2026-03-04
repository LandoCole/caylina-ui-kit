import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
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
@customElement('ca-comment-thread')
export class CaCommentThread extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--ca-font-family);
    }

    /* ── Comment list ── */
    .comments {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .comment {
      display: flex;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid var(--ca-border);
    }
    .comment:last-child {
      border-bottom: none;
    }
    .comment-avatar {
      flex-shrink: 0;
      padding-top: 2px;
    }
    .comment-body {
      flex: 1;
      min-width: 0;
    }
    .comment-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .comment-name {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
      line-height: 1;
    }
    .comment-time {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      line-height: 1;
    }
    .comment-edited {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      font-style: italic;
      line-height: 1;
    }
    .comment-text {
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .comment-actions {
      display: flex;
      gap: 4px;
      margin-top: 6px;
    }
    .action-btn {
      padding: 2px 8px;
      border: none;
      border-radius: var(--ca-radius-sm);
      background: none;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      cursor: pointer;
      line-height: 1.4;
      transition: color var(--ca-transition-fast),
        background-color var(--ca-transition-fast);
    }
    .action-btn:hover {
      color: var(--ca-text-primary);
      background-color: var(--ca-surface-hover);
    }
    .action-btn.danger:hover {
      color: var(--ca-color-danger);
    }
    .action-btn:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: 1px;
    }

    /* ── Edit mode ── */
    .edit-area {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 4px;
    }
    .edit-textarea {
      width: 100%;
      padding: 8px 10px;
      border: 1px solid var(--ca-border-input);
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-surface);
      color: var(--ca-text-primary);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      line-height: 1.5;
      resize: vertical;
      box-sizing: border-box;
    }
    .edit-textarea:focus {
      outline: none;
      border: 2px solid var(--ca-text-primary);
    }
    .edit-buttons {
      display: flex;
      gap: 6px;
    }
    .edit-save-btn,
    .edit-cancel-btn {
      padding: 4px 12px;
      border-radius: var(--ca-radius-md);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-xs);
      font-weight: var(--ca-font-weight-semibold);
      cursor: pointer;
      line-height: 1.4;
      border: 1px solid var(--ca-border);
    }
    .edit-save-btn {
      background-color: var(--ca-color-primary);
      color: var(--ca-color-white);
      border-color: var(--ca-color-primary);
    }
    .edit-save-btn:hover {
      background-color: var(--ca-color-primary-pressed);
    }
    .edit-cancel-btn {
      background-color: var(--ca-surface);
      color: var(--ca-text-primary);
    }
    .edit-cancel-btn:hover {
      background-color: var(--ca-surface-hover);
    }

    /* ── Input area ── */
    .input-area {
      display: flex;
      gap: 12px;
      padding-top: 16px;
      border-top: 1px solid var(--ca-border);
      margin-top: 4px;
    }
    .input-avatar {
      flex-shrink: 0;
      padding-top: 2px;
    }
    .input-form {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .input-textarea {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--ca-border-input);
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-surface);
      color: var(--ca-text-primary);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      line-height: 1.5;
      resize: vertical;
      box-sizing: border-box;
    }
    .input-textarea::placeholder {
      color: var(--ca-text-muted);
    }
    .input-textarea:focus {
      outline: none;
      border: 2px solid var(--ca-text-primary);
    }
    .submit-row {
      display: flex;
      justify-content: flex-end;
    }
    .submit-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 8px 16px;
      border: none;
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-color-primary);
      color: var(--ca-color-white);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      cursor: pointer;
      transition: background-color var(--ca-transition-fast);
    }
    .submit-btn:hover {
      background-color: var(--ca-color-primary-pressed);
    }
    .submit-btn:disabled {
      background-color: var(--ca-color-disabled);
      color: var(--ca-color-disabled-text);
      cursor: not-allowed;
    }
    .submit-btn:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: 2px;
    }
  `;

  @property({ type: Array })
  comments: Comment[] = [];

  @property({ type: Object, attribute: 'current-user' })
  currentUser: CommentUser = { name: '' };

  @state()
  private _editingId: string | null = null;

  @state()
  private _editText = '';

  @state()
  private _newText = '';

  @query('.input-textarea')
  private _inputEl!: HTMLTextAreaElement;

  private _startEdit(comment: Comment) {
    this._editingId = comment.id;
    this._editText = comment.text;
  }

  private _cancelEdit() {
    this._editingId = null;
    this._editText = '';
  }

  private _saveEdit() {
    if (!this._editingId || !this._editText.trim()) return;
    this.dispatchEvent(
      new CustomEvent('ca-edit', {
        detail: { id: this._editingId, text: this._editText.trim() },
        bubbles: true,
        composed: true,
      })
    );
    this._editingId = null;
    this._editText = '';
  }

  private _handleDelete(id: string) {
    this.dispatchEvent(
      new CustomEvent('ca-delete', {
        detail: { id },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleSubmit() {
    if (!this._newText.trim()) return;
    this.dispatchEvent(
      new CustomEvent('ca-submit', {
        detail: { text: this._newText.trim() },
        bubbles: true,
        composed: true,
      })
    );
    this._newText = '';
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      this._handleSubmit();
    }
  }

  render() {
    return html`
      <div class="comments">
        ${this.comments.map((comment) =>
          this._editingId === comment.id
            ? this._renderEditMode(comment)
            : this._renderComment(comment)
        )}
      </div>
      ${this._renderInput()}
    `;
  }

  private _renderComment(comment: Comment) {
    return html`
      <div class="comment">
        <div class="comment-avatar">
          <ca-avatar
            size="sm"
            name=${comment.user.name}
            src=${comment.user.src ?? ''}
          ></ca-avatar>
        </div>
        <div class="comment-body">
          <div class="comment-header">
            <span class="comment-name">${comment.user.name}</span>
            <span class="comment-time">${comment.timestamp}</span>
            ${comment.edited
              ? html`<span class="comment-edited">(edited)</span>`
              : nothing}
          </div>
          <div class="comment-text">${comment.text}</div>
          <div class="comment-actions">
            <button
              class="action-btn"
              @click=${() => this._startEdit(comment)}
            >
              Edit
            </button>
            <button
              class="action-btn danger"
              @click=${() => this._handleDelete(comment.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private _renderEditMode(comment: Comment) {
    return html`
      <div class="comment">
        <div class="comment-avatar">
          <ca-avatar
            size="sm"
            name=${comment.user.name}
            src=${comment.user.src ?? ''}
          ></ca-avatar>
        </div>
        <div class="comment-body">
          <div class="comment-header">
            <span class="comment-name">${comment.user.name}</span>
          </div>
          <div class="edit-area">
            <textarea
              class="edit-textarea"
              rows="3"
              .value=${this._editText}
              @input=${(e: Event) => {
                this._editText = (e.target as HTMLTextAreaElement).value;
              }}
            ></textarea>
            <div class="edit-buttons">
              <button class="edit-save-btn" @click=${this._saveEdit}>
                Save
              </button>
              <button class="edit-cancel-btn" @click=${this._cancelEdit}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderInput() {
    return html`
      <div class="input-area">
        <div class="input-avatar">
          <ca-avatar
            size="sm"
            name=${this.currentUser.name}
            src=${this.currentUser.src ?? ''}
          ></ca-avatar>
        </div>
        <div class="input-form">
          <textarea
            class="input-textarea"
            rows="2"
            placeholder="Write a comment..."
            .value=${this._newText}
            @input=${(e: Event) => {
              this._newText = (e.target as HTMLTextAreaElement).value;
            }}
            @keydown=${this._handleKeydown}
          ></textarea>
          <div class="submit-row">
            <button
              class="submit-btn"
              ?disabled=${!this._newText.trim()}
              @click=${this._handleSubmit}
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-comment-thread': CaCommentThread;
  }
}
