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


document.addEventListener('DOMContentLoaded', function() {
  // Obtém todos os elementos com a classe "controleDaImg"
  var produtos = document.querySelectorAll('.controleDaImg');

  // Adiciona um evento de clique a cada produto e botão de adicionar ao carrinho
  produtos.forEach(function(produto, index) {
      produto.addEventListener('click', function() {
          abrirModal(index);
      });

      var botaoAdicionar = produto.querySelector('.adicionar-carrinho');
      if (botaoAdicionar) {
          botaoAdicionar.addEventListener('click', function(event) {
              event.stopPropagation(); // Impede a propagação do evento de clique para o elemento pai (.controleDaImg)
              adicionarAoCarrinho(index);
          });
      }

      var botaoProdCarrinho = produto.querySelector('.prod-carrinho');
      if (botaoProdCarrinho) {
          botaoProdCarrinho.addEventListener('click', function(event) {
              event.stopPropagation(); // Impede a propagação do evento de clique para o elemento pai (.controleDaImg)
              adicionarAoCarrinho(index);
          });
      }
  });
});

// Função para abrir o modal com os detalhes do produto
function abrirModal(index) {
  var produto = produtos[index];
  var imgSrc = produto.imagem;
  var nomeProduto = produto.nome;
  var precoProduto = produto.preco.toFixed(2);

  // Preenche o modal com os detalhes do produto
  var modalContent = document.getElementById('modal-contentInfo');
  modalContent.innerHTML = `
      <div class="conatineModal">
          <img src="${imgSrc}" alt="principal">
          <div class="nota-produto" id="nota">
              <!-- Estrelas representando a nota do produto -->
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
          </div>
          <p class="produtoNames">${nomeProduto}</p>
          <p class="produtoNames">R$ ${precoProduto}</p>
          <div class="product-images">
              <img src="Files/Torneira.png" alt="Product 1 Image 1" onclick="trocarImagem(this)">
              <img src="${imgSrc}" alt="Product 1 Image 2" onclick="trocarImagem(this)">
          </div>
          <button class="adicionar-carrinho" class="prod-carrinho" data-index="${index}">Adicionar ao Carrinho</button>
      </div>
  `;

  // Exibe o modal
  var modal = document.getElementById('myModal');
  modal.style.display = 'block';

  // Fecha o modal quando o usuário clica no botão "Fechar" (X)
  var closeModal = document.querySelector('.close-button');
  closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
  });

  // Fecha o modal quando o usuário clica fora da área do modal
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  };
}

// Função para adicionar o produto ao carrinho
function adicionarAoCarrinho(index) {
  adicionarItemCarrinho(produtos[index]);
  document.getElementById("carrinho").style.visibility = "visible";
  document.querySelector('.carrinho-tooltip').style.display = "block";
}
