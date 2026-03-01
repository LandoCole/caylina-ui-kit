import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ca-tooltip')
export class CaTooltip extends LitElement {
  static styles = css`
    :host { display: inline-flex; position: relative; }
    .tooltip { position: fixed; z-index: 9999; pointer-events: none; animation: tooltip-fade-in 0.15s ease; }
    .tooltip-content { display: block; padding: 6px 10px; background-color: var(--ca-text-primary); color: var(--ca-surface); font-family: var(--ca-font-family); font-size: 11px; line-height: 1.4; border-radius: var(--ca-radius-sm); box-shadow: var(--ca-shadow-sm); white-space: nowrap; }
    .arrow { position: absolute; width: 0; height: 0; border: 5px solid transparent; }
    .top .arrow { bottom: -10px; left: 50%; transform: translateX(-50%); border-top-color: var(--ca-text-primary); }
    .bottom .arrow { top: -10px; left: 50%; transform: translateX(-50%); border-bottom-color: var(--ca-text-primary); }
    .left .arrow { right: -10px; top: 50%; transform: translateY(-50%); border-left-color: var(--ca-text-primary); }
    .right .arrow { left: -10px; top: 50%; transform: translateY(-50%); border-right-color: var(--ca-text-primary); }
    @keyframes tooltip-fade-in { from { opacity: 0; } to { opacity: 1; } }
  `;

  @property({ type: String }) content = '';
  @property({ type: String }) position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @property({ type: Number }) delay = 300;

  @state() private _visible = false;
  @state() private _coords: { top: number; left: number } = { top: 0, left: 0 };

  private _showTimeout: ReturnType<typeof setTimeout> | null = null;
  private _hideTimeout: ReturnType<typeof setTimeout> | null = null;

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._showTimeout) clearTimeout(this._showTimeout);
    if (this._hideTimeout) clearTimeout(this._hideTimeout);
  }

  private _show() {
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }
    this._showTimeout = setTimeout(() => {
      this._updatePosition();
      this._visible = true;
    }, this.delay);
  }

  private _hide() {
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    }
    this._visible = false;
  }

  private _updatePosition() {
    const trigger = this.shadowRoot?.querySelector('slot')?.assignedElements()[0] as HTMLElement | undefined;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (this.position) {
      case 'top':
        top = rect.top - gap;
        left = rect.left + rect.width / 2;
        break;
      case 'bottom':
        top = rect.bottom + gap;
        left = rect.left + rect.width / 2;
        break;
      case 'left':
        top = rect.top + rect.height / 2;
        left = rect.left - gap;
        break;
      case 'right':
        top = rect.top + rect.height / 2;
        left = rect.right + gap;
        break;
    }

    this._coords = { top, left };
  }

  private _getTooltipStyle(): string {
    const { top, left } = this._coords;
    switch (this.position) {
      case 'top':
        return `top: ${top}px; left: ${left}px; transform: translate(-50%, -100%);`;
      case 'bottom':
        return `top: ${top}px; left: ${left}px; transform: translate(-50%, 0);`;
      case 'left':
        return `top: ${top}px; left: ${left}px; transform: translate(-100%, -50%);`;
      case 'right':
        return `top: ${top}px; left: ${left}px; transform: translate(0, -50%);`;
    }
  }

  render() {
    return html`
      <slot
        @mouseenter=${this._show}
        @mouseleave=${this._hide}
        @focus=${this._show}
        @blur=${this._hide}
      ></slot>
      ${this._visible && this.content
        ? html`
            <div
              class=${classMap({ tooltip: true, [this.position]: true })}
              role="tooltip"
              style=${this._getTooltipStyle()}
            >
              <span class="tooltip-content">${this.content}</span>
              <span class="arrow"></span>
            </div>
          `
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-tooltip': CaTooltip;
  }
}
