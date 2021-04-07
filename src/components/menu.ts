import {HamburgerI} from "./hamburger"

interface MenuI {
    open(menuItemName: string): void

    getOpened(): string

    initializeEventListeners(): void
}


export class Menu implements MenuI {
    hamburger: HamburgerI
    menu: HTMLElement | null
    menuSelector: string
    menuItems: NodeListOf<HTMLElement> | undefined
    sections: NodeListOf<HTMLElement> | undefined
    opened = ''

    constructor(hamburger: HamburgerI, menuSelector: string, menuItemsSelector: string, sectionSelector: string) {
        this.menuSelector = menuSelector
        this.menu = document.querySelector(menuSelector)
        this.sections = document.querySelectorAll(sectionSelector)
        this.menuItems = this.menu?.querySelectorAll(menuItemsSelector)
        this.hamburger = hamburger
    }

    open = (menuItemName: string) => {
        this.opened = menuItemName
        this.hamburger.toggle(false)

        this?.menuItems?.forEach(menuItemNode => {
            if (menuItemNode.dataset.name === menuItemName) {
                menuItemNode.classList.add('opened')
            } else {
                menuItemNode.classList.remove('opened')
            }
        })

        this?.sections?.forEach(sectionNode => {
            if (sectionNode.dataset.name === menuItemName) {
                sectionNode.classList.add('opened')
            } else {
                sectionNode.classList.remove('opened')
            }
        })
    }

    getOpened = () => {
        return this.opened
    }

    initializeEventListeners = () => {
        this?.menuItems?.forEach(menuItemNode => {
            const menuItemName = menuItemNode?.dataset?.name

            if (!menuItemName) {
                throw Error('Specify data-name attribute for the .menu-item')
            }

            menuItemNode.addEventListener('click', () => {
                this.open(menuItemName)
            })
        })
        this.initializeCloseOnOutsideClick()
        this.initializeCloseOnEscape()
    }

    initializeCloseOnOutsideClick() {
        document.addEventListener('click', (evt) => {
            if (!(evt.target as HTMLElement).closest(this.menuSelector)) {
                this.closeMenu()
            }
        })

    }

    initializeCloseOnEscape() {
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                this.closeMenu()
            }
        })
    }

    closeMenu() {
        if (this.hamburger.isOpened()) {
            this.hamburger.toggle(false)
        }
    }
}