let currentIndex = 0; // Índice da imagem atual  
const slides = document.querySelectorAll('.image-container');  

function showSlide(index) {  
    // Oculta todas as imagens  
    slides.forEach((slide, i) => {  
        slide.classList.remove('active');  
        if (i === index) {  
            slide.classList.add('active');  
            // Acessibilidade: indica que a imagem está visível
            slide.setAttribute('aria-hidden', 'false');
        } else {
            slide.setAttribute('aria-hidden', 'true');
        }
    });  
}  

function moveSlide(step) {  
    currentIndex += step;  
    // Reseta o índice caso exceda os limites  
    if (currentIndex < 0) {  
        currentIndex = slides.length - 1; // Volta para o último slide  
    } else if (currentIndex >= slides.length) {  
        currentIndex = 0; // Retorna ao primeiro slide  
    }  
    showSlide(currentIndex);  
}  

// Exibe a