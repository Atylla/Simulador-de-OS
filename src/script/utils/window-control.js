import { createTaskbar, removeTaskbar } from "../components/bottom-bar.js";
import { dragAndDrop } from "./drag-drop.js";
import { getZIndex } from "./window-state.js";

export const winControl = () => {
    const windows = document.querySelectorAll('.draggable-window');

    windows.forEach((win) => {
        win.addEventListener('mousedown', () => {
            win.style.zIndex = getZIndex();
        });

        createTaskbar(win);

        const header = win.querySelector('.window-header');
        const btnMinimize = header.querySelector('[name="remove-circle"]');
        const btnMaximize = header.querySelector('[name="square-outline"]');
        const btnClose = header.querySelector('[name="close-circle"]');

        btnMinimize?.addEventListener('click', () => {
            win.style.display = 'none';
        });

        btnMaximize?.addEventListener('click', () => {
            win.classList.toggle('maximized');
        });

        btnClose?.addEventListener('click', () => {
            const winId = win.getAttribute('id');
            win.remove()
            removeTaskbar(winId);
        })

        
        dragAndDrop(win);
        resizeWindow(win);
    });
}

export const resizeWindow = (windowElement, minWidth = 200, minHeight = 150) => {

    const edges = ['top', 'right', 'bottom', 'left', 'top-right', 'top-left', 'bottom-right', 'bottom-left'];
    
    edges.forEach(edge => {
        const resizer = document.createElement('div');
        resizer.classList.add('resizer', `resizer-${edge}`);
        windowElement.appendChild(resizer);

        let startX, startY, startWidth, startHeight, startLeft, startTop;

        resizer.addEventListener('mousedown', (e) => {
            e.preventDefault();

            startX = e.clientX;
            startY = e.clientY;

            // Pegando valores atuais da janela
            const rect = windowElement.getBoundingClientRect();
            startWidth = rect.width;
            startHeight = rect.height;
            startLeft = rect.left;
            startTop = rect.top;

            const onMouseMove = (e) => {
                let newWidth = startWidth;
                let newHeight = startHeight;
                let newLeft = startLeft;
                let newTop = startTop;

                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                if (edge.includes('right')) {
                    newWidth = Math.max(minWidth, startWidth + dx);
                }
                if (edge.includes('left')) {
                    newWidth = Math.max(minWidth, startWidth - dx);
                    newLeft = startLeft + dx;
                }
                if (edge.includes('bottom')) {
                    newHeight = Math.max(minHeight, startHeight + dy);
                }
                if (edge.includes('top')) {
                    newHeight = Math.max(minHeight, startHeight - dy);
                    newTop = startTop + dy;
                }

                // Aplicando o novo tamanho e posição
                windowElement.style.width = `${newWidth}px`;
                windowElement.style.height = `${newHeight}px`;
                windowElement.style.left = `${newLeft}px`;
                windowElement.style.top = `${newTop}px`;
            };

            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    });
};