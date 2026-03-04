import { LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ca-skeleton')
export class CaSkeleton extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: var(--ca-surface-hover);
      overflow: hidden;
      position: relative;
    }

    /* Variants */
    :host([variant='text']), :host(:not([variant])) {
      border-radius: var(--ca-radius-sm);
      height: 1em;
    }
    :host([variant='circle']) {
      border-radius: var(--ca-radius-full);
    }
    :host([variant='rect']) {
      border-radius: 0;
    }

    /* Pulse animation */
    :host([animation='pulse']), :host(:not([animation])) {
      animation: pulse 1.5s ease-in-out infinite;
    }

    /* Wave animation */
    :host([animation='wave'])::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        var(--ca-surface-elevated, rgba(255, 255, 255, 0.4)) 50%,
        transparent 100%
      );
      animation: wave 1.6s linear infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    @keyframes wave {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `;

  @property({ type: String, reflect: true }) variant: 'text' | 'circle' | 'rect' = 'text';
  @property({ type: String }) width = '';
  @property({ type: String }) height = '';
  @property({ type: String, reflect: true }) animation: 'pulse' | 'wave' = 'pulse';

  updated(changedProperties: Map<string, unknown>) {
    super.updated?.(changedProperties);
    if (changedProperties.has('width')) {
      if (this.width) {
        this.style.width = this.width;
      } else {
        this.style.removeProperty('width');
      }
    }
    if (changedProperties.has('height')) {
      if (this.height) {
        this.style.height = this.height;
      } else {
        this.style.removeProperty('height');
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-skeleton': CaSkeleton;
  }
}
