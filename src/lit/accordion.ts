import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

@customElement('ca-accordion')
export class CaAccordion extends LitElement {
  static styles = css`
    .accordion {
      --_border: var(--ca-accordion-border, 1px solid var(--ca-border));
      width: 100%;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      overflow: hidden;
    }
    .item {
      border-top: var(--_border);
    }
    .item:first-child {
      border-top: none;
    }
    .trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      width: 100%;
      padding: 14px 16px;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-medium);
      font-size: var(--ca-font-size-md);
      line-height: 1.3;
      color: var(--ca-text-primary);
      text-align: left;
      transition: background-color var(--ca-transition-fast);
    }
    .trigger:hover {
      background-color: var(--ca-surface-hover);
    }
    .trigger:focus-visible {
      outline: 2px solid var(--ca-color-primary);
      outline-offset: -2px;
    }
    .chevron {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      transition: transform 0.2s ease;
      color: var(--ca-text-muted);
    }
    .chevron.open {
      transform: rotate(180deg);
    }
    .panel {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s ease, opacity 0.25s ease;
      opacity: 0;
    }
    .panel > .panel-content {
      overflow: hidden;
    }
    .panel.open {
      grid-template-rows: 1fr;
      opacity: 1;
    }
    .panel-content {
      padding: 0 16px 16px;
      font-size: var(--ca-font-size-sm);
      line-height: 1.55;
      color: var(--ca-text-secondary);
    }
  `;

  @property({ type: Array })
  items: AccordionItem[] = [];

  @property({ type: Boolean })
  multiple = false;

  @property({ type: Array, attribute: false })
  openIds?: string[];

  @state()
  _internalIds: string[] = [];

  private get _openIds(): string[] {
    return this.openIds ?? this._internalIds;
  }

  private _toggle(id: string) {
    const current = this._openIds;
    const next = current.includes(id)
      ? current.filter((i) => i !== id)
      : this.multiple
        ? [...current, id]
        : [id];

    if (this.openIds === undefined) {
      this._internalIds = next;
    }

    this.dispatchEvent(
      new CustomEvent('ca-open-change', {
        detail: { ids: next },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _isOpen(id: string): boolean {
    return this._openIds.includes(id);
  }

  render() {
    return html`
      <div class="accordion">
        ${this.items.map(
          (item) => html`
            <div class="item">
              <button
                class="trigger"
                @click=${() => this._toggle(item.id)}
                aria-expanded=${this._isOpen(item.id)}
                aria-controls=${`panel-${item.id}`}
              >
                <span>${item.title}</span>
                <svg
                  class=${classMap({ chevron: true, open: this._isOpen(item.id) })}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div
                id=${`panel-${item.id}`}
                class=${classMap({ panel: true, open: this._isOpen(item.id) })}
                role="region"
              >
                <div class="panel-content">${item.content}</div>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-accordion': CaAccordion;
  }
}
