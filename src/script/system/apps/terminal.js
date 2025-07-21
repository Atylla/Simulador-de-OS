export const renderTerminal = () => {
    const container = document.querySelector('.container-wrap');
    const preLabel = document.createElement('p');

    let key = '';
    let valor = '';

    preLabel.innerText = '[root-terminal@teste]: ';
    container.appendChild(preLabel);

    document.addEventListener('keyup', (e) => {
        key = e.key;


        if( key === 'Backspace') {
            valor = valor.slice(0, -1);
        } else {
            valor += key;
        }

        preLabel.innerText = '[root-terminal@teste]: ' + valor;
    })
};