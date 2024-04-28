// Gera um número aleatório entre 1,5s e 3s (em milissegundos)
var randomTime = Math.random() * (2100 - 1000) + 1000;

// Define o tempo de espera com o número aleatório
setTimeout(function() {
    document.querySelector('.loader').style.display = 'none';
    document.querySelector('.fake-layer').style.display = 'none'; // Oculta a camada falsa
}, randomTime);
//===================


// Função para renderizar os itens do carrinho
function renderizarCarrinho(carrinho) {
    const carrinhoItems = document.getElementById('carrinho-items');
    carrinhoItems.innerHTML = ''; // Limpa o conteúdo anterior
    carrinho.forEach(item => {
        const carrinhoItem = document.createElement('div');
        carrinhoItem.classList.add('carrinho-item');
        carrinhoItem.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="carrinho-item-text">
                <p>${item.nome}</p>
                <p>R$ ${item.preco.toFixed(2)}</p>
            </div>
            <div class="carrinho-item-actions">
                <button class="remover-item" data-nome="${item.nome}">-</button>
                <span>${item.quantidade}</span>
                <button class="adicionar-item" data-nome="${item.nome}">+</button>
            </div>
        `;
        carrinhoItems.appendChild(carrinhoItem);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const carrinhoIcon = document.querySelector('.carrinho-icon');
    const carrinhoTooltip = document.querySelector('.carrinho-tooltip');
    const finalizarCompraBtn = document.getElementById('finalizar-compra-btn');
    const precoTotal = document.getElementById('preco-total');
    let carrinho = JSON.parse(sessionStorage.getItem('carrinho')) || []; // Array para armazenar os itens no carrinho

    // Função para atualizar o preço total da compra
    function atualizarPrecoTotal() {
        let total = 0;
        carrinho.forEach(item => {
            total += item.preco * item.quantidade;
        });
        precoTotal.textContent = `R$ ${total.toFixed(2)}`;
    }

    // Evento de clique no ícone do carrinho para exibir/ocultar o tooltip
    carrinhoIcon.addEventListener('click', function() {
        if (carrinhoTooltip.style.display === 'block') {
            carrinhoTooltip.style.display = 'none';
        } else {
            carrinhoTooltip.style.display = 'block';
            // Lógica para abrir o carrinho aqui (ainda não implementada)
        }
    });

    // Adicionar evento de clique para o botão "Finalizar Compra"
    finalizarCompraBtn.addEventListener('click', function() {
        // Lógica para finalizar a compra (ainda não implementada)
    });

    // Função para adicionar um item ao carrinho
    function adicionarItemCarrinho(item) {
        const index = carrinho.findIndex(i => i.nome === item.nome);
        if (index !== -1) {
            carrinho[index].quantidade++;
        } else {
            carrinho.push({...item, quantidade: 1});
        }
        renderizarCarrinho(carrinho);
        atualizarPrecoTotal();
    }

    // Função para remover um item do carrinho
    function removerItem(nome) {
        const index = carrinho.findIndex(item => item.nome === nome);
        if (index !== -1) {
            if (carrinho[index].quantidade > 1) {
                carrinho[index].quantidade--;
            } else {
                carrinho.splice(index, 1);
            }
            renderizarCarrinho(carrinho);
            atualizarPrecoTotal();
        }
    }

    // Renderiza o carrinho ao carregar a página
    renderizarCarrinho(carrinho);

    // Eventos de clique para os botões de adicionar e remover itens
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('adicionar-item')) {
            const nome = event.target.dataset.nome;
            adicionarItemCarrinho(nome);
        } else if (event.target.classList.contains('remover-item')) {
            const nome = event.target.dataset.nome;
            removerItem(nome);
        }
    });
});
