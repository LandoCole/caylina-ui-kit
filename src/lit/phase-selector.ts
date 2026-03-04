import { customElement } from 'lit/decorators.js';
import { ColorPillBase } from './utils/color-pill-base.js';

/**
 * `<ca-phase-selector>` — Colored pill dropdown for project phases/milestones.
 *
 * @fires ca-change - Dispatched when a phase is selected. detail: `{ value: string }`
 * @fires ca-create - Dispatched when "Create new" is clicked (when allow-create is set).
 */
@customElement('ca-phase-selector')
export class CaPhaseSelector extends ColorPillBase {}

declare global {
  interface HTMLElementTagNameMap {
    'ca-phase-selector': CaPhaseSelector;
  }
}
