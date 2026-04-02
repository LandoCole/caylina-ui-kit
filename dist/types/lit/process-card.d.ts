import { LitElement } from 'lit';
export interface ProcessStep {
    key: string;
    label: string;
}
export declare class CaProcessCard extends LitElement {
    static styles: import("lit").CSSResult;
    steps: ProcessStep[];
    currentStep: string | null;
    status: 'pending' | 'processing' | 'complete' | 'error';
    heading: string;
    subheading: string;
    expanded: boolean;
    size: 'sm' | 'md';
    private get _stepIndex();
    private get _progressPercent();
    private get _subheadingText();
    private get _defaultPillText();
    private _onToggle;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-process-card': CaProcessCard;
    }
}
