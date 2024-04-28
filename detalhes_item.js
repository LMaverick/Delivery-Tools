
document.addEventListener('DOMContentLoaded', function() {
    const miniaturas = document.querySelectorAll('.miniatura');
    const imagemPrincipal = document.getElementById('imagemPrincipal');

    miniaturas.forEach(miniatura => {
        miniatura.addEventListener('click', function() {
            const novaImagem = this.dataset.imagem;
            imagemPrincipal.src = novaImagem;
        });
    });
});

// Função para atualizar os elementos HTML com os dados do produto
function atualizarDetalhesProduto(produto) {
    // Atualiza o nome do produto
    document.getElementById('nome').innerText = produto.nome;
    
    // Atualiza a nota do produto (se existir)
    const notaProduto = document.getElementById('nota');
    if (produto.nota) {
        const estrelas = notaProduto.querySelectorAll('.fa-star');
        for (let i = 0; i < produto.nota; i++) {
            estrelas[i].classList.add('checked');
        }
    } else {
        notaProduto.innerHTML = ''; // Remove o elemento se a nota não estiver disponível
    }
    
    // Atualiza a marca do produto
    document.getElementById('marca').innerText = `Marca: ${produto.marca}`;
    
    // Atualiza o tamanho do produto
    document.getElementById('tamanho').innerText = `Tamanho: ${produto.tamanho}`;
    
    // Atualiza o material do produto
    document.getElementById('material').innerText = `Material: ${produto.material}`;
    
    // Atualiza a descrição do produto
    document.getElementById('sobre').innerText = `Sobre: ${produto.sobre}`;
    
    // Atualiza a imagem principal do produto
    document.getElementById('imagemPrincipal').src = produto.imagem;
    
    // Atualiza as miniaturas do produto (se existirem)
    const miniaturas = document.querySelectorAll('.miniatura');
    for (let i = 0; i < miniaturas.length; i++) {
        const dataImagem = miniaturas[i].getAttribute('data-imagem');
        if (produto[`imagem${i + 2}`]) {
            miniaturas[i].src = produto[`imagem${i + 2}`];
            miniaturas[i].setAttribute('data-imagem', produto[`imagem${i + 2}`]);
        }
    }
}

// Função para obter os parâmetros da URL
function getParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        nome: params.get('nome'),
        preco: parseFloat(params.get('preco')),
        imagem: params.get('imagem')
    };
}

// Função para exibir os detalhes do item
function exibirDetalhes() {
    const params = getParams();
    if (params.nome && params.preco && params.imagem) {
        const produto = produtos.find(produto => produto.nome === params.nome);
        if (produto) {
            atualizarDetalhesProduto(produto);
        } else {
            document.getElementById('nome').innerText = 'Item não encontrado';
        }
    } else {
        document.getElementById('nome').innerText = 'Parâmetros inválidos';
    }
}

// Exibir os detalhes do item ao carregar a página
exibirDetalhes();
