export const dragAndDrop = (windowElement) => {
    const header = windowElement.querySelector('.drag-header');

    if (!header) {
        console.warn("Janela sem '.drag-header':", windowElement);
        return;
    }

    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;

        offsetX = e.clientX - windowElement.offsetLeft;
        offsetY = e.clientY - windowElement.offsetTop;

        document.body.style.userSelect = "none"; 
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.userSelect = ""; 
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        windowElement.style.left = `${x}px`;
        windowElement.style.top = `${y}px`;
    });
}


