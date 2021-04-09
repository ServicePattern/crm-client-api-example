interface TabI {
    open(tabName: string): void

    getOpened(): string

    initializeEventListeners(): void
}


export class Tab implements TabI {
    tab: HTMLElement | null
    tabItems: NodeListOf<HTMLElement> | undefined
    tabContent: NodeListOf<HTMLElement> | undefined
    opened = ''

    constructor(tabSelector: string, tabItemSelector: string, tabContentSelector: string) {
        this.tab = document.querySelector(tabSelector)
        this.tabItems = this.tab?.querySelectorAll(tabItemSelector)
        this.tabContent = document.querySelectorAll(tabContentSelector)
    }

    open = (menuItemName: string) => {
        this.opened = menuItemName

        this?.tabItems?.forEach(tabItemNode => {
            if (tabItemNode.dataset.name === menuItemName) {
                tabItemNode.classList.add('active')
            } else {
                tabItemNode.classList.remove('active')
            }
        })

        this?.tabContent?.forEach(tabContentNode => {
            if (tabContentNode.dataset.name === menuItemName) {
                tabContentNode.classList.add('active')
            } else {
                tabContentNode.classList.remove('active')
            }
        })
    }

    getOpened = () => {
        return this.opened
    }

    initializeEventListeners = () => {
        this?.tabItems?.forEach(tabItemNode => {
            const menuItemName = tabItemNode?.dataset?.name

            if (!menuItemName) {
                throw Error('Specify data-name attribute for the .menu-item')
            }

            tabItemNode.addEventListener('click', () => {
                this.open(menuItemName)
            })
        })
    }


}