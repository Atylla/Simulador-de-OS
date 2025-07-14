import { compBar } from "./components/bottom-bar.js";
import { openApp } from "./utils/open-app.js";

document.querySelectorAll('.app').forEach((el) => {
    el.addEventListener('click', (e) => {
        const data = e.target.getAttribute('data-app');
        openApp(data);
        console.log(data)
    });
});




compBar();




