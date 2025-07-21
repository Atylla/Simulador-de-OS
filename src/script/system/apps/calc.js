export const renderCalc = () => {
    const painel = document.querySelector('#painel');
    const btnNumber = document.querySelectorAll('button[data-number]');

    let valorAtual = '';

    painel.innerHTML = '';

    btnNumber.forEach( n => {
        n.addEventListener('click', () => {
            const valor = n.getAttribute('data-number');

            valorAtual += valor;

            painel.innerHTML = valorAtual;
        });
    })
    

}

