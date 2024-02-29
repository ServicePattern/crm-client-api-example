import type {TreeItem, TreeLeaf, TreeStructure } from './models/tree'


export function setupHoverEffect(hoverElement: Element, highlightElements: Element[]){
    hoverElement.addEventListener('mouseenter', () => {
        highlightElements.forEach(element => {
            element.classList.add('highlighted')
        })
    })
    hoverElement.addEventListener('mouseleave', () => {
        highlightElements.forEach(element => {
            element.classList.remove('highlighted')
        })
    })
}

export function assertDefined<D>(data: D, errorMessage?: string): asserts data is Exclude<D, undefined | null> {
    if (typeof data === 'undefined' || data === null) {
        throw new Error(errorMessage ?? 'The assertDefined check is not passed. Argument has type undefined')
    }
}

export function findNode<N extends object, L extends object>(treeRoot: TreeStructure<N, L>, nodeId: string): TreeItem<N, L> | null {
    function traverse(children: TreeItem<N, L>[]): TreeItem<N, L> | null {
        for (const item of children) {
            if (item.id === nodeId) {
                return item
            }
            if (item.type === 'node') {
                const ret = traverse(Object.values(item.children))
                if (ret !== null) {
                    return ret
                }
            }
        }
        return null
    }
    return traverse(Object.values(treeRoot))
}

export function flatTree<N extends object, L extends object>(treeRoot: TreeStructure<N, L>): TreeLeaf<L>[] {
    function traverse(acc: TreeLeaf<L>[], node: TreeItem<N, L>): TreeLeaf<L>[] {
        if (node.type === 'node') {
            return Object.values(node.children).reduce(traverse, acc)
        }
        acc.push(node)
        return acc
    }
    return Object.values(treeRoot).reduce(traverse, [])
}
