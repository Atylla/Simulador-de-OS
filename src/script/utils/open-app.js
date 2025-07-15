import { winControl } from "./window-control.js";

export const openApp = async (data) => {
    const res = await fetch(`/src/pages/apps/${data}.html`);
    const html = await res.text();

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const win = tempDiv.querySelector('.draggable-window');
    if (win) {
        win.setAttribute('id', `win=${Date.now()}`)
    }

    const page = document.querySelector('#content-wrap');
    page.insertAdjacentHTML('beforeend', tempDiv.innerHTML);

    winControl();

}