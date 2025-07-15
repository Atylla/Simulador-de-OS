import { compBar } from "./components/bottom-bar.js";
import { initDesktopDrag, positionInitialApps } from "./utils/drag-drop-app.js";
import { openApp } from "./utils/open-app.js";

(async () => {
    await compBar();
    initDesktopDrag();
    positionInitialApps();

    document.querySelectorAll('.app').forEach((el) => {
        el.addEventListener('dblclick', (e) => {
            const target = e.target.closest('[data-app]');
            if (!target) return;
            const data = target.getAttribute('data-app');
            openApp(data);
        });
    });
})();




