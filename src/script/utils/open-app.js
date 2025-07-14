import { winControl } from "./window-control.js";

export const openApp = async (data) => {
    const res = await fetch(`/src/pages/apps/${data}.html`);
    const html = await res.text();

    const page = document.querySelector('#content-wrap');
    page.insertAdjacentHTML('beforeend', html);

    winControl();


}