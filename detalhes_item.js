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