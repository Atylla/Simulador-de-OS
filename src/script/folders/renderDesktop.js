import { initDesktopDrag } from "../utils/drag-drop-app.js";
import { getFolderByPath, getFreshFolderByPath } from "./folderStorage.js";
import { openAppWindow, openFolderWindow } from "./geralFolders.js";

export const addDesktopEventListeners = () => {
  const apps = document.querySelectorAll("#content-wrap .app");
  apps.forEach(app => {
    const isApp = app.hasAttribute('data-app-url');
    const label = app.querySelector("p").textContent;

    app.addEventListener("dblclick", () => {
      if (isApp) {
        const url = app.getAttribute("data-app-url");
        openAppWindow(label, url);
      } else {
        openFolderWindow(["Área de Trabalho", label]);
      }
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
      icon.setAttribute("data-folder-path", ["Área de Trabalho", item.name].join("/"));

      const iconElem = document.createElement("ion-icon");
      iconElem.setAttribute("name", "folder");
      iconElem.classList.add("icone");
      icon.appendChild(iconElem);

      const label = document.createElement("p");
      label.textContent = item.name;
      icon.appendChild(label);

      icon.addEventListener("dblclick", () => {
        openFolderWindow(["Área de Trabalho", item.name]);
      });

      desktop.appendChild(icon);
    } else if (item.type === 'app') {
      const icon = document.createElement('div');
      icon.classList.add('folder', 'app');
      icon.setAttribute('data-app-url', item.url);

      const iconElem = document.createElement('ion-icon');
      iconElem.setAttribute('name', item.iconName);
      iconElem.classList.add('icone');
      icon.appendChild(iconElem);

      const label = document.createElement('p');
      label.textContent = item.name;
      icon.appendChild(label);

      icon.addEventListener('dblclick', () => {
        openAppWindow(item.name, item.url);
      });

      desktop.appendChild(icon);
    }


  }
  addDesktopEventListeners();
  initDesktopDrag();
}

export const renderFolderContent = (pathArray, container, onNavigate) => {
  const folder = getFolderByPath(pathArray);
  if (!folder) return;

  container.innerHTML = '';

  for (const name in folder.children) {
    const item = folder.children[name];
    if (item.type === "folder") {
      const icon = document.createElement("div");
      icon.classList.add("folder", "app");
      icon.setAttribute("data-folder-path", [...pathArray, name].join("/"));

      icon.style.position = "static"; 
      icon.style.left = "";
      icon.style.top = "";
      icon.style.zIndex = "";

      const iconElem = document.createElement("ion-icon");
      iconElem.setAttribute("name", "folder");
      iconElem.classList.add("icone");
      icon.appendChild(iconElem);

      const label = document.createElement("p");
      label.textContent = item.name;
      icon.appendChild(label);

      icon.addEventListener("dblclick", () => {
        onNavigate([...pathArray, item.name]);
      });

      container.appendChild(icon);
    }
  }
};


export const renderLeftSidebar = (folder, pathArray, container, onNavigate) => {
  container.innerHTML = '';

  for (const name in folder.children) {
    const item = folder.children[name];
    if (item.type === 'folder') {
      const li = document.createElement('li');
      li.innerHTML = `<ion-icon name="folder"></ion-icon> ${item.name}`;

      li.addEventListener('click', () => {
        onNavigate([...pathArray, item.name]);
      });

      container.appendChild(li);
    }
  }
};



