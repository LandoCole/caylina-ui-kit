import { LitElement } from 'lit';
export interface ChartDataset {
    label: string;
    data: number[];
    color?: string;
}
export interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
}
/**
 * `<ca-chart>` — Lightweight SVG data visualization.
 * Supports bar, line, pie, and doughnut chart types.
 *
 * @fires ca-segment-click - Dispatched when a chart segment is clicked. detail: `{ datasetIndex, dataIndex, value, label }`
 */
export declare class CaChart extends LitElement {
    static styles: import("lit").CSSResult;
    type: 'bar' | 'line' | 'pie' | 'doughnut';
    data: ChartData;
    showLegend: boolean;
    private _tooltip;
    private _container;
    private _getColor;
    private _handleSegmentClick;
    render(): import("lit-html").TemplateResult<1>;
    private _renderBarChart;
    private _renderLineChart;
    private _renderPieChart;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-chart': CaChart;
    }
}
