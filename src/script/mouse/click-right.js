export const rightClick = () => {
    const desktop = document.querySelector('#content-wrap');
    const contextMenu = document.querySelector('#custom-context-menu');

    // Abre o menu com clique direito
    desktop.addEventListener('contextmenu', (e) => {
        e.preventDefault();

        const x = e.clientX;
        const y = e.clientY;

        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
        contextMenu.style.display = 'block';
    });

    // Fecha ao clicar fora
    document.addEventListener('click', () => {
        contextMenu.style.display = 'none';
    });

    // Adiciona ações do menu
    document.querySelector('#new-folder').addEventListener('click', () => {
        console.log('Criar nova pasta'); // substitui depois com openApp('pasta') ou algo similar
        contextMenu.style.display = 'none';
    });

    document.querySelector('#refresh').addEventListener('click', () => {
        console.log('Atualizar área de trabalho');
        contextMenu.style.display = 'none';
    });

}