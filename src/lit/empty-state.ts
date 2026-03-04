import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ca-empty-state')
export class CaEmptyState extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: var(--ca-space-xl) var(--ca-space-lg);
      font-family: var(--ca-font-family);
      color: var(--ca-text-primary);
    }
    .illustration {
      margin-bottom: var(--ca-space-md);
      color: var(--ca-text-tertiary);
    }
    .illustration ::slotted(*) {
      max-width: 160px;
      max-height: 160px;
    }
    .heading {
      margin: 0 0 8px;
      font-size: var(--ca-font-size-lg);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
    }
    .description {
      margin: 0 0 var(--ca-space-md);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-secondary);
      max-width: 360px;
      line-height: 1.5;
    }
    .action-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 20px;
      border: none;
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-color-primary);
      color: var(--ca-color-white);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      cursor: pointer;
      line-height: 1;
    }
    .action-btn:hover {
      opacity: 0.9;
    }
    .action-btn:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: 2px;
    }
  `;

  @property({ type: String }) heading = '';
  @property({ type: String }) description = '';
  @property({ type: String, attribute: 'action-label' }) actionLabel = '';

  private _handleAction() {
    this.dispatchEvent(
      new CustomEvent('ca-action', {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="illustration">
        <slot></slot>
      </div>
      ${this.heading ? html`<h3 class="heading">${this.heading}</h3>` : nothing}
      ${this.description ? html`<p class="description">${this.description}</p>` : nothing}
      ${this.actionLabel
        ? html`<button class="action-btn" @click=${this._handleAction}>${this.actionLabel}</button>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-empty-state': CaEmptyState;
  }
}
