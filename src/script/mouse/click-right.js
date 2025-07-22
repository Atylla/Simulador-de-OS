import { createFolder, deleteFolder, getFolderByPath } from "../folders/folderStorage.js";
import { renderDesktop, renderFolderContent, renderLeftSidebar } from "../folders/renderDesktop.js";
import { positionInitialApps } from "../utils/drag-drop-app.js";

let clickedFolderName = null;
let clickedFolderPath = null; 
let currentFolderPath = null;
let currentContentContainer = null;
let currentSidebarContainer = null;

export function rightClick() {
    const desktop = document.querySelector("#content-wrap");
    const contextMenu = document.querySelector("#custom-context-menu");
    const deleteOption = document.querySelector("#delete-folder");

    desktop.addEventListener("contextmenu", (e) => {
        e.preventDefault();

        const appEl = e.target.closest(".folder.app");

        if (appEl) {
            clickedFolderName = appEl.querySelector("p").textContent;
            const fullPath = appEl.getAttribute("data-folder-path");
            const windowEl = appEl.closest(".draggable-window");

            if (fullPath) {
                clickedFolderPath = fullPath.split("/"); 
            }

            if (windowEl) {
                currentContentContainer = windowEl.querySelector(".folder-content");
                currentSidebarContainer = windowEl.querySelector(".folder-list");
                currentFolderPath = windowEl.getCurrentPath?.(); 
            }

            deleteOption.style.display = "block";
        } else {
            clickedFolderName = null;
            clickedFolderPath = null;
            currentFolderPath = null;
            currentContentContainer = null;
            currentSidebarContainer = null;
            deleteOption.style.display = "none";
        }


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
            renderDesktop();
            positionInitialApps();
        }
        contextMenu.style.display = "none";
    });


    deleteOption.addEventListener("click", () => {
        if (clickedFolderName && clickedFolderPath) {
            const confirmDelete = confirm(`Deseja excluir a pasta "${clickedFolderName}"?`);
            if (confirmDelete) {
                const parentPath = [...clickedFolderPath];
                parentPath.pop(); 

                deleteFolder(parentPath, clickedFolderName);

                const isDesktop = parentPath.join("/") === "Área de Trabalho";

                if (isDesktop) {
                    renderDesktop();
                    positionInitialApps();
                } else if (currentContentContainer && currentSidebarContainer) {
                    renderFolderContent(parentPath, currentContentContainer, (newPath) => { });
                    renderLeftSidebar(
                        getFolderByPath(parentPath),
                        parentPath,
                        currentSidebarContainer,
                        (newPath) => { }
                    );
                }
            }

            contextMenu.style.display = "none";
        }
    });



}
