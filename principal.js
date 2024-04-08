window.addEventListener('load', function() {
    // Quando a página é totalmente carregada, remove a tela de carregamento e mostra o conteúdo do site
    document.querySelector('.loader').style.display = 'none';
    document.querySelector('.content').style.display = 'block';
});