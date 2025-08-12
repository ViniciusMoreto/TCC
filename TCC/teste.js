
// Dados dos produtos
const products = [
    {
        id: 1,
        name: "Tênis de Corrida Deviate NITRO™ 3 Masculino",
        price: 1199.99,
        category: "Calçados",
        gender: "male",
        image: "imagem/puma/deviate_nitro_branco/imagem1.png",
        alt: "Tênis de Corrida Deviate NITRO™ 3 Masculino"
    },
    {
        id: 2,
        name: "Tênis Mizuno Virtue Feminino",
        price: 229.99,
        category: "calçados",
        gender: "female",
        image: "imagem/mizuno/tenis rosa prime.png",
        alt: "Tênis Mizuno Virtue Feminino"
    },
    {
        id: 3,
        name: "Tênis Air Jordan 1 Low Masculino",
        price: 159.90,
        category: "Calças",
        gender: "male",
        image: "imagem/jordan/tenis air jordan low masculino.png",
        alt: "Tênis Air Jordan 1 Low Masculino"
    },
    {
        id: 4,
        name: "Blusa Feminina Tricot",
        price: 89.90,
        category: "Blusas",
        gender: "female",
        image: "",
        alt: "Blusa feminina tricot em cor creme, gola redonda e mangas compridas, ideal para inverno"
    },
    {
        id: 5,
        name: "Tênis Masculino Esportivo",
        price: 229.90,
        category: "Sapatos",
        gender: "male",
        image: "",
        alt: "Tênis esportivo masculino em preto e branco, solado emborrachado e cabedal em mesh respirador"
    },
    {
        id: 6,
        name: "Sandália Feminina Salto",
        price: 179.90,
        category: "Sapatos",
        gender: "female",
        image: "",
        alt: "Sandália feminina com salto fino em couro bege, tiras finas e acabamento metalizado"
    }
];

// Exibir produtos
function displayProducts(filter = 'all') {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    
    let filteredProducts = products;
    if (filter !== 'all') {
        filteredProducts = products.filter(product => product.gender === filter);
    }
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md';
        productCard.innerHTML = `
            <div class="relative">
                <img src="${product.image}" alt="${product.alt}" class="w-full h-64 object-cover">
                <button class="absolute top-2 right-2 bg-white p-2 rounded-full hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-1">${product.name}</h3>
                <p class="text-gray-600 text-sm capitalize mb-3">${product.gender === 'male' ? 'Masculino' : 'Feminino'}</p>
                <div class="flex justify-between items-center">
                    <span class="font-bold text-lg">R$ ${product.price.toFixed(2)}</span>
                    <button class="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700" onclick="addToCart(${product.id})">Comprar</button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Filtro por gênero
function filterProducts(gender) {
    // Atualizar botões ativos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    displayProducts(gender);
}

// Adicionar ao carrinho
function addToCart(productId) {
    // Lógica para adicionar ao carrinho
    console.log(`Produto ${productId} adicionado ao carrinho`);
    alert('Produto adicionado ao carrinho!');
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});