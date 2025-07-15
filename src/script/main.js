import { compBar } from "./components/bottom-bar.js";
import { openApp } from "./utils/open-app.js";

(async () => {
    await compBar(); // Espera a barra carregar completamente

    document.querySelectorAll('.app').forEach((el) => {
        el.addEventListener('click', (e) => {
            const target = e.target.closest('[data-app]');
            if (!target) return;
            const data = target.getAttribute('data-app');
            openApp(data);
        });
    });
})();




