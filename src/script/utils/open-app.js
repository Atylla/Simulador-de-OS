import { winControl } from "./window-control.js";


export const openApp = async (data) => {
    try {
        const res = await fetch(`/src/pages/apps/${data}.html`);
        if (!res.ok) {
            console.error(`Erro ao carregar app ${data}: ${res.status}`);
            return;
        }
        const html = await res.text();

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        const win = tempDiv.querySelector('.draggable-window');
        if (!win) {
            console.error('Elemento .draggable-window não encontrado no HTML carregado');
            return;
        }

        win.setAttribute('id', `win=${Date.now()}`);

        const page = document.querySelector('#content-wrap');
        page.appendChild(win);

        winControl(win); // chama só para a nova janela

    } catch (err) {
        console.error('Erro ao abrir app:', err);
    }
};
