export const initDesktopDrag = () => {
    const gridSize = 80;
    const gridPadding = 20;
    const icons = document.querySelectorAll('.app');

    icons.forEach(icon => {
        let offsetX = 0;
        let offsetY = 0;
        let originalLeft = 0;
        let originalTop = 0;
        let isDragging = false;

        icon.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - icon.offsetLeft;
            offsetY = e.clientY - icon.offsetTop;

            originalLeft = icon.offsetLeft;
            originalTop = icon.offsetTop;

            icon.style.zIndex = 9999;
            icon.style.cursor = "grabbing";
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;

            icon.style.left = `${x}px`;
            icon.style.top = `${y}px`;
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;

            icon.style.cursor = "grab";

            const container = document.querySelector('#content-wrap');
            const rawLeft = icon.offsetLeft;
            const rawTop = icon.offsetTop;

            const x = Math.max(rawLeft, gridPadding);
            const y = Math.max(rawTop, gridPadding);

            const snappedLeft = Math.round((x - gridPadding) / gridSize) * gridSize + gridPadding;
            const snappedTop = Math.round((y - gridPadding) / gridSize) * gridSize + gridPadding;

            const maxLeft = container.offsetWidth - icon.offsetWidth - gridPadding;
            const maxTop = container.offsetHeight - icon.offsetHeight - gridPadding;

            const finalLeft = Math.min(Math.max(snappedLeft, gridPadding), maxLeft);
            const finalTop = Math.min(Math.max(snappedTop, gridPadding), maxTop);

            const allIcons = document.querySelectorAll('.app');
            let occupied = false;

            allIcons.forEach(other => {
                if (other === icon) return;

                const otherBounds = {
                    left: other.offsetLeft,
                    top: other.offsetTop,
                    right: other.offsetLeft + other.offsetWidth,
                    bottom: other.offsetTop + other.offsetHeight
                };

                const iconBounds = {
                    left: finalLeft,
                    top: finalTop,
                    right: finalLeft + icon.offsetWidth,
                    bottom: finalTop + icon.offsetHeight
                };

                const horizontalOverlap = iconBounds.left < otherBounds.right && iconBounds.right > otherBounds.left;
                const verticalOverlap = iconBounds.top < otherBounds.bottom && iconBounds.bottom > otherBounds.top;

                if (horizontalOverlap && verticalOverlap) {
                    occupied = true;
                }
            });


            if (!occupied) {
                icon.style.left = `${finalLeft}px`;
                icon.style.top = `${finalTop}px`;
            } else {
                icon.style.left = `${originalLeft}px`;
                icon.style.top = `${originalTop}px`;
                console.warn('Espaço ocupado! Ícone voltou pro lugar anterior.');
            }

            icon.style.zIndex = '';
        });
    });
};


export const positionInitialApps = () => {
    const gridSize = 80;
    const gridPadding = 20;

    const container = document.querySelector('#content-wrap');
    const containerWidth = container.offsetWidth;

    const cols = Math.floor((containerWidth - 2 * gridPadding) / gridSize);

    document.querySelectorAll('.app').forEach((el, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const x = col * gridSize + gridPadding;
        const y = row * gridSize + gridPadding;

        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
    });
};
