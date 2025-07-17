import { winControl } from "../utils/window-control.js";
import { createFolder, getFolderByPath } from "./folderStorage.js";
import { getZIndex } from "../utils/window-state.js";
import { renderFolderContent, renderLeftSidebar } from "./renderDesktop.js";

export function openFolderWindow(pathArray) {
  const folderHistory = [pathArray];
  let currentIndex = 0;

  const folder = getFolderByPath(pathArray);
  if (!folder) return;

  const existing = document.querySelector(`.draggable-window[data-folder-path="${pathArray.join('/')}"`);
  if (existing) {
    existing.style.zIndex = getZIndex();
    return;
  }

  const windowDiv = document.createElement("div");
  windowDiv.classList.add("draggable-window", "app-window");
  windowDiv.setAttribute("data-folder-path", pathArray.join('/'));
  windowDiv.setAttribute("id", `win-folder-${Date.now()}`);

  windowDiv.innerHTML = `
    <div class="window-header drag-header">
      <div class="wh-left">
        <p>${folder.name}</p>
      </div>
      <div class="wh-right">
        <div><ion-icon name="remove-circle"></ion-icon></div>
        <div><ion-icon name="square-outline"></ion-icon></div>
        <div><ion-icon name="close-circle"></ion-icon></div>
      </div>
    </div>
    <div class="window-body">
      <div class="left-bar">
        <div class="section">
          <h4>📁 Pastas</h4>
          <ul class="folder-list"></ul>
        </div>
      </div>
      <div class="right-panel">
        <div class="folder-toolbar">
          <button class="back-folder-btn">⬅ Voltar</button>
          <button class="new-folder-btn">Nova Pasta</button>
        </div>
        <div class="folder-content"></div>
      </div>
    </div>
  `;

  document.querySelector("#content-wrap").appendChild(windowDiv);
  winControl(windowDiv);

  const folderContentDiv = windowDiv.querySelector('.folder-content');
  const leftBarList = windowDiv.querySelector('.folder-list');



  function updateWindowContent(path) {
    const folder = getFolderByPath(path);
    if (!folder) return;

    renderFolderContent(path, folderContentDiv, navigateTo);
    renderLeftSidebar(folder, path, leftBarList, navigateTo);
  }

  function navigateTo(path) {
    folderHistory.splice(currentIndex + 1);
    folderHistory.push(path);
    currentIndex++;
    updateWindowContent(path);
  }

  windowDiv.querySelector('.back-folder-btn').addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateWindowContent(folderHistory[currentIndex]);
    }
  });

  windowDiv.querySelector('.new-folder-btn').addEventListener('click', () => {
    const nome = prompt('Nome da nova pasta:');
    if (nome) {
      const currentPath = folderHistory[currentIndex];
      createFolder(currentPath, nome);
      updateWindowContent(currentPath);
    }
  });

  windowDiv.updateContent = updateWindowContent;
  windowDiv.getCurrentPath = () => folderHistory[currentIndex];

  updateWindowContent(pathArray);
}

export const openAppWindow = (name, url) => {
  const safeName = name.toLowerCase().replace(/\s+/g, '-'); // "Evernote Clone" vira "evernote-clone"
  const existingWindow = document.querySelector(`.app-window[data-app-name="${safeName}"]`);

  if (existingWindow) {
    // opcional: trazer janela pro topo (se você tiver um sistema de z-index ou foco)
    existingWindow.style.zIndex = Date.now(); // ou qualquer lógica de foco
    return;
  }

  const windowEl = document.createElement('div');
  windowEl.classList.add('draggable-window', 'app-window');
  windowEl.setAttribute('data-app-name', safeName); // marca essa janela como única
  windowEl.setAttribute("id", `win-folder-${Date.now()}`);

  windowEl.innerHTML = `
    <div class="window-header drag-header">
      <div class="wh-left">
        <p>${name}</p>
      </div>
      <div class="wh-right">
        <div><ion-icon name="remove-circle"></ion-icon></div>
        <div><ion-icon name="square-outline"></ion-icon></div>
        <div><ion-icon name="close-circle" class="btn-close"></ion-icon></div>
      </div>
    </div>
    <iframe src="${url}" class="app-iframe" style="width:100%;height:100%;border:none;"></iframe>
  `;

  windowEl.querySelector('.btn-close').addEventListener('click', () => {
    windowEl.remove();
  });

  document.querySelector("#content-wrap").appendChild(windowEl);
  winControl(windowEl);
};






