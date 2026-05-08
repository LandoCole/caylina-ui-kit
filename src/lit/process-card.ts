import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export interface ProcessStep {
  key: string;
  label: string;
}

@customElement('ca-process-card')
export class CaProcessCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--ca-font-family);
    }

    .card {
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      overflow: hidden;
      background: var(--ca-surface);
      transition: border-color var(--ca-transition-fast),
                  opacity var(--ca-transition-fast),
                  box-shadow var(--ca-transition-fast);
    }
    .card.expanded {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }
    .card.status-pending {
      opacity: 0.55;
    }
    .card.status-complete {
      border-color: color-mix(in srgb, var(--ca-color-success) 30%, var(--ca-border));
    }
    .card.status-error {
      border-color: color-mix(in srgb, var(--ca-color-danger) 40%, var(--ca-border));
    }

    /* ── Progress bar ── */
    .progress-bar {
      height: 2.5px;
      background: var(--ca-border);
      position: relative;
    }
    .progress-fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-radius: 0 2px 2px 0;
      transition: width 0.4s ease, background-color 0.3s ease;
    }
    .status-processing .progress-fill {
      background: var(--ca-color-primary);
    }
    .status-complete .progress-fill {
      background: var(--ca-color-success);
    }
    .status-error .progress-fill {
      background: var(--ca-color-danger);
    }
    .status-processing .progress-fill {
      animation: progress-pulse 1.5s ease-in-out infinite;
    }

    @keyframes progress-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }

    /* ── Header ── */
    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      cursor: pointer;
      user-select: none;
    }
    .header:focus-visible {
      outline: 2px solid var(--ca-color-focus-ring);
      outline-offset: -2px;
      border-radius: var(--ca-radius-sm);
    }
    :host([size='sm']) .header {
      padding: 8px 12px;
      gap: 8px;
    }

    .icon-slot {
      flex-shrink: 0;
    }

    .content {
      flex: 1;
      min-width: 0;
    }
    .heading {
      font-size: var(--ca-font-size-md);
      color: var(--ca-text-primary);
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .status-processing .heading,
    .status-complete .heading {
      font-weight: var(--ca-font-weight-semibold);
    }
    :host([size='sm']) .heading {
      font-size: var(--ca-font-size-sm);
    }

    .subheading {
      font-size: var(--ca-font-size-xs);
      margin-top: 2px;
      line-height: 1.3;
    }
    .status-processing .subheading {
      color: var(--ca-color-primary);
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .status-complete .subheading {
      color: var(--ca-color-success);
    }
    .status-error .subheading {
      color: var(--ca-color-danger);
    }
    .status-pending .subheading {
      color: var(--ca-text-muted);
    }

    .pulse-dot {
      display: inline-block;
      width: 5px;
      height: 5px;
      background: var(--ca-color-primary);
      border-radius: 50%;
      animation: dot-pulse 1s ease-in-out infinite;
    }
    @keyframes dot-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    /* ── Status pill ── */
    .pill {
      flex-shrink: 0;
      font-size: 10px;
      font-weight: var(--ca-font-weight-semibold);
      padding: 2px 8px;
      border-radius: var(--ca-radius-full);
      white-space: nowrap;
    }
    .pill-pending {
      color: var(--ca-text-muted);
      background: var(--ca-surface-hover);
    }
    .pill-complete {
      color: var(--ca-color-white);
      background: var(--ca-color-success);
    }
    .pill-error {
      color: var(--ca-color-white);
      background: var(--ca-color-danger);
    }

    .actions-slot {
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }

    /* ── Chevron ── */
    .chevron {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      color: var(--ca-text-muted);
      transition: transform 0.2s ease, color var(--ca-transition-fast);
    }
    .chevron.open {
      transform: rotate(180deg);
      color: var(--ca-text-primary);
    }

    /* ── Accordion panel ── */
    .panel {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s ease, opacity 0.25s ease;
      opacity: 0;
    }
    .panel.open {
      grid-template-rows: 1fr;
      opacity: 1;
    }
    .panel-inner {
      overflow: hidden;
    }
    .panel-content {
      padding: 16px;
      border-top: 1px solid var(--ca-divider);
      background: var(--ca-surface-hover);
    }
    :host([size='sm']) .panel-content {
      padding: 12px;
    }

    /* ── Dark mode ── */
    :host([data-theme='dark']) .card.expanded,
    :host-context([data-theme='dark']) .card.expanded {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
  `;

  @property({ type: Array })
  steps: ProcessStep[] = [];

  @property({ type: String, attribute: 'current-step' })
  currentStep: string | null = null;

  @property({ type: String, reflect: true })
  status: 'pending' | 'processing' | 'complete' | 'error' = 'pending';

  @property({ type: String })
  heading = '';

  @property({ type: String })
  subheading = '';

  @property({ type: Boolean, reflect: true })
  expanded = false;

  @property({ type: String, reflect: true })
  size: 'sm' | 'md' = 'md';

  private get _stepIndex(): number {
    if (!this.currentStep || this.steps.length === 0) return -1;
    return this.steps.findIndex((s) => s.key === this.currentStep);
  }

  private get _progressPercent(): number {
    if (this.status === 'complete') return 100;
    if (this.status === 'pending') return 0;
    const idx = this._stepIndex;
    if (idx < 0 || this.steps.length === 0) return 0;
    // Show progress as (current step index + 1) / total steps
    return ((idx + 1) / this.steps.length) * 100;
  }

  private get _subheadingText(): string {
    if (this.subheading) return this.subheading;
    if (this.status === 'processing') {
      const idx = this._stepIndex;
      if (idx >= 0) {
        return `Step ${idx + 1} of ${this.steps.length} — ${this.steps[idx].label}`;
      }
    }
    return '';
  }

  private get _defaultPillText(): string {
    switch (this.status) {
      case 'pending': return 'Pending';
      case 'complete': return 'Ready';
      case 'error': return 'Error';
      default: return '';
    }
  }

  private _onToggle() {
    this.dispatchEvent(
      new CustomEvent('ca-toggle', {
        detail: { expanded: !this.expanded },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const cardClasses = {
      card: true,
      expanded: this.expanded,
      [`status-${this.status}`]: true,
    };

    const subText = this._subheadingText;
    const pillText = this._defaultPillText;

    return html`
      <div class=${classMap(cardClasses)}>
        <!-- Progress bar -->
        <div class="progress-bar">
          <div
            class="progress-fill"
            style="width: ${this._progressPercent}%"
          ></div>
        </div>

        <!-- Header -->
        <div
          class="header"
          role="button"
          tabindex="0"
          aria-expanded=${this.expanded}
          @click=${this._onToggle}
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              this._onToggle();
            }
          }}
        >
          <span class="icon-slot">
            <slot name="icon"></slot>
          </span>

          <div class="content">
            <div class="heading">${this.heading}</div>
            ${subText
              ? html`
                  <div class="subheading">
                    ${this.status === 'processing'
                      ? html`<span class="pulse-dot"></span>`
                      : nothing}
                    ${subText}
                  </div>
                `
              : nothing}
          </div>

          <slot name="status">
            ${pillText
              ? html`<span class="pill pill-${this.status}">${pillText}</span>`
              : nothing}
          </slot>

          <span class="actions-slot">
            <slot name="actions"></slot>
          </span>

          <svg
            class=${classMap({ chevron: true, open: this.expanded })}
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
        </div>

        <!-- Accordion panel -->
        <div class=${classMap({ panel: true, open: this.expanded })} role="region">
          <div class="panel-inner">
            <div class="panel-content">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-process-card': CaProcessCard;
  }
}
