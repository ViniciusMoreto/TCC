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


// Função auxiliar para salvar/atualizar lista no localStorage
function salvarLista(chave, produto) {
  let lista = JSON.parse(localStorage.getItem(chave)) || [];
  // Se for favoritos, verifica se já existe
  if (chave === "favoritos") {
    const index = lista.findIndex(p => p.nome === produto.nome);
    if (index > -1) {
      lista.splice(index, 1); // remove produto se já estiver favoritado
      localStorage.setItem(chave, JSON.stringify(lista));
      return false; // indica que foi removido
    }
  }
  lista.push(produto);
  localStorage.setItem(chave, JSON.stringify(lista));
  return true; // indica que foi adicionado
}

// ---- ADICIONAR AO CARRINHO ----
const botoesCarrinho = document.querySelectorAll(".card button");
botoesCarrinho.forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card");
    const produto = {
      nome: card.querySelector("h1").innerText,
      preco: card.querySelector("span").innerText,
      imagem: card.querySelector("img").src
    };
    let listaCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    listaCarrinho.push(produto); // não bloqueia repetições
    localStorage.setItem("carrinho", JSON.stringify(listaCarrinho));
    alert("✅ Produto adicionado ao carrinho!");
  });
});

// ---- FAVORITOS ----
const coracoes = document.querySelectorAll(".imagem__favorito i");
coracoes.forEach(coracao => {
  const card = coracao.closest(".card");
  const nomeProduto = card.querySelector("h1").innerText;
  
  // Verifica se já está nos favoritos para marcar o coração
  const listaFav = JSON.parse(localStorage.getItem("favoritos")) || [];
  if (listaFav.some(p => p.nome === nomeProduto)) {
    coracao.classList.remove("far");
    coracao.classList.add("fa-solid");
  }

  coracao.addEventListener("click", () => {
    const produtoFav = {
      nome: card.querySelector("h1").innerText,
      preco: card.querySelector("span").innerText,
      imagem: card.querySelector("img").src
    };
    const adicionado = salvarLista("favoritos", produtoFav);
    if (adicionado) {
      coracao.classList.remove("far");
      coracao.classList.add("fa-solid");
      alert("Produto adicionado aos favoritos!");
    } else {
      coracao.classList.remove("fa-solid");
      coracao.classList.add("far");
      alert("Produto removido dos favoritos!");
    }
  });
});