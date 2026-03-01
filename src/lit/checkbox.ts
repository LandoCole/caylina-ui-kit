import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ca-checkbox')
export class CaCheckbox extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
    .checkbox {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      user-select: none;
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
      border-radius: 8px;
      border: 2px solid transparent;
      padding: 2px;
      flex-shrink: 0;
      transition: border-color var(--ca-transition-fast);
    }
    .hidden-input:focus-visible ~ .focus-ring {
      border-color: var(--ca-text-primary);
    }
    .hidden-input:focus-visible ~ .focus-ring .box {
      border-color: var(--ca-text-primary);
    }
    .box {
      position: relative;
      flex-shrink: 0;
      border-radius: 4px;
      border: 1px solid var(--ca-border-input);
      background-color: var(--ca-surface);
      transition: background-color var(--ca-transition-fast), border-color var(--ca-transition-fast);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
    }
    .box.checked {
      background-color: var(--ca-checkbox-checked-bg, var(--ca-color-secondary));
      border-color: var(--ca-checkbox-checked-border, var(--ca-color-secondary));
    }
    .checkmark {
      opacity: 0;
      transition: opacity var(--ca-transition-fast);
      color: var(--ca-color-white);
      width: 16px;
      height: 16px;
    }
    .checkmark.visible {
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
      line-height: 1;
      color: var(--ca-text-primary);
      font-size: 14px;
    }
    .subtext {
      font-family: var(--ca-font-family);
      font-weight: 400;
      line-height: 1.3;
      color: var(--ca-text-muted);
      max-width: 320px;
      font-size: 13px;
    }

    /* Size: xs */
    :host([size='xs']) .checkbox { gap: 8px; }
    :host([size='xs']) .box { width: 16px; height: 16px; border-radius: 3px; }
    :host([size='xs']) .checkmark { width: 10px; height: 10px; }
    :host([size='xs']) .label { font-size: 10px; }
    :host([size='xs']) .subtext { font-size: 10px; }

    /* Size: sm */
    :host([size='sm']) .checkbox { gap: 10px; }
    :host([size='sm']) .box { width: 20px; height: 20px; }
    :host([size='sm']) .checkmark { width: 12px; height: 12px; }
    :host([size='sm']) .label { font-size: 12px; }
    :host([size='sm']) .subtext { font-size: 12px; }

    /* Size: md (default) */
    :host .checkbox,
    :host([size='md']) .checkbox { gap: 12px; }

    /* Size: lg */
    :host([size='lg']) .checkbox { gap: 12px; }
    :host([size='lg']) .box { width: 28px; height: 28px; border-radius: 5px; }
    :host([size='lg']) .checkmark { width: 18px; height: 18px; }
    :host([size='lg']) .label { font-size: 16px; }
    :host([size='lg']) .subtext { font-size: 14px; }

    /* Size: xl */
    :host([size='xl']) .checkbox { gap: 14px; }
    :host([size='xl']) .box { width: 32px; height: 32px; border-radius: 6px; }
    :host([size='xl']) .focus-ring { border-radius: 10px; }
    :host([size='xl']) .checkmark { width: 22px; height: 22px; }
    :host([size='xl']) .label { font-size: 18px; }
    :host([size='xl']) .subtext { font-size: 16px; }

    /* Disabled */
    :host([disabled]) .checkbox {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `;

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';
  @property({ type: String }) label = '';
  @property({ type: String }) subtext = '';

  private _handleChange(e: Event) {
    if (this.disabled) return;
    this.checked = (e.target as HTMLInputElement).checked;
    this.dispatchEvent(
      new CustomEvent('ca-change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <label class="checkbox">
        <input
          type="checkbox"
          class="hidden-input"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this._handleChange}
          aria-label=${this.label || nothing}
        />
        <span class="focus-ring">
          <span class=${classMap({ box: true, checked: this.checked })}>
            <svg
              class=${classMap({ checkmark: true, visible: this.checked })}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </span>
        ${this.label || this.subtext
          ? html`
              <span class=${classMap({ 'label-group': true, 'no-subtext': !this.subtext })}>
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
    'ca-checkbox': CaCheckbox;
  }
}
