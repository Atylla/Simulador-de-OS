export const loadingScreenEimi = () => {
  const loading = document.createElement('div');
  loading.classList.add('loading-screen');
  loading.innerHTML = `
    <div class="loading-animation">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  `;
  return loading;
};