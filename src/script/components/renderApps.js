export const renderApps = () => {
    const btns = document.querySelectorAll('button[data-eimi]');
    renderOficial('acessorio');
    btns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            const valor = btn.dataset.eimi;
            console.log('valor do data: ', valor)

            renderOficial(valor);
        })
    })
}

const renderOficial = (valor) => {
    const local = document.querySelector('.pe-descricoes');
    
    const botoes = {
        acessorio: [
            'calculadora',
            'notas',
            'terminal'
        ],
        config: [
            'aparencia',
            'font'
        ],
        escritorio: [
            'to-do',
            'notas',
            'paint'
        ],
        jogos: [

        ]

    };

    local.innerHTML = '';

    const lista = botoes[valor];
    if (lista) {
        criarBotoes(lista, local);
    } else {
        console.warn('categoria desocnhecidoa', valor);
    }
}

const criarBotoes = (lista, container) => {
    lista.forEach(name => {
        const btn = document.createElement('button');
        btn.setAttribute('data-eimi', name); //mudar valor
        btn.classList.add('bottomApp');
        btn.innerText = name;
        container.appendChild(btn);
    })
};

