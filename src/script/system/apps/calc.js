export const renderCalc = () => {
    const painel = document.querySelector('#painel');
    const btnNumber = document.querySelectorAll('button[data-number]');
    const btnCaract = document.querySelectorAll('button[data-caract]');

    let valorAtual = '';

    painel.innerHTML = '';

    btnNumber.forEach( n => {
        n.addEventListener('click', () => {
            const valor = n.getAttribute('data-number');

            valorAtual += valor;

            painel.innerHTML = valorAtual;
        });
    })

    btnCaract.forEach( c => {
        c.addEventListener('click', () => {
            const caract = c.getAttribute('data-caract');

            if( caract === '=') {
                try {
                    const expressao = valorAtual
                        .replace(/,/g, '.')
                        //.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

                    const result = eval(expressao);
                    valorAtual = result.toString();
                    painel.innerHTML = valorAtual;
                } catch (e) {
                    painel.innerHTML = 'erro';
                    valorAtual = '';
                }
                return;
            } else if (caract === 'c') {
                valorAtual = valorAtual.slice(0, -1);
                painel.innerHTML = valorAtual || '0';
                return;
            } else if ( caract === '%') {
                painel.innerHTML = 'Operação ainda não implementada'
                return;
            }

            valorAtual += caract;

            painel.innerHTML = valorAtual;
        })
    })

}

