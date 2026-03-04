import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

export interface ChartDataset {
  label: string;
  data: number[];
  color?: string;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

const DEFAULT_COLORS = [
  '#3b82f6', '#22c55e', '#f97316', '#ef4444', '#8b5cf6',
  '#ec4899', '#14b8a6', '#eab308', '#6366f1', '#6b7280',
];

/**
 * `<ca-chart>` — Lightweight SVG data visualization.
 * Supports bar, line, pie, and doughnut chart types.
 *
 * @fires ca-segment-click - Dispatched when a chart segment is clicked. detail: `{ datasetIndex, dataIndex, value, label }`
 */
@customElement('ca-chart')
export class CaChart extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--ca-font-family);
    }
    .chart-container {
      position: relative;
    }
    svg {
      width: 100%;
      display: block;
    }
    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
      padding: 8px 0;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-secondary);
    }
    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .bar-rect, .pie-slice, .line-point {
      cursor: pointer;
      transition: opacity var(--ca-transition-fast);
    }
    .bar-rect:hover, .pie-slice:hover, .line-point:hover {
      opacity: 0.8;
    }
    .axis-label {
      font-size: 11px;
      fill: var(--ca-text-muted, #717171);
      font-family: var(--ca-font-family);
    }
    .grid-line {
      stroke: var(--ca-border, #ddd);
      stroke-dasharray: 3 3;
    }
    .tooltip {
      position: absolute;
      background: var(--ca-color-secondary, #222);
      color: #fff;
      padding: 4px 8px;
      border-radius: var(--ca-radius-sm, 4px);
      font-size: 12px;
      font-family: var(--ca-font-family);
      pointer-events: none;
      white-space: nowrap;
      z-index: 5;
    }
  `;

  @property({ type: String }) type: 'bar' | 'line' | 'pie' | 'doughnut' = 'bar';
  @property({ type: Object, attribute: false }) data: ChartData = { labels: [], datasets: [] };
  @property({ type: Boolean, attribute: 'show-legend' }) showLegend = true;

  @state() private _tooltip: { text: string; x: number; y: number } | null = null;
  @query('.chart-container') private _container!: HTMLElement;

  private _getColor(i: number): string {
    return DEFAULT_COLORS[i % DEFAULT_COLORS.length];
  }

  private _handleSegmentClick(datasetIndex: number, dataIndex: number, value: number, label: string) {
    this.dispatchEvent(
      new CustomEvent('ca-segment-click', {
        detail: { datasetIndex, dataIndex, value, label },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="chart-container"
        @mouseleave=${() => { this._tooltip = null; }}
      >
        ${this.type === 'bar' ? this._renderBarChart()
          : this.type === 'line' ? this._renderLineChart()
          : this.type === 'pie' || this.type === 'doughnut' ? this._renderPieChart()
          : nothing}
        ${this._tooltip
          ? html`<div class="tooltip" style="left:${this._tooltip.x}px; top:${this._tooltip.y}px">${this._tooltip.text}</div>`
          : nothing}
      </div>
      ${this.showLegend && this.data.datasets.length > 0
        ? html`<div class="legend">
            ${this.data.datasets.map(
              (ds, i) => html`
                <span class="legend-item">
                  <span class="legend-dot" style="background-color:${ds.color || this._getColor(i)}"></span>
                  ${ds.label}
                </span>
              `
            )}
          </div>`
        : nothing}
    `;
  }

  private _renderBarChart() {
    const { labels, datasets } = this.data;
    if (!labels.length || !datasets.length) return nothing;

    const svgW = 600, svgH = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const w = svgW - margin.left - margin.right;
    const h = svgH - margin.top - margin.bottom;

    const allValues = datasets.flatMap((ds) => ds.data);
    const maxVal = Math.max(...allValues, 1);
    const barGroupWidth = w / labels.length;
    const barWidth = barGroupWidth / (datasets.length + 1);

    // Grid lines
    const gridLines = 5;
    const gridStep = maxVal / gridLines;

    return html`
      <svg viewBox="0 0 ${svgW} ${svgH}">
        <g transform="translate(${margin.left}, ${margin.top})">
          <!-- Grid -->
          ${Array.from({ length: gridLines + 1 }, (_, i) => {
            const y = h - (i * h) / gridLines;
            const val = Math.round(i * gridStep);
            return html`
              <line class="grid-line" x1="0" y1=${y} x2=${w} y2=${y} />
              <text class="axis-label" x="-8" y=${y + 4} text-anchor="end">${val}</text>
            `;
          })}
          <!-- Bars -->
          ${datasets.map((ds, di) =>
            ds.data.map((val, li) => {
              const barH = (val / maxVal) * h;
              const x = li * barGroupWidth + di * barWidth + barWidth * 0.5;
              const y = h - barH;
              const color = ds.color || this._getColor(di);
              return html`
                <rect
                  class="bar-rect"
                  x=${x} y=${y} width=${barWidth * 0.8} height=${barH}
                  fill=${color} rx="2"
                  @click=${() => this._handleSegmentClick(di, li, val, labels[li])}
                  @mouseenter=${(e: MouseEvent) => { this._tooltip = { text: `${ds.label}: ${val}`, x: e.offsetX + 10, y: e.offsetY - 20 }; }}
                  @mouseleave=${() => { this._tooltip = null; }}
                />
              `;
            })
          )}
          <!-- X axis labels -->
          ${labels.map((label, i) => html`
            <text class="axis-label" x=${i * barGroupWidth + barGroupWidth / 2} y=${h + 20} text-anchor="middle">${label}</text>
          `)}
        </g>
      </svg>
    `;
  }

  private _renderLineChart() {
    const { labels, datasets } = this.data;
    if (!labels.length || !datasets.length) return nothing;

    const svgW = 600, svgH = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const w = svgW - margin.left - margin.right;
    const h = svgH - margin.top - margin.bottom;

    const allValues = datasets.flatMap((ds) => ds.data);
    const maxVal = Math.max(...allValues, 1);
    const stepX = w / Math.max(labels.length - 1, 1);

    const gridLines = 5;
    const gridStep = maxVal / gridLines;

    return html`
      <svg viewBox="0 0 ${svgW} ${svgH}">
        <g transform="translate(${margin.left}, ${margin.top})">
          <!-- Grid -->
          ${Array.from({ length: gridLines + 1 }, (_, i) => {
            const y = h - (i * h) / gridLines;
            const val = Math.round(i * gridStep);
            return html`
              <line class="grid-line" x1="0" y1=${y} x2=${w} y2=${y} />
              <text class="axis-label" x="-8" y=${y + 4} text-anchor="end">${val}</text>
            `;
          })}
          <!-- Lines -->
          ${datasets.map((ds, di) => {
            const color = ds.color || this._getColor(di);
            const points = ds.data.map((val, i) => `${i * stepX},${h - (val / maxVal) * h}`).join(' ');
            return html`
              <polyline fill="none" stroke=${color} stroke-width="2" points=${points} />
              ${ds.data.map((val, i) => html`
                <circle
                  class="line-point"
                  cx=${i * stepX} cy=${h - (val / maxVal) * h} r="4"
                  fill=${color} stroke="#fff" stroke-width="2"
                  @click=${() => this._handleSegmentClick(di, i, val, labels[i])}
                  @mouseenter=${(e: MouseEvent) => { this._tooltip = { text: `${ds.label}: ${val}`, x: e.offsetX + 10, y: e.offsetY - 20 }; }}
                  @mouseleave=${() => { this._tooltip = null; }}
                />
              `)}
            `;
          })}
          <!-- X labels -->
          ${labels.map((label, i) => html`
            <text class="axis-label" x=${i * stepX} y=${h + 20} text-anchor="middle">${label}</text>
          `)}
        </g>
      </svg>
    `;
  }

  private _renderPieChart() {
    const { datasets } = this.data;
    if (!datasets.length || !datasets[0].data.length) return nothing;

    const data = datasets[0].data;
    const labels = this.data.labels;
    const total = data.reduce((a, b) => a + b, 0);
    if (total === 0) return nothing;

    const cx = 150, cy = 150, r = 120;
    const innerR = this.type === 'doughnut' ? r * 0.6 : 0;
    let startAngle = -Math.PI / 2;

    const slices = data.map((val, i) => {
      const angle = (val / total) * 2 * Math.PI;
      const endAngle = startAngle + angle;
      const largeArc = angle > Math.PI ? 1 : 0;

      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);

      let d = '';
      if (innerR > 0) {
        const ix1 = cx + innerR * Math.cos(startAngle);
        const iy1 = cy + innerR * Math.sin(startAngle);
        const ix2 = cx + innerR * Math.cos(endAngle);
        const iy2 = cy + innerR * Math.sin(endAngle);
        d = `M${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} L${ix2},${iy2} A${innerR},${innerR} 0 ${largeArc} 0 ${ix1},${iy1} Z`;
      } else {
        d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`;
      }

      const color = datasets[0].color ? undefined : this._getColor(i);
      startAngle = endAngle;

      return { d, color: color || this._getColor(i), val, label: labels[i] || `Segment ${i + 1}`, index: i };
    });

    return html`
      <svg viewBox="0 0 300 300">
        ${slices.map(
          (s) => html`
            <path
              class="pie-slice"
              d=${s.d}
              fill=${s.color}
              @click=${() => this._handleSegmentClick(0, s.index, s.val, s.label)}
              @mouseenter=${(e: MouseEvent) => {
                const pct = ((s.val / total) * 100).toFixed(1);
                this._tooltip = { text: `${s.label}: ${s.val} (${pct}%)`, x: e.offsetX + 10, y: e.offsetY - 20 };
              }}
              @mouseleave=${() => { this._tooltip = null; }}
            />
          `
        )}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-chart': CaChart;
  }
}
