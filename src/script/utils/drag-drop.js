export const dragAndDrop = (windowElement) => {
    const header = windowElement.querySelector('.drag-header');

    if (!header) {
        console.warn("Janela sem '.drag-header':", windowElement);
        return;
    }

    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    let lastPosition = { width: 0, height: 0, left: 0, top: 0 };

    const observer = new MutationObserver(() => {
        if (windowElement.classList.contains('maximized')) {
            lastPosition = {
                width: windowElement.offsetWidth,
                height: windowElement.offsetHeight,
                left: windowElement.offsetLeft,
                top: windowElement.offsetTop
            };
        }
    });

    observer.observe(windowElement, { attributes: true, attributeFilter: ['class'] });

    header.addEventListener('mousedown', (e) => {
        const isMaximized = windowElement.classList.contains('maximized');

        if (isMaximized) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;


            const width = parseInt(windowElement.dataset.lastWidth, 10) || 600;
            const height = parseInt(windowElement.dataset.lastHeight, 10) || 400;

            const newLeft = mouseX - width / 2;
            const newTop = mouseY - 20;

            windowElement.classList.remove('maximized');
            windowElement.style.width = `${width}px`;
            windowElement.style.height = `${height}px`;
            windowElement.style.left = `${newLeft}px`;
            windowElement.style.top = `${newTop}px`;
        }


        offsetX = e.clientX - windowElement.offsetLeft;
        offsetY = e.clientY - windowElement.offsetTop;
        isDragging = true;

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
};



