import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ca-button')
export class CaButton extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-semibold);
      line-height: 1;
      white-space: nowrap;
      position: relative;
      transition: background-color var(--ca-transition-fast), border-color var(--ca-transition-fast), opacity var(--ca-transition-fast);
      box-sizing: border-box;
      text-decoration: none;
      padding: 14px 24px;
      font-size: var(--ca-font-size-sm);
      border-radius: var(--ca-radius-button);
    }
    .button:focus-visible {
      outline: none;
    }

    /* Sizes */
    .button.xs { padding: 6px 12px; font-size: var(--ca-font-size-xs); }
    .button.sm { padding: 8px 16px; font-size: var(--ca-font-size-sm); }
    .button.md { padding: 14px 24px; font-size: var(--ca-font-size-sm); }
    .button.lg { padding: 16px 32px; font-size: var(--ca-font-size-lg); }
    .button.xl { padding: 20px 40px; font-size: var(--ca-font-size-lg); }

    /* Primary */
    .button.primary {
      background-color: var(--ca-color-primary);
      color: var(--ca-color-white);
    }
    .button.primary:hover:not(:disabled):not(.loading) {
      background-color: var(--ca-color-primary-pressed);
    }
    .button.primary:focus-visible {
      border: 2px solid var(--ca-color-focus-ring);
    }
    .button.primary:disabled,
    .button.primary.loading {
      background-color: var(--ca-color-disabled);
      color: var(--ca-color-disabled-text);
      cursor: not-allowed;
    }

    /* Secondary */
    .button.secondary {
      background-color: var(--ca-color-secondary);
      color: var(--ca-color-secondary-text, var(--ca-color-white));
    }
    .button.secondary:hover:not(:disabled):not(.loading) {
      opacity: 0.8;
    }
    .button.secondary:focus-visible {
      border: 2px solid var(--ca-color-focus-ring);
    }
    .button.secondary:disabled,
    .button.secondary.loading {
      background-color: var(--ca-color-disabled);
      color: var(--ca-color-disabled-text);
      cursor: not-allowed;
    }

    /* Tertiary */
    .button.tertiary {
      background-color: transparent;
      color: var(--ca-text-primary);
      border: 1px solid var(--ca-text-primary);
    }
    .button.tertiary:hover:not(:disabled):not(.loading) {
      background-color: var(--ca-color-secondary-hover);
    }
    .button.tertiary:focus-visible {
      border-width: 2.5px;
      border-color: var(--ca-text-primary);
    }
    .button.tertiary:disabled,
    .button.tertiary.loading {
      background-color: var(--ca-color-disabled);
      color: var(--ca-color-disabled-text);
      border-color: transparent;
      cursor: not-allowed;
    }

    /* Danger */
    .button.danger {
      background-color: var(--ca-color-danger);
      color: var(--ca-color-white);
    }
    .button.danger:hover:not(:disabled):not(.loading) {
      background-color: var(--ca-color-danger-pressed);
    }
    .button.danger:focus-visible {
      border: 2px solid var(--ca-color-focus-ring);
    }
    .button.danger:disabled,
    .button.danger.loading {
      background-color: var(--ca-color-disabled);
      color: var(--ca-color-disabled-text);
      cursor: not-allowed;
    }

    /* Icon */
    .icon-slot {
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
    }
    .icon-slot ::slotted(svg),
    .icon-slot ::slotted(img) {
      width: 1em;
      height: 1em;
    }

    /* Loading */
    .loading {
      pointer-events: none;
    }
    .spinner {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--ca-color-disabled-text);
      animation: pulse 1.4s ease-in-out infinite;
    }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes pulse {
      0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
      40% { opacity: 1; transform: scale(1); }
    }
  `;

  @property({ type: String, reflect: true }) variant: 'primary' | 'secondary' | 'tertiary' | 'danger' = 'primary';
  @property({ type: String, reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) loading = false;

  render() {
    const classes = {
      button: true,
      [this.variant]: true,
      [this.size]: true,
      loading: this.loading,
    };

    return html`
      <button
        class=${classMap(classes)}
        ?disabled=${this.disabled}
        aria-busy=${this.loading ? 'true' : nothing}
      >
        ${this.loading
          ? html`<span class="spinner"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>`
          : html`<span class="icon-slot"><slot name="icon"></slot></span><slot></slot>`}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-button': CaButton;
  }
}
