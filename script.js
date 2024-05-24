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
    const precoTotalTwo = document.getElementById('preco-totalTwo');

    let carrinho = []; // Array para armazenar os itens no carrinho

    // Função para atualizar o preço total da compra
    function atualizarPrecoTotal() {
        let total = 0;
        carrinho.forEach(item => {
            total += item.preco * item.quantidade;
        });
        precoTotal.textContent = `R$ ${total.toFixed(2)}`;
        precoTotalTwo.textContent = `R$ ${total.toFixed(2)}`;
    }

    // Evento de clique no ícone do carrinho para exibir/ocultar o tooltip
    carrinhoIcon.addEventListener('click', function() {
        if (carrinhoTooltip.style.display === 'block') {
            carrinhoTooltip.style.display = 'none';
        } else {
            carrinhoTooltip.style.display = 'block';
        }
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
                    <p class="nome-item">${item.nome}</p>
                    <p>R$ ${item.preco.toFixed(2)}</p>
                </div>
                <div class="carrinho-item-actions">
                    <button class="remover-item">-</button>
                    <span>${item.quantidade}</span>
                    <button class="adicionar-item">+</button>
                </div>
            `;
            carrinhoItems.appendChild(carrinhoItem);

            // Adiciona eventos de clique para os botões de adicionar e remover itens
            const btnRemover = carrinhoItem.querySelector('.remover-item');
            btnRemover.addEventListener('click', () => {
                const nomeProduto = carrinhoItem.querySelector('.nome-item').textContent; // Obtém o nome do produto
                removerItem(nomeProduto);
            });
        });
    }

    // Evento de clique nos botões "Adicionar ao Carrinho"
    const botoesAdicionar = document.querySelectorAll('.adicionar-carrinho,.prod-carrinho');
    botoesAdicionar.forEach((botao, index) => {
        botao.addEventListener('click', () => {
            const dataIndex = botao.getAttribute('data-index'); // Obtém o índice do atributo data-index
            const index = parseInt(dataIndex);
            adicionarItemCarrinho(produtos[index]);
            document.getElementById("carrinho").style.visibility = "visible";
            document.querySelector('.carrinho-tooltip').style.display = "block";
        });
    });
});
/* 
// Evento de clique nos botões "Adicionar ao Carrinho" com a classe "adicionar-carrinho"
const botoesAdicionar = document.querySelectorAll('.adicionar-carrinho');
botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', () => {
        const dataIndex = botao.getAttribute('data-index'); // Obtém o índice do atributo data-index
        const index = parseInt(dataIndex);
        adicionarItemCarrinho(produtos[index]);
        document.getElementById("carrinho").style.visibility = "visible";
        document.querySelector('.carrinho-tooltip').style.display = "block";
    });
});





// Evento de clique nos botões "Adicionar ao Carrinho" com a classe "prod-carrinho"
const botoesProdCarrinho = document.querySelectorAll('.prod-carrinho');
botoesProdCarrinho.forEach(botao => {
    botao.addEventListener('click', () => {
        const dataIndex = botao.getAttribute('data-index'); // Obtém o índice do atributo data-index
        const index = parseInt(dataIndex);
        adicionarItemCarrinho(produtos[index]);
        document.getElementById("carrinho").style.visibility = "visible";
        document.querySelector('.carrinho-tooltip').style.display = "block";
    });
});
 */

    // Produtos
    const produtos = [
        { nome: 'Suporte Banheiro Porta Toalha Toalheiro De Banho Duplo 90° Adesivo Sem Furo Premium', preco: 79.90, imagem: 'Files/chuveiro1.png', nota:'5',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},
        
        { nome: 'Produto 2', preco: 25.00, imagem: 'Files/chuveiro1.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},
        
        { nome: 'Produto 3', preco: 22.00, imagem: 'Files/chuveiro1.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},

        { nome: 'Produto 4', preco: 22.00, imagem: 'Files/chuveiro1.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},

        { nome: 'Produto 5', preco: 22.00, imagem: 'Files/chuveiro1.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},

        { nome: 'Produto 6', preco: 22.00, imagem: 'Files/chuveiro1.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},

        { nome: 'Produto 7', preco: 22.00, imagem: 'Files/chuveiro1.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},
       

        { nome: 'Produto 8', preco: 22.00, imagem: 'Files/chuveiro1.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},

        { nome: 'Produto 9', preco: 22.00, imagem: 'Files/chuveiro1.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},
    ];

    const botoesAdicionar = document.querySelectorAll('.adicionar-carrinho,.-carrinprodho');
botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', () => {
        const dataIndex = botao.getAttribute('data-index'); // Obtém o índice do atributo data-index
        const index = parseInt(dataIndex);
        adicionarItemCarrinho(produtos[index]);
        document.getElementById("carrinho").style.visibility = "visible";
        document.querySelector('.carrinho-tooltip').style.display = "block";
    });
});


/*
// Evento de clique nos botões "Adicionar ao Carrinho" com a classe "adicionar-carrinho"
const botoesAdicionar = document.querySelectorAll('.adicionar-carrinho');
botoesAdicionar.forEach((botao, index) => {
    botao.addEventListener('click', () => {
        const dataIndex = botao.getAttribute('data-index'); // Obtém o índice do atributo data-index
        const index = parseInt(dataIndex);
        adicionarItemCarrinho(produtos[index]);
        document.getElementById("carrinho").style.visibility = "visible";
        document.querySelector('.carrinho-tooltip').style.display = "block";
    });
});

// Evento de clique nos botões "Adicionar ao Carrinho" com a classe "prod-carrinho"
const botoesProdCarrinho = document.querySelectorAll('.prod-carrinho');
botoesProdCarrinho.forEach((botao, index) => {
    botao.addEventListener('click', () => {
        const dataIndex = botao.getAttribute('data-index'); // Obtém o índice do atributo data-index
        const index = parseInt(dataIndex);
        adicionarItemCarrinho(produtos[index]);
        document.getElementById("carrinho").style.visibility = "visible";
        document.querySelector('.carrinho-tooltip').style.display = "block";
    });
});

});


*/


