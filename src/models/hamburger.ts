export interface HamburgerI {
    toggle(evtOrForceShow?: boolean | Event): void

    initializeEventListener(): void

    isOpened(): boolean

}

export class Hamburger implements HamburgerI {
    hamburger: HTMLElement | null
    menu: HTMLElement | null

    constructor(hamburgerSelector: string, menuSelector: string) {
        this.hamburger = document.querySelector(hamburgerSelector)
        this.menu = document.querySelector(menuSelector)
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
            return
        }

        if (forceShow === false) {
            this.hamburger?.classList?.remove('expanded');
            this.menu?.classList?.remove('expanded');
            return
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
