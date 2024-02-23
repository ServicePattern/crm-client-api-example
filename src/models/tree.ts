import {assertDefined} from '../helpers'

interface TreeI<NodeData extends object, LeafData extends object> {
    getTree(): TreeStructure<NodeData, LeafData>
}

type TreeOptions = {
    mountNode: HTMLElement
}

export interface TreeNode<NodeData extends object, LeafData extends object> {
    type: 'node'
    id: string
    displayName: string
    ref: NodeData
    children: NodeChildren<NodeData, LeafData>
}

export interface TreeLeaf<LeafData extends object> {
    type: 'leaf'
    id: string
    displayName: string
    ref: LeafData
}

type NodeChildren<NodeData extends object, LeafData extends object> = {
    [itemId: string]: TreeItem<NodeData, LeafData>
}

export type TreeItem<NodeData extends object, LeafData extends object> = TreeNode<NodeData, LeafData> | TreeLeaf<LeafData>

export type TreeStructure<NodeData extends object, LeafData extends object> = NodeChildren<NodeData, LeafData>


export class Tree<NodeData extends object, LeafData extends object> implements TreeI<NodeData, LeafData> {

    private tree: NodeChildren<NodeData, LeafData>
    private rootElement: HTMLElement

    constructor(
        initialStructure: TreeStructure<NodeData, LeafData>,
        options: TreeOptions,
    ) {
        this.tree = initialStructure
        this.rootElement = options.mountNode
        this.generateTreeUI()
    }

    private generateTreeUI() {
        Object.values(this.tree).map(treeItem => {
            assertDefined(treeItem)
            this.generateItemUI(treeItem, this.rootElement)
        })
    }

    private generateItemUI(treeItem: TreeItem<NodeData, LeafData>, parentElement: HTMLElement) {
        if (treeItem.type === 'node') {
            this.generateNodeUI(treeItem, parentElement)
        }
        if (treeItem.type === 'leaf') {
            this.generateLeafUI(treeItem, parentElement)
        }
    }

    private generateNodeUI(treeNode: TreeNode<NodeData, LeafData>, parentElement: HTMLElement) {

        const wrapper = document.createElement('li')
        wrapper.className = 'tree-item'

        const node = document.createElement('a')
        node.className = 'tree-node'
        node.setAttribute('role', 'button')
        node.href = '#'
        node.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>${treeNode.displayName}`
        node.dataset.id = treeNode.id

        const nodeChildren = document.createElement('ul')
        nodeChildren.className = 'hidden'

        node.addEventListener('click', () => {
            nodeChildren.classList.toggle('hidden')
        })

        Object.values(treeNode.children).map(treeItem => {
            assertDefined(treeItem)
            this.generateItemUI(treeItem, nodeChildren)
        })

        wrapper.appendChild(node)
        wrapper.appendChild(nodeChildren)
        parentElement.appendChild(wrapper)
    }

    private generateLeafUI(treeLeaf: TreeLeaf<LeafData>, parentElement: HTMLElement) {
        const leaf = document.createElement('li')
        leaf.className = 'tree-leaf'
        leaf.textContent = treeLeaf.displayName
        leaf.dataset.id = treeLeaf.id

        parentElement.appendChild(leaf)
    }

    public getTree() {
        return this.tree
    }
}
