import * as focusTrap from "focus-trap";
import {FocusTrap} from "focus-trap";

export interface HamburgerI {
    toggle(evtOrForceShow?: boolean | Event): void

    initializeEventListener(): void

    isOpened(): boolean

}

export interface Selectors {
    hamburger: string,
    menu: string,
    menuItem: string
}

export class Hamburger implements HamburgerI {
    menuItemSelector: string
    hamburger: HTMLElement | null
    menu: HTMLElement | null
    menuFocusTrap: FocusTrap

    constructor(selectors: Selectors) {
        this.hamburger = document.querySelector(selectors.hamburger)
        this.menu = document.querySelector(selectors.menu)
        this.menuItemSelector = selectors.menuItem

        if (!this.menu) {
            throw Error('Invalid selector for menu')
        }

        if (!this.hamburger) {
            throw Error('Invalid selector for hamburger')
        }

        this.menuFocusTrap = focusTrap.createFocusTrap(this.menu, {
            clickOutsideDeactivates: true,
            initialFocus: this.menuItemSelector + '.opened',
            fallbackFocus: this.menuItemSelector,
        })
    }

    isOpened = () => {
        console.log('this.hamburger.classList-->', this?.hamburger?.classList.contains('expanded'))

        return !!this.hamburger?.classList?.contains('expanded')
    }

    toggle = (evtOrForceShow?: boolean | Event) => {
        let forceShow: boolean | undefined
        if (typeof evtOrForceShow === 'boolean') {
            forceShow = evtOrForceShow
        }

        if (forceShow === true) {
            this.hamburger?.classList?.add('expanded');
            this.menu?.classList?.add('expanded');
            this.menuFocusTrap.activate()
            return
        }

        if (forceShow === false) {
            this.hamburger?.classList?.remove('expanded');
            this.menu?.classList?.remove('expanded');
            this.menuFocusTrap.deactivate()
            return
        }


        if (this.hamburger?.classList?.contains('expanded')) {
            this.menuFocusTrap.deactivate()
        } else {
            this.menuFocusTrap.activate()
        }

        this.hamburger?.classList?.toggle('expanded');
        this.menu?.classList?.toggle('expanded');
    }

    initializeEventListener = () => {
        this.hamburger?.addEventListener('click', (evt) => {
            evt.stopPropagation()
            this.toggle()
        })
    }

}
