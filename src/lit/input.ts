import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('ca-input')
export class CaInput extends LitElement {
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
      display: flex;
      align-items: center;
      gap: 8px;
      border: 1px solid var(--ca-border-input);
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-surface);
      transition: border-color var(--ca-transition-fast);
      box-sizing: border-box;
      padding: 10px 12px;
      font-size: var(--ca-font-size-md);
    }
    .field:focus-within {
      border: 2px solid var(--ca-text-primary);
    }
    .field.has-error {
      border-color: var(--ca-text-danger);
    }
    .field.has-error:focus-within {
      border-color: var(--ca-text-danger);
    }
    .native {
      flex: 1;
      min-width: 0;
      border: none;
      outline: none;
      background: transparent;
      color: var(--ca-text-primary);
      font-family: inherit;
      font-size: inherit;
      line-height: 1;
    }
    .native::placeholder {
      color: var(--ca-text-muted);
    }
    .native:disabled {
      cursor: not-allowed;
    }
    .icon, .icon-after {
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
      color: var(--ca-text-secondary);
    }
    .icon ::slotted(svg), .icon-after ::slotted(svg) {
      width: 1em;
      height: 1em;
    }
    .error-message {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-danger);
      line-height: 1.3;
    }
    .loader {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: var(--ca-text-secondary);
      animation: pulse 1.4s ease-in-out infinite;
    }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes pulse {
      0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
      40% { opacity: 1; transform: scale(1); }
    }

    /* Size: xs */
    :host([size='xs']) .field {
      padding: 6px 8px;
      font-size: var(--ca-font-size-xs);
      border-radius: 6px;
      gap: 6px;
    }
    /* Size: sm */
    :host([size='sm']) .field {
      padding: 8px 10px;
      font-size: var(--ca-font-size-xs);
      border-radius: 6px;
    }
    /* Size: lg */
    :host([size='lg']) .field {
      padding: 14px 14px;
      font-size: var(--ca-font-size-lg);
      border-radius: 10px;
    }
    /* Size: xl */
    :host([size='xl']) .field {
      padding: 18px 16px;
      font-size: 20px;
      border-radius: 12px;
      gap: 10px;
    }

    /* Disabled */
    :host([disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  @property({ type: String }) type = 'text';
  @property({ type: String }) value = '';
  @property({ type: String }) label = '';
  @property({ type: String }) error = '';
  @property({ type: String }) placeholder = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: String, reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(
      new CustomEvent('ca-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(
      new CustomEvent('ca-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const hasError = !!this.error;
    return html`
      ${this.label ? html`<label class="label">${this.label}</label>` : nothing}
      <div class=${classMap({ field: true, 'has-error': hasError })}>
        <span class="icon"><slot name="icon"></slot></span>
        <input
          class="native"
          type=${this.type}
          .value=${this.value}
          placeholder=${ifDefined(this.placeholder || undefined)}
          ?disabled=${this.disabled}
          aria-invalid=${ifDefined(hasError ? 'true' : undefined)}
          @input=${this._handleInput}
          @change=${this._handleChange}
        />
        ${this.loading
          ? html`<span class="loader"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>`
          : html`<span class="icon-after"><slot name="icon-after"></slot></span>`}
      </div>
      ${hasError ? html`<span class="error-message">${this.error}</span>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-input': CaInput;
  }
}
