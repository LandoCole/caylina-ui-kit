import { type CSSResultGroup } from 'lit';
import { ColorPillBase, type ColorPillOption } from './utils/color-pill-base.js';
/**
 * `<ca-priority-selector>` — Colored pill dropdown for task priorities.
 * Extends ColorPillBase with icon support (priority arrows).
 *
 * @fires ca-change - Dispatched when a priority is selected. detail: `{ value: string }`
 * @fires ca-create - Dispatched when "Create new" is clicked (when allow-create is set).
 */
export declare class CaPrioritySelector extends ColorPillBase {
    static styles: CSSResultGroup;
    protected renderOptionIcon(option: ColorPillOption): import("lit-html").TemplateResult<1>;
    private _getIconSvg;
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-priority-selector': CaPrioritySelector;
    }
}
