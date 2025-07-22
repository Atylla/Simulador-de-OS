export const renderTerminal = () => {
    const container = document.querySelector('.container-wrap');
    const preLabel = document.createElement('p');
    const pisca = document.createElement('span');
    pisca.classList.add('pisca')

    let key = '';
    let valor = '';

    preLabel.innerText = '[root-terminal@eimi-os]: ';
    container.appendChild(preLabel);
    preLabel.appendChild(pisca);

    document.addEventListener('keyup', (e) => {
        key = e.key;
        console.log(key);
        preLabel.removeChild(preLabel.lastChild);

        if( key === 'Backspace') {
            valor = valor.slice(0, -1);
        } else if (key === ' ') {
            valor += ' ';
        } else if (/^[a-zA-Z0-9]$/.test(key)) {
            valor += key;
        }

        preLabel.textContent = '[root-terminal@eimi-os]: ' + valor;
        preLabel.appendChild(pisca)
    })
};