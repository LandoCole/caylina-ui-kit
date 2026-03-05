import { LitElement } from 'lit';
type Constructor<T = {}> = new (...args: any[]) => T;
export interface DropdownMixinInterface {
    _isOpen: boolean;
    _openDropdown(): void;
    _closeDropdown(): void;
    _toggleDropdown(): void;
}
/**
 * Mixin that adds click-outside handling and open/close state for dropdown components.
 * Handles document-level click listeners and composedPath for Shadow DOM.
 */
export declare function DropdownMixin<T extends Constructor<LitElement>>(superClass: T): Constructor<DropdownMixinInterface> & T;
export {};
