export function initializeResizeButtonHandler() {
    const resetSizeButton = document.querySelector('.reset_size_button') as HTMLElement
    const mainSection = document.querySelector('.content') as HTMLElement


    resetSizeButton.addEventListener('click', resetMainSectionSize)

    function resetMainSectionSize() {
        mainSection.removeAttribute('style')
    }
}