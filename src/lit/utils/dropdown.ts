import { LitElement } from 'lit';
import { state } from 'lit/decorators.js';

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
export function DropdownMixin<T extends Constructor<LitElement>>(superClass: T) {
  class DropdownMixinClass extends superClass {
    @state()
    _isOpen = false;

    private _boundClickOutside = this.__handleClickOutside.bind(this);

    connectedCallback(): void {
      super.connectedCallback();
      document.addEventListener('click', this._boundClickOutside);
    }

    disconnectedCallback(): void {
      super.disconnectedCallback();
      document.removeEventListener('click', this._boundClickOutside);
    }

    private __handleClickOutside(e: MouseEvent): void {
      if (!this._isOpen) return;
      const path = e.composedPath();
      if (!path.includes(this as unknown as EventTarget)) {
        this._closeDropdown();
      }
    }

    _openDropdown(): void {
      this._isOpen = true;
    }

    _closeDropdown(): void {
      this._isOpen = false;
    }

    _toggleDropdown(): void {
      this._isOpen = !this._isOpen;
    }
  }
  return DropdownMixinClass as unknown as Constructor<DropdownMixinInterface> & T;
}
