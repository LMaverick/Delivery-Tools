// Gera um número aleatório entre 1,5s e 3s (em milissegundos)
var randomTime = Math.random() * (2100 - 1000) + 1000;

// Define o tempo de espera com o número aleatório
setTimeout(function() {
    document.querySelector('.loader').style.display = 'none';
    document.querySelector('.fake-layer').style.display = 'none'; // Oculta a camada falsa
}, randomTime);
//===================

document.addEventListener('DOMContentLoaded', function() {
    const carrinhoIcon = document.querySelector('.carrinho-icon');
    const carrinhoTooltip = document.querySelector('.carrinho-tooltip');
    const carrinhoItems = document.getElementById('carrinho-items');

    const botoesAdicionar = document.querySelectorAll('.prod-carrinho');
    botoesAdicionar.forEach((botao, index) => {
        botao.addEventListener('click', function() {
            const produto = botao.parentElement;
            const nome = produto.querySelector('.prod-txt').textContent;
            const preco = produto.querySelector('.prod-preco').textContent;

            // Cria um novo item no carrinho
            const novoItem = document.createElement('div');
            novoItem.classList.add('carrinho-item');
            novoItem.innerHTML = `
                <img src="${produto.querySelector('.prod-img img').src}" alt="">
                <div>
                    <p>${nome}</p>
                    <p>${preco}</p>
                </div>
                <button class="remove-produto">Remover</button>
            `;
            carrinhoItems.appendChild(novoItem);

            // Adiciona evento de remover
            const removeBtn = novoItem.querySelector('.remove-produto');
            removeBtn.addEventListener('click', function() {
                carrinhoItems.removeChild(novoItem);
            });
        });
    });

    carrinhoIcon.addEventListener('click', function() {
        carrinhoTooltip.classList.toggle('show');
    });
});