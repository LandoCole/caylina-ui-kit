import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ca-card-button')
export class CaCardButton extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
    .wrapper {
      display: flex;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: 14px;
      box-sizing: border-box;
    }
    .wrapper:focus-visible {
      outline: none;
      padding: 3px;
    }
    .inner {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 40px;
      width: 166px;
      padding: 16px;
      border-radius: 12px;
      border: 1px solid var(--ca-border);
      background-color: var(--ca-surface);
      box-sizing: border-box;
      transition: border-color var(--ca-transition-fast), background-color var(--ca-transition-fast);
    }
    .wrapper:hover .inner {
      border-color: var(--ca-text-primary);
    }
    .wrapper:active .inner {
      border-color: var(--ca-text-primary);
      transform: scale(0.97);
    }
    .wrapper:focus-visible .inner {
      border-color: var(--ca-border);
    }
    .inner.selected {
      background-color: var(--ca-surface-hover);
      border: 1px solid var(--ca-text-primary);
    }
    .icon-slot {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      color: var(--ca-text-primary);
    }
    .icon-slot ::slotted(svg) {
      width: 32px;
      height: 32px;
    }
    .default-icon {
      width: 100%;
      height: 100%;
      color: inherit;
    }
    .label {
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-semibold);
      font-size: 16px;
      line-height: 1;
      color: var(--ca-text-primary);
      white-space: nowrap;
    }

    /* xs */
    :host([size='xs']) .inner { width: 100px; gap: 16px; padding: 10px; border-radius: 8px; }
    :host([size='xs']) .icon-slot { width: 20px; height: 20px; }
    :host([size='xs']) .icon-slot ::slotted(svg) { width: 20px; height: 20px; }
    :host([size='xs']) .label { font-size: var(--ca-font-size-xs); }

    /* sm */
    :host([size='sm']) .inner { width: 130px; gap: 24px; padding: 12px; border-radius: 10px; }
    :host([size='sm']) .icon-slot { width: 24px; height: 24px; }
    :host([size='sm']) .icon-slot ::slotted(svg) { width: 24px; height: 24px; }
    :host([size='sm']) .label { font-size: var(--ca-font-size-sm); }

    /* lg */
    :host([size='lg']) .inner { width: 200px; gap: 48px; padding: 20px; border-radius: 14px; }
    :host([size='lg']) .icon-slot { width: 40px; height: 40px; }
    :host([size='lg']) .icon-slot ::slotted(svg) { width: 40px; height: 40px; }
    :host([size='lg']) .label { font-size: 18px; }

    /* xl */
    :host([size='xl']) .inner { width: 240px; gap: 56px; padding: 24px; border-radius: 16px; }
    :host([size='xl']) .icon-slot { width: 48px; height: 48px; }
    :host([size='xl']) .icon-slot ::slotted(svg) { width: 48px; height: 48px; }
    :host([size='xl']) .label { font-size: 20px; }
  `;

  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: String, reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @property({ type: String }) label = '';
  @state() private _hasIcon = false;

  private _onIconSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasIcon = slot.assignedNodes({ flatten: true }).length > 0;
  }

  private _handleClick() {
    this.selected = !this.selected;
    this.dispatchEvent(
      new CustomEvent('ca-change', {
        detail: { selected: this.selected },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <button class="wrapper" @click=${this._handleClick} aria-pressed=${this.selected}>
        <div class=${classMap({ inner: true, selected: this.selected })}>
          <span class="icon-slot">
            <slot name="icon" @slotchange=${this._onIconSlotChange}></slot>
            ${!this._hasIcon ? html`
              <svg class="default-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            ` : nothing}
          </span>
          ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
        </div>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-card-button': CaCardButton;
  }
}
