import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MONTH_NAMES_SHORT, parseISODateString } from './date-utils.js';

export interface EtaPeriod {
  label: string;
  periodStart: string;
  periodEnd: string;
  earliestDate: string;
  latestDate: string;
}

export type EtaFrequency = 'monthly' | 'quarterly' | 'semi-annual' | 'annual';

function shortDate(d: Date): string {
  return `${MONTH_NAMES_SHORT[d.getMonth()]} ${d.getDate()}`;
}

function fullDate(d: Date): string {
  return `${MONTH_NAMES_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function daysBetween(a: Date, b: Date): number {
  return Math.round(Math.abs(b.getTime() - a.getTime()) / 86_400_000);
}

/**
 * `<ca-eta-range>` — Displays ETA date ranges organized by period with
 * toggleable timeline (bar) and list views.
 *
 * @fires ca-view-change - Dispatched when the view toggle is clicked. Detail: `{ view: 'timeline' | 'list' }`.
 */
@customElement('ca-eta-range')
export class CaEtaRange extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--ca-font-family);
    }

    /* ── Header ── */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .heading {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
    }
    .frequency {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      font-weight: 400;
      margin-left: 6px;
    }

    /* ── View Toggle ── */
    .toggle {
      display: flex;
      background: var(--ca-surface-active);
      border-radius: 6px;
      padding: 2px;
    }
    .toggle-btn {
      all: unset;
      padding: 4px 10px;
      border-radius: var(--ca-radius-sm);
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      cursor: pointer;
      line-height: 1;
      transition: background var(--ca-transition-fast), color var(--ca-transition-fast);
    }
    .toggle-btn[aria-pressed="true"] {
      background: var(--ca-color-primary);
      color: var(--ca-color-on-primary);
    }

    /* ── Timeline View ── */
    .period-block {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .period-block + .period-block {
      margin-top: 4px;
      padding-top: 8px;
      border-top: 1px solid var(--ca-border);
    }
    .period-header {
      display: flex;
      align-items: baseline;
      gap: 10px;
    }
    .period-label {
      font-size: var(--ca-font-size-xs);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
      width: 48px;
      flex-shrink: 0;
    }
    .period-bounds {
      font-size: 10px;
      color: var(--ca-text-muted);
    }
    .bar-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .bar-spacer {
      width: 48px;
      flex-shrink: 0;
    }
    .bar-track {
      flex: 1;
      height: 26px;
      background: var(--ca-surface-active);
      border-radius: 6px;
      position: relative;
      overflow: hidden;
    }
    .bar-fill {
      position: absolute;
      height: 100%;
      background: linear-gradient(90deg, var(--ca-color-primary), color-mix(in srgb, var(--ca-color-primary) 70%, white));
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
      min-width: 90px;
      box-sizing: border-box;
    }
    .bar-date {
      font-size: 10px;
      color: var(--ca-color-on-primary);
      font-weight: 500;
      white-space: nowrap;
    }
    .duration {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-secondary);
      width: 36px;
      flex-shrink: 0;
      text-align: right;
      font-weight: 500;
    }

    /* ── List View ── */
    .list-row {
      display: flex;
      align-items: center;
      padding: 9px 0;
    }
    .list-row + .list-row {
      border-top: 1px solid var(--ca-border);
    }
    .list-badge {
      font-size: var(--ca-font-size-xs);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-color-primary);
      background: color-mix(in srgb, var(--ca-color-primary) 10%, transparent);
      padding: 2px 8px;
      border-radius: var(--ca-radius-sm);
      width: fit-content;
      flex-shrink: 0;
      margin-right: 12px;
    }
    .list-dates {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .list-date-group {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .list-micro-label {
      font-family: var(--ca-font-family-mono);
      font-size: 9px;
      color: var(--ca-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .list-date-value {
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      font-weight: 500;
    }
    .list-arrow {
      flex: 0 0 24px;
      text-align: center;
      color: var(--ca-text-muted);
      font-size: 12px;
      opacity: 0.5;
    }
  `;

  @property({ type: Array }) periods: EtaPeriod[] = [];
  @property({ type: String }) frequency: EtaFrequency = 'quarterly';
  @property({ type: String, reflect: true }) view: 'timeline' | 'list' = 'timeline';
  @property({ type: String }) heading = 'ETA Ranges';

  private _setView(v: 'timeline' | 'list') {
    this.view = v;
    this.dispatchEvent(new CustomEvent('ca-view-change', {
      detail: { view: v },
      bubbles: true,
      composed: true,
    }));
  }

  private _frequencyLabel(): string {
    switch (this.frequency) {
      case 'monthly': return 'Monthly';
      case 'quarterly': return 'Quarterly';
      case 'semi-annual': return 'Semi-Annual';
      case 'annual': return 'Annual';
      default: return this.frequency;
    }
  }

  private _renderHeader() {
    return html`
      <div class="header">
        <div>
          <span class="heading">${this.heading}</span>
          <span class="frequency">${this._frequencyLabel()}</span>
        </div>
        <div class="toggle">
          <button
            class="toggle-btn"
            aria-pressed="${this.view === 'timeline'}"
            @click=${() => this._setView('timeline')}
            title="Timeline view"
          >&#9707;</button>
          <button
            class="toggle-btn"
            aria-pressed="${this.view === 'list'}"
            @click=${() => this._setView('list')}
            title="List view"
          >&equiv;</button>
        </div>
      </div>
    `;
  }

  private _renderTimeline() {
    return this.periods.map(p => {
      const pStart = parseISODateString(p.periodStart);
      const pEnd = parseISODateString(p.periodEnd);
      const earliest = parseISODateString(p.earliestDate);
      const latest = parseISODateString(p.latestDate);
      if (!pStart || !pEnd || !earliest || !latest) return nothing;

      const totalMs = pEnd.getTime() - pStart.getTime();
      const leftPct = totalMs > 0 ? ((earliest.getTime() - pStart.getTime()) / totalMs) * 100 : 0;
      const rightPct = totalMs > 0 ? ((pEnd.getTime() - latest.getTime()) / totalMs) * 100 : 0;
      const days = daysBetween(earliest, latest);

      return html`
        <div class="period-block">
          <div class="period-header">
            <span class="period-label">${p.label}</span>
            <span class="period-bounds">${shortDate(pStart)} – ${shortDate(pEnd)}</span>
          </div>
          <div class="bar-row">
            <span class="bar-spacer"></span>
            <div class="bar-track">
              <div class="bar-fill" style="left:${Math.max(0, leftPct)}%;right:${Math.max(0, rightPct)}%">
                <span class="bar-date">${shortDate(earliest)}</span>
                <span class="bar-date">${shortDate(latest)}</span>
              </div>
            </div>
            <span class="duration">${days}d</span>
          </div>
        </div>
      `;
    });
  }

  private _renderList() {
    return this.periods.map(p => {
      const earliest = parseISODateString(p.earliestDate);
      const latest = parseISODateString(p.latestDate);
      if (!earliest || !latest) return nothing;

      const days = daysBetween(earliest, latest);

      return html`
        <div class="list-row">
          <span class="list-badge">${p.label}</span>
          <div class="list-dates">
            <div class="list-date-group">
              <span class="list-micro-label">Earliest</span>
              <span class="list-date-value">${fullDate(earliest)}</span>
            </div>
            <span class="list-arrow">\u2192</span>
            <div class="list-date-group">
              <span class="list-micro-label">Latest</span>
              <span class="list-date-value">${fullDate(latest)}</span>
            </div>
          </div>
          <span class="duration">${days}d</span>
        </div>
      `;
    });
  }

  render() {
    return html`
      ${this._renderHeader()}
      ${this.view === 'timeline' ? this._renderTimeline() : this._renderList()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-eta-range': CaEtaRange;
  }
}
