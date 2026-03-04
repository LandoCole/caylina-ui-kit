import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * `<ca-rich-text-editor>` — WYSIWYG editor with toolbar.
 * Uses contentEditable as the editing surface. For production use with
 * full rich text features, lazy-load Tiptap/ProseMirror from CDN.
 *
 * @fires ca-change - Dispatched when content changes. detail: `{ value }` (HTML string)
 * @fires ca-mention - Dispatched when @ is typed. detail: `{ query }`
 */
@customElement('ca-rich-text-editor')
export class CaRichTextEditor extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--ca-font-family);
    }
    .editor-wrapper {
      border: 1px solid var(--ca-border-input);
      border-radius: var(--ca-radius-md);
      overflow: hidden;
      background: var(--ca-surface);
      transition: border-color var(--ca-transition-fast);
    }
    .editor-wrapper:focus-within {
      border-color: var(--ca-text-primary);
    }
    :host([readonly]) .editor-wrapper {
      background: var(--ca-surface-active);
    }

    /* ── Toolbar ── */
    .toolbar {
      display: flex;
      align-items: center;
      gap: 2px;
      padding: 6px 8px;
      border-bottom: 1px solid var(--ca-border);
      flex-wrap: wrap;
    }
    .toolbar-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: var(--ca-radius-sm);
      background: none;
      cursor: pointer;
      color: var(--ca-text-secondary);
      padding: 0;
      transition: background-color var(--ca-transition-fast), color var(--ca-transition-fast);
    }
    .toolbar-btn:hover {
      background: var(--ca-surface-hover);
      color: var(--ca-text-primary);
    }
    .toolbar-btn.active {
      background: var(--ca-surface-active);
      color: var(--ca-text-primary);
    }
    .toolbar-btn svg {
      width: 16px;
      height: 16px;
    }
    .toolbar-divider {
      width: 1px;
      height: 20px;
      background: var(--ca-border);
      margin: 0 4px;
    }

    /* ── Editor area ── */
    .editor {
      padding: 12px;
      outline: none;
      font-size: var(--ca-font-size-md);
      color: var(--ca-text-primary);
      line-height: 1.6;
      min-height: var(--ca-rte-min-height, 120px);
      max-height: 400px;
      overflow-y: auto;
    }
    .editor:empty::before {
      content: attr(data-placeholder);
      color: var(--ca-text-muted);
      pointer-events: none;
    }
    .editor p { margin: 0 0 8px; }
    .editor h1 { font-size: 1.5em; margin: 0 0 8px; font-weight: var(--ca-font-weight-semibold); }
    .editor h2 { font-size: 1.25em; margin: 0 0 8px; font-weight: var(--ca-font-weight-semibold); }
    .editor h3 { font-size: 1.1em; margin: 0 0 8px; font-weight: var(--ca-font-weight-semibold); }
    .editor ul, .editor ol { margin: 0 0 8px; padding-left: 24px; }
    .editor blockquote {
      margin: 0 0 8px;
      padding: 8px 16px;
      border-left: 3px solid var(--ca-border-strong);
      color: var(--ca-text-secondary);
    }
    .editor code {
      background: var(--ca-surface-active);
      padding: 2px 4px;
      border-radius: var(--ca-radius-sm);
      font-size: 0.9em;
    }
    .editor pre {
      background: var(--ca-surface-active);
      padding: 12px;
      border-radius: var(--ca-radius-md);
      overflow-x: auto;
      margin: 0 0 8px;
    }
    .editor a { color: var(--ca-color-link); }
    .editor img { max-width: 100%; border-radius: var(--ca-radius-md); }
  `;

  /** HTML content */
  @property({ type: String }) value = '';

  @property({ type: String }) placeholder = 'Write something...';

  /** Toolbar buttons to show. Default: common formatting options. */
  @property({ type: Array, attribute: false })
  toolbar: string[] = ['bold', 'italic', 'underline', '|', 'h1', 'h2', '|', 'ul', 'ol', '|', 'blockquote', 'code', '|', 'link'];

  @property({ type: Boolean, reflect: true }) readonly = false;

  @property({ type: String, attribute: 'min-height' }) minHeight = '';

  @state() private _activeFormats: Set<string> = new Set();

  @query('.editor') private _editor!: HTMLElement;

  private _debounceTimer: ReturnType<typeof setTimeout> | null = null;

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('value') && this._editor) {
      // Only update if the editor content is different (avoid caret reset)
      if (this._editor.innerHTML !== this.value) {
        this._editor.innerHTML = this.value;
      }
    }
  }

  private _handleInput() {
    if (this._debounceTimer) clearTimeout(this._debounceTimer);
    this._debounceTimer = setTimeout(() => {
      const content = this._editor?.innerHTML || '';
      this.dispatchEvent(
        new CustomEvent('ca-change', {
          detail: { value: content },
          bubbles: true,
          composed: true,
        })
      );
    }, 150);

    this._updateActiveFormats();
    this._checkMention();
  }

  private _handleKeyDown(e: KeyboardEvent) {
    // Bold/italic/underline shortcuts
    if (e.metaKey || e.ctrlKey) {
      if (e.key === 'b') { e.preventDefault(); this._execCommand('bold'); }
      if (e.key === 'i') { e.preventDefault(); this._execCommand('italic'); }
      if (e.key === 'u') { e.preventDefault(); this._execCommand('underline'); }
    }
  }

  private _execCommand(command: string, value?: string) {
    if (this.readonly) return;
    this._editor?.focus();

    switch (command) {
      case 'bold':
        document.execCommand('bold');
        break;
      case 'italic':
        document.execCommand('italic');
        break;
      case 'underline':
        document.execCommand('underline');
        break;
      case 'h1':
        document.execCommand('formatBlock', false, '<h1>');
        break;
      case 'h2':
        document.execCommand('formatBlock', false, '<h2>');
        break;
      case 'ul':
        document.execCommand('insertUnorderedList');
        break;
      case 'ol':
        document.execCommand('insertOrderedList');
        break;
      case 'blockquote':
        document.execCommand('formatBlock', false, '<blockquote>');
        break;
      case 'code':
        document.execCommand('formatBlock', false, '<pre>');
        break;
      case 'link': {
        const url = prompt('Enter URL:');
        if (url) document.execCommand('createLink', false, url);
        break;
      }
    }

    this._updateActiveFormats();
    this._handleInput();
  }

  private _updateActiveFormats() {
    const formats = new Set<string>();
    if (document.queryCommandState('bold')) formats.add('bold');
    if (document.queryCommandState('italic')) formats.add('italic');
    if (document.queryCommandState('underline')) formats.add('underline');
    if (document.queryCommandState('insertUnorderedList')) formats.add('ul');
    if (document.queryCommandState('insertOrderedList')) formats.add('ol');
    this._activeFormats = formats;
  }

  private _checkMention() {
    const selection = (this.shadowRoot as any)?.getSelection?.() || window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    const text = range.startContainer.textContent || '';
    const pos = range.startOffset;
    // Look for @ before cursor
    const before = text.substring(0, pos);
    const atIdx = before.lastIndexOf('@');
    if (atIdx >= 0 && (atIdx === 0 || before[atIdx - 1] === ' ')) {
      const query = before.substring(atIdx + 1);
      this.dispatchEvent(
        new CustomEvent('ca-mention', {
          detail: { query },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private _getToolbarIcon(cmd: string) {
    switch (cmd) {
      case 'bold':
        return html`<svg viewBox="0 0 16 16" fill="none"><path d="M4 2h5a3 3 0 012 5.2A3 3 0 0110 14H4V2z" stroke="currentColor" stroke-width="1.5"/><path d="M4 8h6" stroke="currentColor" stroke-width="1.5"/></svg>`;
      case 'italic':
        return html`<svg viewBox="0 0 16 16" fill="none"><path d="M10 2H6M10 14H6M9 2L7 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
      case 'underline':
        return html`<svg viewBox="0 0 16 16" fill="none"><path d="M4 2v5a4 4 0 008 0V2M3 14h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
      case 'h1':
        return html`<svg viewBox="0 0 16 16" fill="none"><text x="2" y="12" font-size="11" font-weight="bold" fill="currentColor">H1</text></svg>`;
      case 'h2':
        return html`<svg viewBox="0 0 16 16" fill="none"><text x="2" y="12" font-size="11" font-weight="bold" fill="currentColor">H2</text></svg>`;
      case 'ul':
        return html`<svg viewBox="0 0 16 16" fill="none"><circle cx="3" cy="4" r="1.5" fill="currentColor"/><circle cx="3" cy="8" r="1.5" fill="currentColor"/><circle cx="3" cy="12" r="1.5" fill="currentColor"/><path d="M6 4h8M6 8h8M6 12h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
      case 'ol':
        return html`<svg viewBox="0 0 16 16" fill="none"><text x="1" y="6" font-size="8" fill="currentColor">1.</text><text x="1" y="10" font-size="8" fill="currentColor">2.</text><text x="1" y="14" font-size="8" fill="currentColor">3.</text><path d="M6 4h8M6 8h8M6 12h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
      case 'blockquote':
        return html`<svg viewBox="0 0 16 16" fill="none"><path d="M3 3v10M6 5h7M6 8h5M6 11h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
      case 'code':
        return html`<svg viewBox="0 0 16 16" fill="none"><path d="M5 4L1 8l4 4M11 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      case 'link':
        return html`<svg viewBox="0 0 16 16" fill="none"><path d="M7 9l2-2M6 12l-1 1a2.5 2.5 0 01-3.5-3.5l1-1M10 4l1-1a2.5 2.5 0 013.5 3.5l-1 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
      default:
        return nothing;
    }
  }

  render() {
    return html`
      <div class="editor-wrapper">
        ${!this.readonly
          ? html`
              <div class="toolbar">
                ${this.toolbar.map((cmd) =>
                  cmd === '|'
                    ? html`<div class="toolbar-divider"></div>`
                    : html`
                        <button
                          class=${classMap({ 'toolbar-btn': true, active: this._activeFormats.has(cmd) })}
                          @click=${() => this._execCommand(cmd)}
                          title=${cmd}
                          type="button"
                        >
                          ${this._getToolbarIcon(cmd)}
                        </button>
                      `
                )}
              </div>
            `
          : nothing}
        <div
          class="editor"
          contenteditable=${this.readonly ? 'false' : 'true'}
          data-placeholder=${this.placeholder}
          style=${this.minHeight ? `min-height:${this.minHeight}` : ''}
          @input=${this._handleInput}
          @keydown=${this._handleKeyDown}
          @mouseup=${() => this._updateActiveFormats()}
          @keyup=${() => this._updateActiveFormats()}
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-rich-text-editor': CaRichTextEditor;
  }
}
