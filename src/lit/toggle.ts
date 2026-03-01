import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ca-toggle')
export class CaToggle extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
    .toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      user-select: none;
    }
    .toggle.with-subtext {
      justify-content: flex-start;
      gap: 16px;
    }
    .hidden-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      margin: 0;
      pointer-events: none;
    }
    .focus-ring {
      display: flex;
      flex-shrink: 0;
      border-radius: 28px;
      border: 2px solid transparent;
      padding: 2px;
      transition: border-color var(--ca-transition-fast);
    }
    .hidden-input:focus-visible ~ .focus-ring {
      border-color: var(--ca-text-primary);
    }
    .track {
      position: relative;
      width: 48px;
      height: 32px;
      border-radius: 37px;
      background-color: var(--ca-toggle-track-bg, var(--ca-border-strong));
      transition: background-color var(--ca-transition-normal);
      flex-shrink: 0;
    }
    .toggle:hover .track {
      background-color: var(--ca-text-muted);
    }
    .track.checked {
      background-color: var(--ca-toggle-active-bg, var(--ca-toggle-active));
    }
    .toggle:hover .track.checked {
      background-color: var(--ca-toggle-active-bg, var(--ca-toggle-active));
    }
    .thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background-color: var(--ca-toggle-thumb-bg, var(--ca-color-white));
      box-shadow: var(--ca-shadow-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: left var(--ca-transition-normal);
    }
    .thumb.checked {
      left: 19px;
    }
    .check-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      color: var(--ca-toggle-active);
      opacity: 0;
      transition: opacity var(--ca-transition-fast);
    }
    .check-icon.checked {
      opacity: 1;
    }
    .label-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-top: 2px;
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
    }

    /* Size: sm */
    :host([size='sm']) .focus-ring {
      border-radius: 20px;
      padding: 1px;
    }
    :host([size='sm']) .track {
      width: 36px;
      height: 22px;
      border-radius: 28px;
    }
    :host([size='sm']) .thumb {
      top: 2px;
      left: 2px;
      width: 18px;
      height: 18px;
    }
    :host([size='sm']) .thumb.checked {
      left: 16px;
    }
    :host([size='sm']) .check-icon {
      width: 12px;
      height: 12px;
    }
    :host([size='sm']) .label {
      font-size: 14px;
    }
    :host([size='sm']) .subtext {
      font-size: 12px;
    }

    /* Disabled */
    :host([disabled]) .toggle {
      cursor: not-allowed;
      opacity: 0.5;
    }
    :host([disabled]) .track {
      background-color: var(--ca-color-disabled) !important;
      cursor: not-allowed;
    }
    :host([disabled]) .thumb {
      box-shadow: none;
    }
  `;

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' = 'md';
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
    const hasSubtext = !!this.subtext;
    return html`
      <label
        class=${classMap({ toggle: true, 'with-subtext': hasSubtext })}
      >
        <input
          type="checkbox"
          class="hidden-input"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this._handleChange}
          aria-label=${this.label || nothing}
        />
        <span class="focus-ring">
          <span class=${classMap({ track: true, checked: this.checked })}>
            <span class=${classMap({ thumb: true, checked: this.checked })}>
              <span class=${classMap({ 'check-icon': true, checked: this.checked })}>
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                  <path d="M3.5 8.5L6.5 11.5L12.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </span>
          </span>
        </span>
        ${this.label || this.subtext
          ? html`
              <span class="label-group">
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
    'ca-toggle': CaToggle;
  }
}
