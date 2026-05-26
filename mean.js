function scrollToCalc() {
    document.getElementById('calculadora').scrollIntoView({
        behavior: 'smooth'
    });
}


const ctx = document.getElementById('grafico');

const grafico = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Sua Casa', 'Média Brasileira'],
        datasets: [{
            label: 'Litros por mês',
            data: [0, 12000],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


function calcularConsumo() {

    const banho = Number(document.getElementById('banho').value);
    const moradores = Number(document.getElementById('moradores').value);
    const roupa = Number(document.getElementById('roupa').value);
    const torneira = Number(document.getElementById('torneira').value);


    if (!banho || !moradores || !roupa) {
        alert('Preencha todos os campos!');
        return;
    }


    const consumoBanho = banho * 12 * moradores * 30;

    const consumoRoupa = roupa * 150 * 4;

    const consumoTorneira = torneira * 30;


    const total = consumoBanho + consumoRoupa + consumoTorneira;

    const economia = Math.floor(total * 0.25);


    document.getElementById('resultado').innerHTML =
        total.toLocaleString('pt-BR') + ' L';

}