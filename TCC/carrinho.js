const container = document.querySelector(".produtos");
        const lista = JSON.parse(localStorage.getItem("carrinho")) || [];

        if (lista.length > 0) {
            container.innerHTML = "";
            lista.forEach(produto => {
            container.innerHTML += `
                <div class="card">
                <img src="${produto.imagem}">
                <h1>${produto.nome}</h1>
                <span>${produto.preco}</span>
                </div>
            `;
            });
        } else {
            container.innerHTML = "<p>Seu carrinho está vazio.</p>";
        }