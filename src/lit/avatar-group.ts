import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './avatar.js';

export interface AvatarGroupMember {
  name: string;
  src?: string;
  color?: string;
}

/**
 * `<ca-avatar-group>` — Stacked avatar display with +N overflow.
 *
 * @fires ca-click - Dispatched when the group is clicked (e.g. to open assignee selector).
 */
@customElement('ca-avatar-group')
export class CaAvatarGroup extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      cursor: default;
    }
    :host([interactive]) {
      cursor: pointer;
    }
    .stack {
      display: flex;
      align-items: center;
    }
    .stack ca-avatar {
      margin-left: -8px;
      border: 2px solid var(--ca-surface);
      border-radius: 50%;
      box-sizing: content-box;
    }
    .stack ca-avatar:first-child {
      margin-left: 0;
    }
    :host([size='xs']) .stack ca-avatar { margin-left: -5px; border-width: 1.5px; }
    :host([size='sm']) .stack ca-avatar { margin-left: -6px; border-width: 1.5px; }
    :host([size='lg']) .stack ca-avatar { margin-left: -10px; border-width: 2.5px; }

    .overflow {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: var(--ca-surface-active);
      border: 2px solid var(--ca-surface);
      color: var(--ca-text-secondary);
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-semibold);
      margin-left: -8px;
      box-sizing: content-box;
      /* md default */
      width: 40px;
      height: 40px;
      font-size: 12px;
    }
    :host([size='xs']) .overflow { width: 24px; height: 24px; font-size: 9px; margin-left: -5px; border-width: 1.5px; }
    :host([size='sm']) .overflow { width: 32px; height: 32px; font-size: 10px; margin-left: -6px; border-width: 1.5px; }
    :host([size='lg']) .overflow { width: 48px; height: 48px; font-size: 14px; margin-left: -10px; border-width: 2.5px; }
  `;

  @property({ type: Array, attribute: false })
  members: AvatarGroupMember[] = [];

  @property({ type: Number })
  max = 3;

  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean, reflect: true })
  interactive = false;

  private _handleClick() {
    if (this.interactive) {
      this.dispatchEvent(new CustomEvent('ca-click', { bubbles: true, composed: true }));
    }
  }

  render() {
    const visible = this.members.slice(0, this.max);
    const overflow = this.members.length - visible.length;

    return html`
      <div class="stack" @click=${this._handleClick}>
        ${visible.map(
          (m) => html`
            <ca-avatar
              .name=${m.name}
              .src=${m.src || ''}
              .color=${m.color || ''}
              .size=${this.size}
            ></ca-avatar>
          `
        )}
        ${overflow > 0
          ? html`<span class="overflow">+${overflow}</span>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-avatar-group': CaAvatarGroup;
  }
}
