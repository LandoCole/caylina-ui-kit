import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ca-avatar')
export class CaAvatar extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
    .avatar {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--ca-avatar-radius, 9999px);
      background-color: var(--ca-avatar-bg, var(--ca-color-primary));
      color: var(--ca-avatar-color, var(--ca-color-white));
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-semibold);
      overflow: hidden;
      flex-shrink: 0;
      user-select: none;
      /* md default */
      width: 40px;
      height: 40px;
      font-size: 14px;
    }
    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    .initials {
      line-height: 1;
    }
    /* Sizes */
    :host([size='xs']) .avatar {
      width: 24px;
      height: 24px;
      font-size: 10px;
    }
    :host([size='sm']) .avatar {
      width: 32px;
      height: 32px;
      font-size: 12px;
    }
    :host([size='lg']) .avatar {
      width: 48px;
      height: 48px;
      font-size: 16px;
    }
    :host([size='xl']) .avatar {
      width: 64px;
      height: 64px;
      font-size: 20px;
    }
    /* Status dot */
    .status {
      position: absolute;
      bottom: 0;
      right: 0;
      border-radius: 50%;
      border: 2px solid var(--ca-surface);
      box-sizing: content-box;
      width: 10px;
      height: 10px;
    }
    :host([size='xs']) .status,
    :host([size='sm']) .status {
      width: 8px;
      height: 8px;
    }
    :host([size='xl']) .status {
      width: 12px;
      height: 12px;
    }
    .status-online {
      background-color: var(--ca-avatar-status-online, var(--ca-color-success));
    }
    .status-offline {
      background-color: var(--ca-avatar-status-offline, var(--ca-border-strong));
    }
    .status-away {
      background-color: var(--ca-avatar-status-away, var(--ca-color-warning));
    }
  `;

  @property({ type: String })
  src = '';

  @property({ type: String })
  alt = '';

  @property({ type: String })
  name = '';

  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @property({ type: String })
  status?: 'online' | 'offline' | 'away';

  @state()
  _imgError = false;

  private _getInitials(name: string): string {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  private _handleImgError() {
    this._imgError = true;
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('src')) {
      this._imgError = false;
    }
  }

  render() {
    const showImage = this.src && !this._imgError;
    const initials = this._getInitials(this.name);

    return html`
      <div class="avatar" role="img" aria-label=${this.alt || this.name || 'avatar'}>
        ${showImage
          ? html`
              <img
                class="image"
                src=${this.src}
                alt=${this.alt || this.name || ''}
                @error=${this._handleImgError}
              />
            `
          : html`<span class="initials">${initials}</span>`}
        ${this.status
          ? html`
              <span
                class=${classMap({
                  status: true,
                  'status-online': this.status === 'online',
                  'status-offline': this.status === 'offline',
                  'status-away': this.status === 'away',
                })}
              ></span>
            `
          : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-avatar': CaAvatar;
  }
}
