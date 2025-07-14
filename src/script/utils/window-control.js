export const winControl = () => {
    const windows = document.querySelectorAll('.draggable-window');
    let zIndexCounter = 1000;

    windows.forEach((win) => {
        win.addEventListener('mousedown', () => {
            zIndexCounter++;
            win.style.zIndex = zIndexCounter;
        });

        const header = win.querySelector('.window-header');
        const btnMinimize = header.querySelector('[name="remove-circle"]');
        const btnMaximize = header.querySelector('[name="square-outline"]');
        const btnClose = header.querySelector('[name="close-circle"]');
        const body = win.querySelector('.window-body');

        btnMinimize?.addEventListener('click', () => {
            body.style.display = body.style.display === 'none' ? 'block' : 'none';
        });

        btnMaximize?.addEventListener('click', () => {
            win.classList.toggle('maximized');
        });

        btnClose?.addEventListener('click', () => {
            win.remove()
        })

    });

    
}