import { ColorPillBase } from './utils/color-pill-base.js';
/**
 * `<ca-status-selector>` — Colored pill dropdown for task statuses.
 *
 * @fires ca-change - Dispatched when a status is selected. detail: `{ value: string }`
 * @fires ca-create - Dispatched when "Create new" is clicked (when allow-create is set).
 */
export declare class CaStatusSelector extends ColorPillBase {
}
declare global {
    interface HTMLElementTagNameMap {
        'ca-status-selector': CaStatusSelector;
    }
}
