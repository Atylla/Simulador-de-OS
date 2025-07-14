import { createTaskbar } from "../components/bottom-bar.js";
import { dragAndDrop } from "./drag-drop.js";
import { getZIndex } from "./window-state.js";

export const winControl = () => {
    const windows = document.querySelectorAll('.draggable-window');

    windows.forEach((win) => {
        win.addEventListener('mousedown', () => {
            win.style.zIndex = getZIndex();
        });

        const header = win.querySelector('.window-header');
        const btnMinimize = header.querySelector('[name="remove-circle"]');
        const btnMaximize = header.querySelector('[name="square-outline"]');
        const btnClose = header.querySelector('[name="close-circle"]');
        const body = win.querySelector('.window-body');

        btnMinimize?.addEventListener('click', () => {
            win.style.display = 'none';
            createTaskbar(win);
        });

        btnMaximize?.addEventListener('click', () => {
            win.classList.toggle('maximized');
        });

        btnClose?.addEventListener('click', () => {
            win.remove()
        })

        dragAndDrop(win);

    });

    

}