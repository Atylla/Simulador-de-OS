import { initDesktopDrag } from "../utils/drag-drop-app.js";
import { getFolderByPath, getFreshFolderByPath } from "./folderStorage.js";
import { openFolderWindow } from "./geralFolders.js";

export const addDesktopEventListeners = () => {
    const apps = document.querySelectorAll("#content-wrap .app");
  apps.forEach(app => {
    // Aqui adiciona os eventos que o app precisa, por exemplo:
    app.addEventListener("dblclick", () => {
      const folderName = app.querySelector("p").textContent;
      openFolderWindow(["Área de Trabalho", folderName]);
    });

  });
}

export const renderDesktop = () => {
    const desktop = document.querySelector("#content-wrap");
    desktop.innerHTML = "";

    const folder = getFreshFolderByPath(["Área de Trabalho"]);
    if (!folder) return;

    for (const name in folder.children) {
        const item = folder.children[name];

        if (item.type === "folder") {
            const icon = document.createElement("div");
            icon.classList.add("folder");
            icon.classList.add("app");

            const iconElem = document.createElement("ion-icon");
            iconElem.setAttribute("name", "folder");
            iconElem.classList.add("icone");
            icon.appendChild(iconElem);

            const label = document.createElement("p");
            label.textContent = item.name;
            icon.appendChild(label);

            // Clicou na pasta? Abre a janela
            icon.addEventListener("dblclick", () => {
                openFolderWindow(["Área de Trabalho", item.name]);
            });

            desktop.appendChild(icon);
        }
    }
    addDesktopEventListeners();
    initDesktopDrag();
}