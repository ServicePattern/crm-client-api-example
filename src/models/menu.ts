import {HamburgerI} from "./hamburger"

interface MenuI {
    multiplySelect: boolean

    open(menuItemName: string): void

    toggle(menuItemName: string): void

    getOpened(): string

    initializeEventListeners(): void
}

interface Selectors {
    menu: string,
    menuItems: string,
    section: string,
    multipleSelect: string
}


export class Menu implements MenuI {
    multiplySelect = false
    hamburger: HamburgerI
    menu: HTMLElement | null
    menuSelector: string
    multipleSelectCheckbox: HTMLElement | null | undefined
    menuItems: NodeListOf<HTMLElement> | undefined
    sections: NodeListOf<HTMLElement> | undefined
    opened = ''

    constructor(hamburger: HamburgerI, selectors: Selectors) {
        this.menuSelector = selectors.menu
        this.menu = document.querySelector(selectors.menu)
        this.sections = document.querySelectorAll(selectors.section)
        this.menuItems = this.menu?.querySelectorAll(selectors.menuItems)
        this.multipleSelectCheckbox = this.menu?.querySelector(selectors.multipleSelect)
        this.hamburger = hamburger
    }

    toggle = (menuItemName: string) => {
        this.opened = menuItemName
        const menuItem = Array.from(this.menuItems ?? []).find(menuItemNode => menuItemNode.dataset.name === menuItemName)
        const section = Array.from(this.sections ?? []).find(section => section.dataset.name === menuItemName)
        menuItem?.classList.toggle('opened')
        section?.classList.toggle('opened')
    }

    toggleSelectMode = () => {
        this.multiplySelect = !this.multiplySelect
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

            menuItemNode.addEventListener('click', () => this.multiplySelect ? this.toggle(menuItemName) : this.open(menuItemName))
        })
        this.initializeCloseOnOutsideClick()
        this.initializeCloseOnEscape()
        this.initializeMultipleSelector()
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

    initializeMultipleSelector() {
        this.multipleSelectCheckbox?.addEventListener('change', this.toggleSelectMode)
    }

    closeMenu() {
        if (this.hamburger.isOpened()) {
            this.hamburger.toggle(false)
        }
    }
}