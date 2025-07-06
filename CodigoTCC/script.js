let slideIndex = 0;
const slides = document.querySelectorAll('#carrossel > div > img');



function showSlide(index) {
    slides.forEach(slide => slide.style.display = 'none');
    slideIndex = (index + slides.length) % slides.length;
    slides[slideIndex].style.display = 'block';
}

function moveSlide(n) {
    showSlide(slideIndex + n);
}

// Inicia mostrando o primeiro slide
showSlide(slideIndex);

// Adiciona rotação automática a cada 2 segundos
setInterval(() => {
    moveSlide(1);
}, 2000);