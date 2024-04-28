// Gera um número aleatório entre 1,5s e 3s (em milissegundos)
var randomTime = Math.random() * (2100 - 1000) + 1000;

// Define o tempo de espera com o número aleatório
setTimeout(function() {
    document.querySelector('.loader').style.display = 'none';
    document.querySelector('.fake-layer').style.display = 'none'; // Oculta a camada falsa
}, randomTime);

//==========================================================


document.addEventListener('DOMContentLoaded', function() {
    // Recupera os dados do carrinho do sessionStorage
    let carrinhoData = JSON.parse(sessionStorage.getItem('carrinho'));

    // Verifica se há dados de carrinho no sessionStorage
    let carrinho = carrinhoData !== null ? carrinhoData : [];

    console.log("Carrinho atualizado:", carrinho);

    const carrinhoIcon = document.querySelector('.carrinho-icon');
    const carrinhoTooltip = document.querySelector('.carrinho-tooltip');
    const carrinhoItems = document.getElementById('carrinho-items');
    const finalizarCompraBtn = document.getElementById('finalizar-compra-btn');
    const precoTotal = document.getElementById('preco-total');

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
        }
    });

    // Adicionar evento de clique para o botão "Finalizar Compra"
    finalizarCompraBtn.addEventListener('click', function() {
        // Lógica para finalizar a compra (ainda não implementada)
    });

    // Função para adicionar um item ao carrinho
    function adicionarItemCarrinho(nome, imagem, preco) {
        console.log("Adicionando item ao carrinho:", nome);
        const index = carrinho.findIndex(item => item.nome === nome);
        if (index !== -1) {
            carrinho[index].quantidade++;
        } else {
            carrinho.push({ nome, imagem, preco, quantidade: 1 });
        }
        console.log("Carrinho atualizado:", carrinho);
        sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
        renderizarCarrinho();
        atualizarPrecoTotal();
    }

    // Função para remover um item do carrinho
    function removerItem(nome) {
        console.log("Removendo item do carrinho:", nome);
        const index = carrinho.findIndex(item => item.nome === nome);
        if (index !== -1) {
            if (carrinho[index].quantidade > 1) {
                carrinho[index].quantidade--;
            } else {
                carrinho.splice(index, 1);
            }
            console.log("Carrinho atualizado:", carrinho);
            sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
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
                    <button class="remover-item">-</button>
                    <span>${item.quantidade}</span>
                    <button class="adicionar-item">+</button>
                </div>
            `;
            carrinhoItems.appendChild(carrinhoItem);

            // Adiciona eventos de clique para os botões de adicionar e remover itens
            const btnRemover = carrinhoItem.querySelector('.remover-item');
            btnRemover.addEventListener('click', () => removerItem(item.nome));

            const btnAdicionar = carrinhoItem.querySelector('.adicionar-item');
            btnAdicionar.addEventListener('click', () => adicionarItemCarrinho(item.nome, item.imagem, item.preco));
        });
    }
    // Evento de clique nos elementos .adicionar-carrinho para adicionar itens ao carrinho
const botoesAdicionar = document.querySelectorAll('.adicionar-carrinho');
botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', function() {
        const produtoSelecionado = JSON.parse(sessionStorage.getItem('produtoSelecionado'));
        adicionarItemCarrinho(produtoSelecionado.nome, produtoSelecionado.imagem, produtoSelecionado.preco);
    });
});

    // Produtos
    const produtos = [
        { nome: 'Suporte Banheiro Porta Toalha Toalheiro De Banho Duplo 90° Adesivo Sem Furo Premium', preco: 79.90, imagem: 'Files/chuveiro1.png', nota:'5',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},
        
        { nome: 'Produto 2', preco: 22.00, imagem: 'Files/chuveiro1.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},
        
        { nome: 'Produto 3', preco: 22.00, imagem: 'Files/chuveiro1.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},

        { nome: 'Produto 4', preco: 22.00, imagem: 'Files/chuveiro1.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},

        { nome: 'Produto 5', preco: 22.00, imagem: 'Files/chuveiro1.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},

        { nome: 'Produto 6', preco: 22.00, imagem: 'Files/chuveiro1.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},

        { nome: 'Produto 7', preco: 22.00, imagem: 'Files/chuveiro1.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},
       

        { nome: 'Produto 8', preco: 22.00, imagem: 'Files/chuveiro1.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},

        { nome: 'Produto 9', preco: 22.00, imagem: 'Files/chuveiro1.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},
    ];

    // Evento de clique nos elementos .prod-itens para redirecionar para a página de detalhes do item
    const itens = document.querySelectorAll('.prod-itens');
    itens.forEach((item, index) => {
        item.addEventListener('click', () => redirecionarParaDetalhes(produtos[index]));
    });

    // Função para redirecionar para a página de detalhes do item
    function redirecionarParaDetalhes(item) {
        // Armazene os dados do produto selecionado no sessionStorage
        sessionStorage.setItem('produtoSelecionado', JSON.stringify(item));
        // Redirecione para a página de detalhes do item com os parâmetros na URL
        window.location.href = `detalhes_item.html?nome=${item.nome}&preco=${item.preco}&imagem=${item.imagem}`;
    }

    // Função para recuperar o carrinho do sessionStorage e renderizar na página
    function inicializarCarrinho() {
        carrinho = JSON.parse(sessionStorage.getItem('carrinho')) || [];
        renderizarCarrinho();
        atualizarPrecoTotal();
    }

    // Inicializa o carrinho ao carregar a página
    inicializarCarrinho();

});
