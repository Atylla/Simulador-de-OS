import { createFolder } from "../folders/folderStorage.js";
import { renderDesktop } from "../folders/renderDesktop.js";
import { positionInitialApps } from "../utils/drag-drop-app.js";


export function rightClick() {
    const desktop = document.querySelector("#content-wrap");
    const contextMenu = document.querySelector("#custom-context-menu");

    desktop.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        contextMenu.style.left = `${e.clientX}px`;
        contextMenu.style.top = `${e.clientY}px`;
        contextMenu.style.display = "block";
    });

    document.addEventListener("click", () => {
        contextMenu.style.display = "none";
    });

    document.querySelector("#new-folder").addEventListener("click", () => {
        const nome = prompt("Nome da nova pasta:");
        if (nome) {
            createFolder(["Área de Trabalho"], nome);
            renderDesktop(); // atualiza visualmente
            positionInitialApps();
        }
        contextMenu.style.display = "none";
    });
}