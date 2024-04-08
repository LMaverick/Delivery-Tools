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
    const finalizarCompraBtn = document.getElementById('finalizar-compra-btn');
    const precoTotal = document.getElementById('preco-total');
    let carrinho = []; // Array para armazenar os itens no carrinho

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
        renderizarCarrinho();
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
            renderizarCarrinho();
            atualizarPrecoTotal();
        }
    }

    // Função para renderizar os itens do carrinho
    function renderizarCarrinho() {
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
                    <button onclick="removerItem('${item.nome}')">-</button>
                    <span>${item.quantidade}</span>
                    <button onclick="adicionarItemCarrinho(${JSON.stringify(item)})">+</button>
                </div>
            `;
            carrinhoItems.appendChild(carrinhoItem);
        });
    }

    // Exemplo de produtos
    const produtos = [
        { nome: 'Suporte Banheiro Porta Toalha Toalheiro De Banho Duplo 90° Adesivo Sem Furo Premium', preco: 79.90, imagem: 'Files/suporteToalha.png' },
        { nome: 'Produto 2', preco: 20.00, imagem: 'Files/suporteToalha.png' },
        { nome: 'Produto 2', preco: 20.00, imagem: 'Files/suporteToalha.png' },
        { nome: 'Produto 2', preco: 20.00, imagem: 'Files/suporteToalha.png' },
        { nome: 'Produto 2', preco: 20.00, imagem: 'Files/suporteToalha.png' },
        { nome: 'Produto 3', preco: 30.00, imagem: 'Files/suporteToalha.png' }
    ];

    // Evento de clique nos botões "Adicionar ao Carrinho"
    const botoesAdicionar = document.querySelectorAll('.prod-carrinho');
    botoesAdicionar.forEach((botao, index) => {
        botao.addEventListener('click', () => {
            adicionarItemCarrinho(produtos[index]);
        });
    });
});
