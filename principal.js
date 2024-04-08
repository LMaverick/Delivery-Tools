// Gera um número aleatório entre 1,5s e 3s (em milissegundos)
var randomTime = Math.floor(Math.random() * (3000 - 1500 + 1)) + 1500;

// Define o tempo de espera com o número aleatório
setTimeout(function() {
    document.querySelector('.loader').style.display = 'none';
    document.querySelector('.fake-layer').style.display = 'none'; // Oculta a camada falsa
}, randomTime);