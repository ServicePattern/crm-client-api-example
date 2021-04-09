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