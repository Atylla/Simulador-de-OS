import { openAppWindow, openFolderWindow } from "../folders/geralFolders.js";
import { renderCalc } from "../system/apps/calc.js";
import { openApp } from "../utils/open-app.js";
import { getZIndex } from "../utils/window-state.js";
import { renderApps } from "./renderApps.js";

export const compBar = async () => {
    const res = await fetch('/src/components/bottom-bar.html');
    const html = await res.text();

    const page = document.querySelector('#page-container');
    page.insertAdjacentHTML('beforeend', html);

    nowHours()
    setInterval(nowHours, 1000);

    requestAnimationFrame(() => {
        volumeBar();
        btnEimus();
        btnArquivos();
        renderApps();
        clickBotao();
        
    });
}

const clickBotao = () => {
    document.querySelector('#bottom-bar').addEventListener('click', (element) => {
        const target = element.target.closest('button[data-eimi]');
        if (!target) return;

        const data = target.getAttribute('data-eimi');
        const url = `src/pages/apps/${data}.html`;
        openAppWindow(data, url);
    })
}

const nowHours = () => {
    const agora = new Date();

    let horas = agora.getHours();
    let minutos = agora.getMinutes();

    let dia = agora.getDate().toString().padStart(2, '0');
    let mes = (agora.getMonth() + 1).toString().padStart(2, '0');
    let ano = agora.getFullYear();

    horas = horas.toString().padStart(2, '0');
    minutos = minutos.toString().padStart(2, '0');

    const dataFormatada = `${dia}/${mes}/${ano}`;
    const horaFormatada = `${horas}:${minutos}`;

    document.querySelector('#date').textContent = dataFormatada;
    document.querySelector('#clock').textContent = horaFormatada;
}

const volumeBar = () => {
    const volumeBtn = document.querySelector('#volume-btn');
    const popup = document.querySelector('#volume-popup');
    const slider = document.querySelector('#volume-slider');
    const icon = document.querySelector('#volume-icon');

    volumeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        popup.classList.toggle('show');
    });

    slider.addEventListener('input', () => {
        const volume = parseInt(slider.value);

        if (volume  === 0 ) {
            icon.setAttribute('name', 'volume-off');
        } else if (volume <= 30) {
            icon.setAttribute('name', 'volume-mute');
        } else if (volume <= 70) {
            icon.setAttribute('name', 'volume-low');
        } else {
            icon.setAttribute('name', 'volume-high');
        }

    })

    document.addEventListener('click', (e) => {
        if (!popup.contains(e.target) && !volumeBtn.contains(e.target)) {
            popup.classList.remove('show');
        }
    });
}

const btnEimus = () => {
    const btnEimus = document.querySelector('#btnEimus');
    const popup = document.querySelector('.popup-eimus');

    if (!popup || !btnEimus) {
        console.warn("Botão ou popup não encontrados!");
        return;
    }

    btnEimus.addEventListener('click', (e) => {
        e.stopPropagation(); 
        popup.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        const isClickInsidePopup = popup.contains(e.target);
        const isClickOnButton = btnEimus.contains(e.target);

        if (popup.classList.contains('show') && !isClickInsidePopup && !isClickOnButton) {
            popup.classList.remove('show');
            console.log('removendo show');
        }
    });
};


const btnArquivos = () => {
    document.querySelector('#arquivos').addEventListener('click', () => {
        console.log("Abrindo a pasta raiz!");
        openFolderWindow([]);
    })
}

export const createTaskbar = (win) => {
    const bottomBar = document.querySelector('.bb-left');
    const winId = win.getAttribute('id');

    if (!bottomBar || !winId) return;

    if(bottomBar.querySelector(`[data-window-id="${winId}"]`)) {
        return;
    }

    const btn = document.createElement('button');
    btn.textContent = win.querySelector('.window-header p')?.textContent || 'App';
    btn.classList.add('taskbar-app');
    btn.setAttribute('data-window-id', winId);

    btn.addEventListener('click', () => {
        const targetWindow = document.getElementById(winId);
        if (!targetWindow) return;


        if (targetWindow.style.display === 'none') {
            targetWindow.style.display = 'block';
        } else {
            targetWindow.style.display = 'none';
        }

        if (targetWindow.style.display === 'block') {
            targetWindow.style.zIndex = getZIndex();
        }

    });

    bottomBar.appendChild(btn);
}

export const removeTaskbar = (winId) => {
    const btn = document.querySelector(`.taskbar-app[data-window-id="${winId}"]`);
    if (btn) {
        btn.remove();
    }
};