import { compBar } from "./components/bottom-bar.js";
import { openApp } from "./utils/open-app.js";

document.querySelectorAll('.app').forEach((el) => {
    el.addEventListener('click', (e) => {
        const target = e.target.closest('[data-app]');
        if (!target) return;

        const data = target.getAttribute('data-app');
        openApp(data);
        console.log(data)
    });
});




compBar();




