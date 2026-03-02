import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ca-radio')
export class CaRadio extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
    .radio {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      position: relative;
      user-select: none;
    }
    .radio.has-subtext {
      align-items: flex-start;
      gap: 16px;
    }
    .hidden-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }
    .focus-ring {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 2px solid transparent;
      padding: 2px;
      flex-shrink: 0;
      transition: border-color var(--ca-transition-fast);
    }
    .hidden-input:focus-visible ~ .focus-ring {
      border-color: var(--ca-text-primary);
    }
    .hidden-input:focus-visible ~ .focus-ring .circle {
      border-color: var(--ca-text-primary);
    }
    .circle {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1px solid var(--ca-border);
      background-color: var(--ca-surface);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: border-color var(--ca-transition-fast);
      box-sizing: border-box;
    }
    .circle.checked {
      border: 2px solid var(--ca-radio-checked-color, var(--ca-color-secondary));
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--ca-radio-checked-color, var(--ca-color-secondary));
      opacity: 0;
      transition: opacity var(--ca-transition-fast);
    }
    .dot.visible {
      opacity: 1;
    }
    .label-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding-top: 2px;
    }
    .label-group.no-subtext {
      padding-top: 0;
    }
    .label {
      font-family: var(--ca-font-family);
      font-weight: 400;
      font-size: 16px;
      line-height: 1;
      color: var(--ca-text-primary);
    }
    .subtext {
      font-family: var(--ca-font-family);
      font-weight: 400;
      font-size: 14px;
      line-height: 1.3;
      color: var(--ca-text-muted);
      max-width: 320px;
    }

    /* Size: xs */
    :host([size='xs']) .radio { gap: 8px; }
    :host([size='xs']) .circle { width: 16px; height: 16px; }
    :host([size='xs']) .dot { width: 5px; height: 5px; }
    :host([size='xs']) .label { font-size: 10px; }
    :host([size='xs']) .subtext { font-size: 10px; }

    /* Size: sm (default) */
    :host([size='sm']) .radio { gap: 10px; }
    :host([size='sm']) .circle { width: 20px; height: 20px; }
    :host([size='sm']) .dot { width: 6px; height: 6px; }
    :host([size='sm']) .label { font-size: 12px; }
    :host([size='sm']) .subtext { font-size: 12px; }

    /* Size: md */
    :host([size='md']) .radio { gap: 12px; }

    /* Size: lg */
    :host([size='lg']) .radio { gap: 12px; }
    :host([size='lg']) .circle { width: 28px; height: 28px; }
    :host([size='lg']) .dot { width: 10px; height: 10px; }
    :host([size='lg']) .label { font-size: 16px; }
    :host([size='lg']) .subtext { font-size: 14px; }

    /* Size: xl */
    :host([size='xl']) .radio { gap: 14px; }
    :host([size='xl']) .circle { width: 32px; height: 32px; }
    :host([size='xl']) .dot { width: 12px; height: 12px; }
    :host([size='xl']) .label { font-size: 18px; }
    :host([size='xl']) .subtext { font-size: 16px; }

    /* Disabled */
    :host([disabled]) .radio {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `;

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @property({ type: String }) name = '';
  @property({ type: String }) value = '';
  @property({ type: String }) label = '';
  @property({ type: String }) subtext = '';

  private _handleClick() {
    if (this.disabled || this.checked) return;
    this.checked = true;
    this.dispatchEvent(
      new CustomEvent('ca-change', {
        detail: { value: this.value, name: this.name },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._handleClick();
    }
  }

  render() {
    const hasSubtext = !!this.subtext;
    return html`
      <label
        class=${classMap({ radio: true, 'has-subtext': hasSubtext })}
        @click=${this._handleClick}
      >
        <input
          type="radio"
          class="hidden-input"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          name=${this.name || nothing}
          value=${this.value}
          @keydown=${this._handleKeyDown}
          aria-label=${this.label || nothing}
        />
        <span class="focus-ring">
          <span class=${classMap({ circle: true, checked: this.checked })}>
            <span class=${classMap({ dot: true, visible: this.checked })}></span>
          </span>
        </span>
        ${this.label || this.subtext
          ? html`
              <span class=${classMap({ 'label-group': true, 'no-subtext': !hasSubtext })}>
                ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
                ${this.subtext ? html`<span class="subtext">${this.subtext}</span>` : nothing}
              </span>
            `
          : nothing}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-radio': CaRadio;
  }
}
