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
        
            const btnAdicionar = carrinhoItem.querySelector('.adicionar-item');
            btnAdicionar.addEventListener('click', () => {
                const nomeProduto = carrinhoItem.querySelector('.nome-item').textContent; // Obtém o nome do produto
                const produto = carrinho.find(i => i.nome === nomeProduto); // Encontra o produto no carrinho
                adicionarItemCarrinho(produto);
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
                <div class="prod-img"><img src="${imgSrc}" alt="principal" id="imagem"></div>
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
        {
            nome: 'Ducha Top Jet Lorenzetti 4 Temperaturas 220v 7500w',
            preco: 63.90,
            imagem: 'Files/produto1-1.jpg',
            nota: '4',
            marca: 'LORENZETTI',
            tamanho: 'N/A',
            material: 'Plásticos de engenharia e ligas de metal',
            sobre: 'Comando multitemperaturas: quatro temperaturas – mais conforto e economia. Fácil Instalação. Resistência de troca rápida: tipo refil, de fácil acesso. Grande espalhador: mais conforto no seu banho. Cor: branco',
            imagem2: 'Files/produto1-2.jpg',
            imagem3: 'Files/produto1-3.jpg',
            imagem4: 'Files/produto1-4.jpg'
        },
        {
            nome: 'Lorenzetti Loren Shower Ultra Multitemperaturas, 7500W, 220V, Branco',
            preco: 75.20,
            imagem: 'Files/produto2-1.png',
            nota: '3',
            marca: 'LORENZETTI',
            tamanho: '150x200x300mm',
            material: 'Plástico',
            sobre: 'Estilo Moderno, Forma Quadrado, Tipo de acabamento Polido',
            imagem2: 'Files/produto2-2.jpg',
            imagem3: 'Files/produto2-3.jpg',
            imagem4: 'Files/produto2-4.jpg'
        },
        {
            nome: 'Chuveiro Acqua Duo 220V 7800W, Lorenzetti, 7510098, Branco, Pequeno',
            preco: 120.90,
            imagem: 'Files/produto3-1.jpg',
            nota: '4',
            marca: 'LORENZETTI',
            tamanho: 'N/A',
            material: 'Plásticos de engenharia e ligas de metal',
            sobre: 'Tecnologia Press Plus: Jatos de alta performance mesmo com baixa pressão. Exclusiva resistência Loren Ultra - Longa duração em comparação as resistências comuns. Resistência de troca rápida Loren Ultra: Exclusivo cartucho que garante uma troca rápida e segura. Comando eletrônico: permite a escolha gradual e precisa da temperatura. Haste de controle de temperaturas: controle de temperaturas ao alcance das mãos (uso opcional). Fácil instalação: em poucos passos a ducha é instalada ou removida.',
            imagem2: 'Files/produto3-2.jpg',
            imagem3: 'Files/produto3-3.jpg',
            imagem4: 'Files/produto3-4.jpg'
        },
        {
            nome: 'Torneira Cozinha Gourmet Flexível Luxo Parede 1/4 De Volta Metal',
            preco: 38.69,
            imagem: 'Files/produto4-1.jpg',
            nota: '4',
            marca: 'Olimar',
            tamanho: 'Presente na imagem',
            material: 'Latão, Metal, Cobre',
            sobre: 'Acabamento/acionamento do tipo alavanca em metal cromado. Duas opções de jato: contínuo e chuveirinho. Acionamento 1/4 de volta: maior praticidade e economia. Tubo flexível gourmet também em metal.',
            imagem2: 'Files/produto4-2.jpg',
            imagem3: 'Files/produto4-3.jpg',
            imagem4: 'Files/produto4-4.jpg',
        },
        {
            nome: 'Torneira Banheiro Luxo Quadrada 1/4 Volta Inox Aço Preta Bancada Pia Banheiro Alto Padrão',
            preco: 53.69,
            imagem: 'Files/produto5-1.jpg',
            nota: '4',
            marca: 'Generic',
            tamanho: 'Presente na imagem',
            material: 'Aço inoxidável',
            sobre: 'Acabamento/acionamento do tipo alavanca em metal cromado. Duas opções de jato: contínuo e chuveirinho. Acionamento 1/4 de volta: maior praticidade e economia. Tubo flexível gourmet também em metal.',
            imagem2: 'Files/produto5-2.jpg',
            imagem3: 'Files/produto5-3.jpg',
            imagem4: 'Files/produto5-4.jpg',
        },
        {
            nome: 'Torneira Com Filtro Cozinha Parede Flexível Gourmet Abs',
            preco: 97.99,
            imagem: 'Files/produto6-1.jpg',
            nota: '4',
            marca: 'Dazie Metais',
            tamanho: '',
            material: 'ABS',
            sobre: 'Torneira Com Filtro Gourmet Modelo em ABS - Refil Blindado Pro Saúde - NÃO ENFERRUJA. O ABS detém propriedades específicas como boa resistência a impacto, à tração e à abrasão (desgaste por fricção; raspagem). Quando comparado a outros materiais o plástico ABS apresenta certa resistência ao calor e às baixas temperaturas, podendo ser utilizado normalmente em temperaturas que variam de -20°C a 80°C. Torneira Gourmet da Dazie Metais montada no Brasil com CERTIFICAÇÃO autorizada pelo INMETRO em seu refil de filtragem. Seu design é inspirado para praticidade ao lavar louças. Trabalha junto à sustentabilidade com redução no fluxo contínuo de água. Seu modo de filtragem é processado por refil blindado. Sistema de filtragem com carvão ativado. Possuí retenção de partículas. Torneira Gourmet a mais procurada pelas famílias.',
            imagem2: 'Files/produto6-2.jpg',
            imagem3: 'Files/produto6-3.jpg',
            imagem4: 'Files/produto6-4.jpg',
        },

        {
            nome: 'Suporte de chuveiro a vácuo com ventosa sem perfuração removível à prova d\'água',
            preco: 58.90,
            imagem: 'Files/produto7-1.jpg',
            nota: '5',
            marca: 'ilikable',
            tamanho: '12P x 30,5L x 20,9A cm',
            material: 'Acrilonitrila butadieno estireno',
            sobre: 'Ventosa potente e resistente – Capacidade máxima de 10 kg. Não precisa de ferramentas e antidanos – o organizador de banheiro com ventosa pode concluir a instalação em um segundo. Design exclusivo de ventilação e drenagem – Este fundo de prateleira de sucção de chuveiro é inclinado (inclinação de -6°). Gancho de borda – economizando mais espaço. ilikable O organizador de chuveiro de banheiro inclui duas ventosas a vácuo, um rack de chuveiro, um cartão de remoção, um manual de instruções.',
            imagem2: 'Files/produto7-2.jpg',
            imagem3: 'Files/produto7-3.jpg',
            imagem4: 'Files/produto7-4.jpg',
        },
        {
            nome: 'Kit 2 Prateleira Para Banheiro de Canto Porta Shampoo Sabonete Nicho Organizador',
            preco: 95.80,
            imagem: 'Files/produto8-1.jpg',
            nota: '3',
            marca: 'BRIWAX',
            tamanho: '31P x 13,4L x 5A cm',
            material: 'Alumínio',
            sobre: 'Prateleira suporte Organizador para Shampoo, Sabonete, Condicionador, Creme, Esponja, Perfume, Frascos, itens de higiene e beleza. Diga adeus aos furos nas paredes! As prateleiras autoadesivas proporcionam uma instalação fácil e sem danos. Material reforçado de Alumínio e Pintura resistente a umidade evitando a ferrugem.',
            imagem2: 'Files/produto8-2.jpg',
            imagem3: 'Files/produto8-3.jpg',
            imagem4: 'Files/produto8-4.jpg',
        },
        {
            nome: 'Prateleira Suporte Organizador De Parede Aluminio Adesivo Sem Fura Parede Moderno',
            preco: 43.60,
            imagem: 'Files/produto9-1.jpg',
            nota: '4',
            marca: 'Nipo',
            tamanho: '13,8P x 31,4L x 10A cm',
            material: 'Alumínio',
            sobre: 'Prateleira flutuante, montagem na parede, ideal para banheiro e cozinha. Material reforçado com pintura resistente à umidade. Facilmente instalada sem necessidade de furos, proporcionando praticidade e durabilidade.',
            imagem2: 'Files/produto9-2.jpg',
            imagem3: 'Files/produto9-3.jpg',
            imagem4: 'Files/produto9-4.jpg',
        },
    ];

    function atualizarProdutosExistentes() {
        const prodItems = document.querySelectorAll('.prod-itens');
    
        prodItems.forEach((item, index) => {
            if (produtos[index]) {
                const produto = produtos[index];
    
                const imgElement = item.querySelector('.prod-img img');
                const txtElement = item.querySelector('.prod-txt');
                const precoElement = item.querySelector('.prod-preco');
                const buttonElement = item.querySelector('.prod-carrinho');
    
                if (imgElement) imgElement.src = produto.imagem;
                if (imgElement) imgElement.alt = produto.nome;
                if (txtElement) txtElement.textContent = produto.nome;
                if (precoElement) precoElement.textContent = `R$ ${produto.preco.toFixed(2)}`;
                if (buttonElement) buttonElement.dataset.index = index;
            }
        });
    }
    
    document.addEventListener('DOMContentLoaded', atualizarProdutosExistentes);

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
          esvaziarCarrinho();
      }, 1000); // Simulando um tempo de 5 segundos antes de enviar a mensagem


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
  
  
  

  

