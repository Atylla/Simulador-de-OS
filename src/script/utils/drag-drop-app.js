export const initDesktopDrag = () => {
  const gridSize = 80;
  const gridPadding = 20;
  const container = document.querySelector('#content-wrap');
  let draggedIcon = null;
  let offsetX = 0;
  let offsetY = 0;
  let originalLeft = 0;
  let originalTop = 0;

  // Adiciona event listener mousedown para cada ícone
  container.querySelectorAll('.app').forEach(icon => {
    icon.style.position = 'absolute'; // importante para mover
    icon.style.cursor = 'grab';

    icon.addEventListener('mousedown', (e) => {
      draggedIcon = icon;
      offsetX = e.clientX - icon.offsetLeft;
      offsetY = e.clientY - icon.offsetTop;
      originalLeft = icon.offsetLeft;
      originalTop = icon.offsetTop;

      icon.style.zIndex = 9999;
      icon.style.cursor = "grabbing";

      e.preventDefault();
    });
  });

  // Escuta mousemove globalmente
  document.addEventListener('mousemove', (e) => {
    if (!draggedIcon) return;

    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    draggedIcon.style.left = `${x}px`;
    draggedIcon.style.top = `${y}px`;
  });

  // Escuta mouseup globalmente para soltar o drag
  document.addEventListener('mouseup', () => {
    if (!draggedIcon) return;

    draggedIcon.style.cursor = 'grab';

    const icon = draggedIcon;
    draggedIcon = null;

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

    // Verifica colisão com outros ícones
    let occupied = false;
    container.querySelectorAll('.app').forEach(other => {
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
