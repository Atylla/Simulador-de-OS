import { compBar } from "./components/bottom-bar.js";
import { openApp } from "./utils/open-app.js";

document.querySelectorAll('.app-open').forEach((el) => {
    el.addEventListener('click', (e) => {
        const data = el.getAttribute('data-app');
        openApp(data);
    });
});




compBar();




