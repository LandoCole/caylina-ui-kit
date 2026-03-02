import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ca-link')
export class CaLink extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
    .link {
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-semibold);
      line-height: 1;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      border: 2px solid transparent;
      border-radius: var(--ca-radius-link-focus);
      padding: 2px;
      transition: border-color var(--ca-transition-fast);
      box-sizing: border-box;
      font-size: var(--ca-font-size-md);
    }
    .link:focus-visible {
      outline: none;
    }

    /* Subtle */
    .link.subtle {
      color: var(--ca-text-primary);
    }
    .link.subtle:hover {
      color: var(--ca-text-primary);
    }
    .link.subtle:focus-visible {
      border-color: var(--ca-text-primary);
    }

    /* Legal */
    .link.legal {
      color: var(--ca-color-link);
      text-decoration: underline;
      text-decoration-skip-ink: none;
    }
    .link.legal:hover {
      color: var(--ca-color-link);
    }
    .link.legal:focus-visible {
      border-color: var(--ca-color-link);
      border-radius: var(--ca-radius-link-focus-sm);
    }

    /* Sizes */
    :host([size='sm']) .link {
      font-size: 12px;
      font-feature-settings: 'kern' 0;
    }
    :host([size='sm']) .link.subtle {
      text-decoration: underline;
      text-decoration-skip-ink: none;
    }

    /* Icon */
    .icon-after {
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
    }
    .icon-after ::slotted(svg),
    .icon-after ::slotted(img) {
      width: 1em;
      height: 1em;
    }
  `;

  @property({ type: String }) href = '';
  @property({ type: String }) target = '';
  @property({ type: String, reflect: true }) type: 'subtle' | 'legal' = 'subtle';
  @property({ type: String, reflect: true }) size: 'md' | 'sm' = 'md';

  render() {
    return html`
      <a
        class=${classMap({
          link: true,
          [this.type]: true,
        })}
        href=${this.href}
        target=${ifDefined(this.target || undefined)}
      >
        <slot></slot>
        <span class="icon-after"><slot name="icon"></slot></span>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-link': CaLink;
  }
}
