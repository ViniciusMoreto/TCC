// Função para converter um preço no formato string (ex: 'R$20,00') para número (ex: 20.00)
function precoToFloat(precoStr) {
  return parseFloat(precoStr.replace('R$', '').replace(',', '.'));
}

// Função para formatar um número (ex: 20.00) no formato de preço em real (ex: 'R$20,00')
function formatarPreco(valor) {
  return 'R$' + valor.toFixed(2).replace('.', ',');
}

// Atualiza o valor total mostrado na barra inferior com base apenas nos produtos selecionados
function atualizarTotal() {
  const produtos = document.querySelectorAll('.produto__carrinho');
  let total = 0;

  // Soma o preço total apenas dos produtos que estão com o checkbox marcado
  produtos.forEach(produto => {
    const checkbox = produto.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      const precoTotalElemento = produto.querySelector('.categoria h3:nth-child(3)');
      const precoTotal = precoToFloat(precoTotalElemento.textContent);
      total += precoTotal;
    }
  });

  // Atualiza o elemento visual com o valor formatado
  const totalElemento = document.querySelector('.container__secundario h3');
  totalElemento.textContent = formatarPreco(total);
}

// Mantém o estado do checkbox "Selecionar tudo" sincronizado com os checkboxes individuais
function sincronizarSelecionarTudo() {
  const produtos = document.querySelectorAll('.produto__carrinho');
  const selecionarTudoCheckbox = document.querySelector('.container__secundario input[type="checkbox"]');

  // Verifica se todos os produtos estão selecionados individualmente
  const todosSelecionados = Array.from(produtos).every(produto => 
    produto.querySelector('input[type="checkbox"]').checked
  );

  // Marca ou desmarca o "Selecionar tudo" com base nisso
  selecionarTudoCheckbox.checked = todosSelecionados;
}

// Adiciona todos os eventos (quantidade, checkbox, exclusão) para um produto do carrinho
function adicionarEventosProduto(produto) {
  const checkbox = produto.querySelector('input[type="checkbox"]');
  const btnAumentar = produto.querySelector('.quantidade button:last-child');
  const btnDiminuir = produto.querySelector('.quantidade button:first-child');
  const contadorSpan = produto.querySelector('.quantidade span');
  const precoUnitarioElemento = produto.querySelector('.categoria h3:first-child');
  const precoTotalElemento = produto.querySelector('.categoria h3:nth-child(3)');
  const iconeExcluir = produto.querySelector('.icone i');

  // Atualiza o campo "preço total" de acordo com a quantidade e o preço unitário
  function atualizarPrecoTotal(qtd) {
    const precoUnitario = precoToFloat(precoUnitarioElemento.textContent);
    const precoTotal = precoUnitario * qtd;
    precoTotalElemento.textContent = formatarPreco(precoTotal);
  }

  // Atualiza o preço total inicialmente com base na quantidade atual
  atualizarPrecoTotal(parseInt(contadorSpan.textContent));

  // Evento ao clicar no botão "+" para aumentar a quantidade
  btnAumentar.addEventListener('click', () => {
    let qtd = parseInt(contadorSpan.textContent);
    qtd++;
    contadorSpan.textContent = qtd;
    atualizarPrecoTotal(qtd);
    atualizarTotal();
  });

  // Evento ao clicar no botão "−" para diminuir a quantidade (mínimo de 1)
  btnDiminuir.addEventListener('click', () => {
    let qtd = parseInt(contadorSpan.textContent);
    if (qtd > 1) {
      qtd--;
      contadorSpan.textContent = qtd;
      atualizarPrecoTotal(qtd);
      atualizarTotal();
    }
  });

  // Evento ao marcar ou desmarcar o checkbox do produto
  checkbox.addEventListener('change', () => {
    sincronizarSelecionarTudo();
    atualizarTotal();
  });

  // Evento ao clicar no ícone de lixeira (excluir o produto do carrinho)
  iconeExcluir.addEventListener('click', () => {
    produto.remove();
    atualizarTotal();
    sincronizarSelecionarTudo();
  });
}

// Configura o comportamento do checkbox "Selecionar tudo" na barra inferior
function configurarSelecionarTudo() {
  const selecionarTudoCheckbox = document.querySelector('.container__secundario input[type="checkbox"]');
  selecionarTudoCheckbox.addEventListener('change', () => {
    const produtos = document.querySelectorAll('.produto__carrinho');

    // Marca ou desmarca todos os checkboxes dos produtos com base no estado do "Selecionar tudo"
    produtos.forEach(produto => {
      const checkbox = produto.querySelector('input[type="checkbox"]');
      checkbox.checked = selecionarTudoCheckbox.checked;
    });

    atualizarTotal();
  });
}

// Configura o botão "Excluir" da barra inferior para remover todos os produtos selecionados
function configurarExcluirSelecionados() {
  const excluirSpan = document.querySelector('.barra__esquerda .texto__barra');
  excluirSpan.addEventListener('click', () => {
    const produtos = document.querySelectorAll('.produto__carrinho');
    
    // Remove todos os produtos que estão com o checkbox marcado
    produtos.forEach(produto => {
      const checkbox = produto.querySelector('input[type="checkbox"]');
      if (checkbox.checked) {
        produto.remove();
      }
    });

    atualizarTotal();
    sincronizarSelecionarTudo();
  });
}

// Inicializa todas as configurações e eventos do carrinho assim que a página carrega
function inicializarCarrinho() {
  const produtos = document.querySelectorAll('.produto__carrinho');

  // Para cada produto, adiciona os eventos de quantidade, exclusão e checkbox
  produtos.forEach(produto => adicionarEventosProduto(produto));

  configurarSelecionarTudo();        // Ativa o comportamento do "Selecionar tudo"
  configurarExcluirSelecionados();  // Ativa o comportamento do botão "Excluir"
  atualizarTotal();                 // Calcula o valor total inicial
  sincronizarSelecionarTudo();      // Verifica se "Selecionar tudo" deve ser marcado no início
}

// Aguarda a página carregar completamente para iniciar o carrinho
window.addEventListener('DOMContentLoaded', inicializarCarrinho);
