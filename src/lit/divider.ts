import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ca-divider')
export class CaDivider extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    hr {
      border: none;
      background-color: var(--ca-divider);
      margin: 0;
      padding: 0;
      flex-shrink: 0;
    }

    /* Horizontal */
    :host([orientation='horizontal']) hr, hr {
      width: 100%;
      height: 1px;
    }

    /* Vertical */
    :host([orientation='vertical']) {
      display: inline-block;
      align-self: stretch;
    }
    :host([orientation='vertical']) hr {
      width: 1px;
      height: 100%;
    }

    /* Spacing - horizontal */
    :host([spacing='sm']) hr { margin-top: var(--ca-space-sm); margin-bottom: var(--ca-space-sm); }
    :host([spacing='md']) hr { margin-top: var(--ca-space-md); margin-bottom: var(--ca-space-md); }
    :host([spacing='lg']) hr { margin-top: var(--ca-space-lg); margin-bottom: var(--ca-space-lg); }

    /* Spacing - vertical */
    :host([orientation='vertical'][spacing='sm']) hr { margin-left: var(--ca-space-sm); margin-right: var(--ca-space-sm); margin-top: 0; margin-bottom: 0; }
    :host([orientation='vertical'][spacing='md']) hr { margin-left: var(--ca-space-md); margin-right: var(--ca-space-md); margin-top: 0; margin-bottom: 0; }
    :host([orientation='vertical'][spacing='lg']) hr { margin-left: var(--ca-space-lg); margin-right: var(--ca-space-lg); margin-top: 0; margin-bottom: 0; }
  `;

  @property({ type: String, reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ type: String, reflect: true }) spacing: 'sm' | 'md' | 'lg' | '' = '';

  render() {
    return html`<hr role="separator" aria-orientation=${this.orientation} />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-divider': CaDivider;
  }
}
