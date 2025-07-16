import { compBar } from "./components/bottom-bar.js";
import { initFileSystem } from "./folders/initFileSystem.js";
import { renderDesktop } from "./folders/renderDesktop.js";
import { rightClick } from "./mouse/click-right.js";
import { initDesktopDrag, positionInitialApps } from "./utils/drag-drop-app.js";
import { openApp } from "./utils/open-app.js";

window.addEventListener('load', async () => {
    initFileSystem();
    renderDesktop();
    rightClick();
});

(async () => {
    await compBar();
    initDesktopDrag();
    positionInitialApps();
    

    document.querySelector('#content-wrap').addEventListener('dblclick', (e) => {
    const target = e.target.closest('.app[data-app]');
    if (!target) return;
    const data = target.getAttribute('data-app');
    openApp(data);
});
})();




