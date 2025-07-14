export const dragAndDrop = () => {
    const windowElement = document.getElementById('app-window');
    const header = document.getElementById('drag-header');

    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;

        // Distância entre o clique e a borda da janela
        offsetX = e.clientX - windowElement.offsetLeft;
        offsetY = e.clientY - windowElement.offsetTop;

        document.body.style.userSelect = "none"; // Evita seleção acidental
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.userSelect = ""; // Libera seleção novamente
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        windowElement.style.left = `${x}px`;
        windowElement.style.top = `${y}px`;
    });
}


