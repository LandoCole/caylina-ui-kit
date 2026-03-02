import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ca-textarea')
export class CaTextarea extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-family: var(--ca-font-family);
    }
    .label {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
      line-height: 1;
    }
    .field {
      border: 1px solid var(--ca-border-input);
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-surface);
      transition: border-color 0.15s ease;
    }
    .field:focus-within {
      border: 2px solid var(--ca-text-primary);
    }
    :host([error]) .field {
      border-color: var(--ca-text-danger);
    }
    :host([error]) .field:focus-within {
      border-color: var(--ca-text-danger);
    }
    .field.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    textarea {
      display: block;
      width: 100%;
      padding: 10px 12px;
      border: none;
      outline: none;
      background: transparent;
      color: var(--ca-text-primary);
      font-family: inherit;
      font-size: var(--ca-font-size-md);
      line-height: 1.5;
      resize: vertical;
      box-sizing: border-box;
    }
    textarea::placeholder {
      color: var(--ca-text-muted);
    }
    textarea:disabled {
      cursor: not-allowed;
      resize: none;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 16px;
    }
    .error-text {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-danger);
      line-height: 1.3;
    }
    .counter {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      margin-left: auto;
    }
    .counter-over {
      color: var(--ca-text-danger);
    }

    /* Size: xs */
    :host([size='xs']) textarea {
      padding: 6px 8px;
      font-size: var(--ca-font-size-xs);
    }
    :host([size='xs']) .field { border-radius: 6px; }

    /* Size: sm */
    :host([size='sm']) textarea {
      padding: 8px 10px;
      font-size: var(--ca-font-size-xs);
    }
    :host([size='sm']) .field { border-radius: 6px; }

    /* Size: lg */
    :host([size='lg']) textarea {
      padding: 14px 14px;
      font-size: var(--ca-font-size-lg);
    }
    :host([size='lg']) .field { border-radius: 10px; }

    /* Size: xl */
    :host([size='xl']) textarea {
      padding: 18px 16px;
      font-size: 20px;
    }
    :host([size='xl']) .field { border-radius: 12px; }
  `;

  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @property({ type: String })
  label = '';

  @property({ type: String, reflect: true })
  error = '';

  @property({ type: Number })
  maxlength?: number;

  @property({ type: Boolean })
  autoresize = false;

  @property({ type: Number })
  rows = 3;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = '';

  @state()
  _charCount = 0;

  @query('textarea')
  _textareaEl!: HTMLTextAreaElement;

  connectedCallback() {
    super.connectedCallback();
    this._charCount = this.value?.length ?? 0;
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value')) {
      this._charCount = this.value?.length ?? 0;
    }
  }

  private _handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    const val = target.value;
    this._charCount = val.length;

    if (this.autoresize) {
      target.style.height = 'auto';
      target.style.height = `${target.scrollHeight}px`;
    }

    this.dispatchEvent(
      new CustomEvent('ca-input', {
        detail: { value: val },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const isOver = this.maxlength !== undefined && this._charCount > this.maxlength;

    return html`
      ${this.label ? html`<label class="label">${this.label}</label>` : null}
      <div class=${classMap({ field: true, disabled: this.disabled })}>
        <textarea
          .value=${this.value}
          rows=${this.rows}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          maxlength=${this.maxlength ?? ''}
          @input=${this._handleInput}
          style=${this.autoresize ? 'resize: none; overflow: hidden;' : ''}
        ></textarea>
      </div>
      ${this.error || this.maxlength !== undefined
        ? html`
            <div class="footer">
              ${this.error
                ? html`<span class="error-text">${this.error}</span>`
                : html`<span></span>`}
              ${this.maxlength !== undefined
                ? html`
                    <span class=${classMap({ counter: true, 'counter-over': isOver })}>
                      ${this._charCount} / ${this.maxlength}
                    </span>
                  `
                : null}
            </div>
          `
        : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-textarea': CaTextarea;
  }
}
