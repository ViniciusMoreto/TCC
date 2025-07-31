// Índice atual do slide que está sendo exibido
let slideIndex = 0;

// Seleciona todas as imagens dentro do carrossel (dentro da div com id "carrossel")
const slides = document.querySelectorAll('#carrossel > div > img');

// Função que exibe o slide correspondente ao índice fornecido
function showSlide(index) {
    // Oculta todos os slides primeiro
    slides.forEach(slide => slide.style.display = 'none');

    // Garante que o índice fique dentro do intervalo (volta ao início ou ao fim se passar dos limites)
    slideIndex = (index + slides.length) % slides.length;

    // Exibe o slide correspondente ao índice calculado
    slides[slideIndex].style.display = 'block';
}

// Função para avançar ou retroceder os slides
function moveSlide(n) {
    // Chama a função showSlide com o novo índice
    showSlide(slideIndex + n);
}

// Exibe o primeiro slide ao carregar a página
showSlide(slideIndex);

// Define uma rotação automática: a cada 2 segundos avança um slide
setInterval(() => {
    moveSlide(1); // Avança 1 slide
}, 2000);
