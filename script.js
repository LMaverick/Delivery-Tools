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
    const botoesAdicionar = document.querySelectorAll('.prod-carrinho');
    botoesAdicionar.forEach((botao, ) => {
        botao.addEventListener('click', () => {
            const dataIndex = botao.getAttribute('data-index'); // Obtém o índice do atributo data-index
            const index = parseInt(dataIndex);
            adicionarItemCarrinho(produtos[index]);
            document.getElementById("carrinho").style.visibility = "visible";
            document.querySelector('.carrinho-tooltip').style.display = "block";
        });
    });


    // Obtém todos os elementos com a classe "controleDaImg"
    var produtos2 = document.querySelectorAll('.controleDaImg');
  
    // Adiciona um evento de clique a cada produto e botão de adicionar ao carrinho
    produtos2.forEach(function(produto, index) {
        produto.addEventListener('click', function() {
            abrirModal(index);
        });
  
        
    });
  });
  
  function abrirModal(index) {
    var produto = produtos[index];
    var imgSrc = produto.imagem;
    var nomeProduto = produto.nome;
    var precoProduto = produto.preco.toFixed(2);
    var notaProduto = produto.nota;
    var marcaProduto = produto.marca;
    var tamanhoProduto = produto.tamanho;
    var materialProduto = produto.material;
    var sobreProduto = produto.sobre;
    var imagem2 = produto.imagem2;
    var imagem3 = produto.imagem3;
    var imagem4 = produto.imagem4;

    // Preenche o modal com os detalhes do produto
    var modalContent = document.getElementById('modal-contentInfo');
    modalContent.innerHTML = `
        <div class="container">
            <div class="ld_esq">
                <div class="imagem-principal">
                    <img src="${imgSrc}" alt="principal" id="imagem">
                </div>
                <div class="miniaturas">
                    <img class="miniatura" src="${imgSrc}" alt="Product Image 1" data-imagem="${imgSrc}">
                    <img class="miniatura" src="${imagem2}" alt="Product Image 2" data-imagem="${imagem2}">
                    <img class="miniatura" src="${imagem3}" alt="Product Image 3" data-imagem="${imagem3}">
                    <img class="miniatura" src="${imagem4}" alt="Product Image 4" data-imagem="${imagem4}">
                </div>
            </div>
            <div class="ld_dir">
                <div class="informacoes-produto">
                    <h2>${nomeProduto}</h2>
                    <div class="nota-produto" id="nota">
                        ${'<span class="fa fa-star checked"></span>'.repeat(notaProduto)}
                        ${'<span class="fa fa-star"></span>'.repeat(5 - notaProduto)}
                    </div>
                    <p class="produtoPreco">R$ ${precoProduto}</p>
                    <p class="produtoMarca">Marca: ${marcaProduto}</p>
                    <p class="produtoTamanho">Tamanho: ${tamanhoProduto}</p>
                    <p class="produtoMaterial">Material: ${materialProduto}</p>
                    <p class="produtoSobre">${sobreProduto}</p>
                    <button class="adicionar-carrinho">Continuar Vendo Mais Produtos</button>
                </div>
            </div>
        </div>
    `;

    // Adicionar eventos de mouseenter para trocar as imagens
    const miniaturas = document.querySelectorAll('.miniatura');
    const imagemPrincipal = document.getElementById('imagem');

    miniaturas.forEach(miniatura => {
        miniatura.addEventListener('mouseenter', function() {
            const novaImagem = this.dataset.imagem;
            imagemPrincipal.style.opacity = '0'; // Reduz a opacidade para iniciar a transição
            setTimeout(() => {
                imagemPrincipal.src = novaImagem; // Altera a imagem após um pequeno atraso para a transição
                imagemPrincipal.style.opacity = '1'; // Restaura a opacidade para mostrar a nova imagem
            }, 90); // Tempo de espera para a transição (90ms neste exemplo)
        });
    });

    // Exibe o modal
    var modal = document.getElementById('myModal');
    modal.style.display = 'block';
  
    // Fecha o modal quando o usuário clica no botão "Fechar" (X)
    var closeModal = document.querySelector('.close-button');
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
  
    var closeModal2 = document.querySelector('.adicionar-carrinho');
    closeModal2.addEventListener('click', function() {
        modal.style.display = 'none';
    });
  
    // Fecha o modal quando o usuário clica fora da área do modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
  }
  



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
        
        { nome: 'Produto 3', preco: 22.00, imagem: 'Files/Torneira.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},

        { nome: 'Produto 4', preco: 22.00, imagem: 'Files/Torneira.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},

        { nome: 'Produto 5', preco: 22.00, imagem: 'Files/Torneira.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},

        { nome: 'Produto 6', preco: 22.00, imagem: 'Files/chuveiro1.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},

        { nome: 'Produto 7', preco: 22.00, imagem: 'Files/SuporteToalha.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},
       

        { nome: 'Produto 8', preco: 22.00, imagem: 'Files/SuporteToalha.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},

        { nome: 'Produto 9', preco: 22.00, imagem: 'Files/SuporteToalha.png' , nota:'3',marca:'Lorenzetti', tamanho:'150x200x300mm', material:'plastico', sobre:'Acabamento/acionamento do tipo alavanca em metal cromado', imagem2:'Files/SuporteToalha.png', imagem3:'Files/Torneira.png', imagem4:'Files/SuporteToalha.png'},
    ];

    
/*
======================================================================
*/
//Abre a tela do nosso chat e já da o focu para parte de digitar o texto
function help() {
    document.querySelector(".botaoStart").style.display = "none";
    document.querySelector(".tela").style.visibility = "visible";
    
    var lista = document.querySelector(".lista");
    if (lista) {
      lista.scrollTop = lista.scrollHeight;
    }
  }
  
  
  document.addEventListener('DOMContentLoaded', function() {
    var botaoStart = document.getElementById("botaoStartId");
    if (botaoStart) {
        botaoStart.addEventListener('click', function() {
            document.getElementById("nome").focus(); // Direciona o foco para o campo de texto quando o botão é clicado
        });
    }
  });
  
  
  //Fecha a tela do chat 
  function clos(){
     document.querySelector(".tela").style.visibility = "hidden";
     document.querySelector(".botaoStart").style.display = "block";
  
  }
  
  
  
  //Button de envio de msg
  document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('btFechar');
    const nome = document.getElementById('nome');
    const lista = document.querySelector('.lista');
  
    button.addEventListener('click', function() {
        const inputName = nome.value;
        const inputNamee = inputName.toLowerCase();
        nome.value = '';
  
        // Verifica se o campo de texto está vazio, não permite o envio de msg vazia
        if (inputName === "") {
            return; // Encerra a execução da função para que a mensagem de erro não seja removida abaixo
        }
  
        // Aqui você pode continuar com o restante do código para processar a entrada do usuário
        const palavrasChave = ["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite"];
  
        if (palavrasChave.includes(inputNamee)) {
            const templateHTMLL = `<p id="msg">${inputNamee.charAt(0).toUpperCase() + inputNamee.slice(1)}</p><p id="ok">${inputNamee.charAt(0).toUpperCase() + inputNamee.slice(1)}, tudo bem? No que posso ajudar?</p>`;
            lista.innerHTML += templateHTMLL;
        } else if (inputNamee === "quero saber o que tem?") {
            const templateHTMLL = `<p id="msg">${inputNamee.charAt(0).toUpperCase() + inputNamee.slice(1)}</p><p id="ok">Muito bem, temos estas opções</p>`;
            lista.innerHTML += templateHTMLL;
        } else {
            const templateHTML = `<p id="msg">${inputName}</p><p id="ok">Desculpa, não consegui entender</p>`;
            lista.innerHTML += templateHTML;
        }
        lista.scrollTop = lista.scrollHeight;
    });
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita o comportamento padrão do Enter (quebra de linha no textarea)
        // Aqui você pode continuar com o restante do código para enviar a mensagem
        document.getElementById("btFechar").click();
    }
  });
  
  //Finalizar compra
  
  document.addEventListener('DOMContentLoaded', function() {
    const finalizarCompraBtn = document.getElementById("finalizar-compra-btn");
    const modal = document.getElementById("modal");
    const carrinhoTooltip = document.querySelector('.carrinho-tooltip');
  finalizarCompraBtn.addEventListener("click", function() {
  
      carrinhoTooltip.style.display = "none";
      modal.style.display = "block";
      document.getElementById("numero-usuario").style.display = "block";
      document.getElementById("name-usuario").style.display = "block";
      document.getElementById("email-usuario").style.display = "block";
      document.getElementById("gerar-qrcode").style.display = "block";
      document.getElementById("qrcode").style.display = "none";
      document.getElementById("alert").style.display = "none";
  });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("modal");
    const modalClose = document.getElementById("close");
  modalClose.addEventListener("click", function() {
      modal.style.display = "none";
      document.getElementById("alert").style.display = "none";
  });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const gerarQRCodeBtn = document.getElementById("gerar-qrcode");
  gerarQRCodeBtn.addEventListener("click", function() {
      const numeroUsuario = document.getElementById("numero-usuario").value;
      const nameUsuario = document.getElementById("name-usuario").value;
      const UserEmail= document.getElementById("email-usuario").value;
      document.getElementById("numero-usuario").value = "";
      document.getElementById("name-usuario").value = "";
      document.getElementById("email-usuario").value = "";
      // Aqui você pode gerar o QR Code com base no número do usuário
      const qrCodeDiv = document.getElementById("qrcode");
      qrCodeDiv.innerHTML = `<img src="Files/image.png?phone=${UserEmail}" name=${nameUsuario} alt="QR Code" id="QrCodeImg">`;
      
      console.log(numeroUsuario,nameUsuario,UserEmail);
      // Simulando o pagamento (após o pagamento real, você pode chamar a função enviarMensagemConfirmacao)
      setTimeout(function() {
          document.getElementById("alert").style.display = "block";
          enviarMensagemConfirmacao(UserEmail, nameUsuario);
      }, 5000); // Simulando um tempo de 5 segundos antes de enviar a mensagem
  });
  
  });
  
  // Função fictícia para simular o envio da mensagem de confirmação parte que mostra o número e o nome
  function enviarMensagemConfirmacao(email, name) {
      const alert = document.getElementById("alert");
      alert.innerHTML = `Olá ${name} mensagem de confirmação enviada para o e-mail: ${email} `;
      
  }
  
  
  //qrCode
  document.addEventListener('DOMContentLoaded', function() {
    const gerarQRCodeBtn = document.getElementById("gerar-qrcode");
  gerarQRCodeBtn .addEventListener("click", function() {
      document.getElementById("numero-usuario").style.display = "none";
      document.getElementById("name-usuario").style.display = "none";
      document.getElementById("email-usuario").style.display = "none";
      document.getElementById("gerar-qrcode").style.display = "none";
      document.getElementById("qrcode").style.display = "block";
      document.getElementById("myModal").style.display = "none";
  });
  });


  //========================================
  
  
  

  

