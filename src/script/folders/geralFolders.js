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
  const safeName = name.toLowerCase().replace(/\s+/g, '-');

  const existingWindow = document.querySelector(`.app-window[data-app-name="${safeName}"]`);
  if (existingWindow) {
    existingWindow.style.zIndex = Date.now();
    return;
  }

  const windowEl = document.createElement('div');
  windowEl.classList.add('draggable-window', 'app-window');
  windowEl.setAttribute('data-app-name', safeName);
  windowEl.setAttribute("id", `win-folder-${Date.now()}`);

  const loadingScreen = createLoadingScreen();

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
  `;

  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.classList.add('app-iframe');
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';

  windowEl.appendChild(loadingScreen);
  windowEl.appendChild(iframe);

  iframe.addEventListener('load', () => {
    loadingScreen.remove();
  });

  // Botão de fechar (já existia)
  windowEl.querySelector('.btn-close').addEventListener('click', () => {
    windowEl.remove();
  });

  document.querySelector("#content-wrap").appendChild(windowEl);
  winControl(windowEl);
};


export const createLoadingScreen = () => {
  const loading = document.createElement('div');
  loading.classList.add('loading-screen');
  loading.innerHTML = `
    <div class="loading-animation">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  `;
  return loading;
};





