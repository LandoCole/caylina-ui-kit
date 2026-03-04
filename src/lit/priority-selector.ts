import { html, css, type CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ColorPillBase, type ColorPillOption } from './utils/color-pill-base.js';

/**
 * `<ca-priority-selector>` — Colored pill dropdown for task priorities.
 * Extends ColorPillBase with icon support (priority arrows).
 *
 * @fires ca-change - Dispatched when a priority is selected. detail: `{ value: string }`
 * @fires ca-create - Dispatched when "Create new" is clicked (when allow-create is set).
 */
@customElement('ca-priority-selector')
export class CaPrioritySelector extends ColorPillBase {
  static override styles: CSSResultGroup = [
    ColorPillBase.styles,
    css`
      .priority-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 14px;
        height: 14px;
        flex-shrink: 0;
      }
      .priority-icon svg {
        width: 100%;
        height: 100%;
      }
    `,
  ];

  protected renderOptionIcon(option: ColorPillOption) {
    // If option has an icon string, render it; otherwise fall back to dot
    if (option.icon) {
      return html`<span class="priority-icon" style="color: ${option.color}">${this._getIconSvg(option.icon)}</span>`;
    }
    return html`<span class="option-dot" style="background-color: ${option.color}"></span>`;
  }

  private _getIconSvg(icon: string) {
    switch (icon) {
      case 'urgent':
        return html`<svg viewBox="0 0 16 16" fill="none"><path d="M8 3v6M8 11v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
      case 'high':
        return html`<svg viewBox="0 0 16 16" fill="none"><path d="M8 12V4M4 7l4-3 4 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      case 'medium':
        return html`<svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
      case 'low':
        return html`<svg viewBox="0 0 16 16" fill="none"><path d="M8 4v8M4 9l4 3 4-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      default:
        return html`<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="4" fill="currentColor"/></svg>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-priority-selector': CaPrioritySelector;
  }
}
