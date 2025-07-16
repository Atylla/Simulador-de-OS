import { winControl } from "../utils/window-control.js";
import { createFolder, getFolderByPath } from "./folderStorage.js";
import { getZIndex } from "../utils/window-state.js";
import { renderFolderContent, renderLeftSidebar } from "./renderDesktop.js";

export function openFolderWindow(pathArray) {
  const folder = getFolderByPath(pathArray);
  if (!folder) return;

  // Evitar abrir janela duplicada da mesma pasta:
  const existing = document.querySelector(`.draggable-window[data-folder-path="${pathArray.join('/')}"]`);
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
            <h4>🌐 Locais</h4>
            <ul class="folder-list">
              <li><ion-icon name="desktop"></ion-icon> Área de Trabalho</li>
              <li><ion-icon name="trash"></ion-icon> Lixeira</li>
              <li><ion-icon name="document"></ion-icon> Documentos</li>
              <li><ion-icon name="image"></ion-icon> Imagens</li>
              <li><ion-icon name="videocam"></ion-icon> Vídeos</li>
            </ul>
          </div>
          <div class="section">
            <h4>💾 Dispositivo</h4>
            <ul class="folder-list">
              <li><ion-icon name="folder"></ion-icon> / (root)</li>
              <li><ion-icon name="cloud"></ion-icon> Armazenamento Online</li>
            </ul>
          </div>
        </div>
        <div class="right-panel">
          <div class="folder-toolbar">
            <button class="new-folder-btn">Nova Pasta</button>
          </div>
          <div class="folder-content">
            <!-- conteúdo vai ser renderizado aqui -->
          </div>
        </div>
    </div>
  `;

  document.querySelector("#content-wrap").appendChild(windowDiv);

  winControl(windowDiv);

  const folderContentDiv = windowDiv.querySelector('.folder-content');
  renderFolderContent(pathArray, folderContentDiv);

  windowDiv.querySelector('.new-folder-btn').addEventListener('click', () =>{
    const nome = prompt('Nome da nova pasta:');
    if (nome) {
      createFolder(pathArray, nome);
      const updatedFolder = getFolderByPath(pathArray);
      renderFolderContent(pathArray, folderContentDiv);
      renderLeftSidebar(updatedFolder, pathArray, leftBarList);
    }
  })

  const leftBarList = windowDiv.querySelector('.left-bar .section ul.folder-list');
  renderLeftSidebar(folder, pathArray, leftBarList);
}
