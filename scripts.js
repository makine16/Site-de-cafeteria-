// Função para adicionar ao carrinho
function adicionarAoCarrinho(nome, preco, imagemSrc) {
    mostrarNotificacao("Adicionado ao carrinho!");

    // Recupera o carrinho do Local Storage ou cria um novo array
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    // Verifica se o item já está no carrinho
    const index = carrinho.findIndex(item => item.nome === nome);
    if (index !== -1) {
        // Se já estiver, apenas incrementa a quantidade
        carrinho[index].quantidade += 1;
    } else {
        // Se não estiver, adiciona com quantidade 1
        carrinho.push({ nome, preco, imagemSrc, quantidade: 1 });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Função para mostrar a notificação no canto direito
function mostrarNotificacao(mensagem) {
    const notificacao = document.getElementById('notificacao');
    notificacao.textContent = mensagem;
    notificacao.classList.add('mostrar'); 

    setTimeout(() => {
        notificacao.classList.remove('mostrar');
    }, 3000);
}

// Função para exibir o carrinho na página carrinho.html
function mostrarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoContainer = document.getElementById('carrinho-itens');
    const somaTotalElement = document.getElementById('soma-total'); // Elemento para exibir a soma total
    carrinhoContainer.innerHTML = ''; // Limpa o conteúdo atual
    let somaTotal = 0; // Inicializa a soma total

    if (carrinho.length === 0) {
        carrinhoContainer.innerHTML = '<p>O carrinho está vazio.</p>';
        somaTotalElement.innerHTML = ''; // Limpa a soma total se o carrinho estiver vazio
    } else {
        carrinho.forEach((item, index) => {
            // Cria um novo item no carrinho com imagem, nome e preço
            const carrinhoItem = document.createElement('li');
            carrinhoItem.classList.add('carrinho-item');
            carrinhoItem.innerHTML = `
                <div class="imagem">
                    <img src="${item.imagemSrc}" alt="${item.nome}">
                </div>
                <div class="descricao">
                    <h4>${item.nome}</h4>
                    <p>R$${item.preco.toFixed(2)}</p>
                    <div class="quantidade">
                        <button onclick="atualizarQuantidade(${index}, -1)">-</button>
                        <span id="quantidade-${index}">${item.quantidade}</span>
                        <button onclick="atualizarQuantidade(${index}, 1)">+</button>
                    </div>
                </div>
            `;
            carrinhoContainer.appendChild(carrinhoItem); // Adiciona o item à lista

            // Adiciona o preço do item à soma total
            somaTotal += item.preco * item.quantidade; // Multiplica pelo número de unidades
        });
        // Exibe a soma total
        somaTotalElement.innerHTML = `<p>Soma Total: R$${somaTotal.toFixed(2)}</p>`;
    }
}

// Função para atualizar a quantidade de um item
function atualizarQuantidade(index, delta) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    // Atualiza a quantidade do item
    if (carrinho[index].quantidade + delta > 0) {
        carrinho[index].quantidade += delta;
    } else {
        // Se a quantidade for zero, remove o item do carrinho
        carrinho.splice(index, 1);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    mostrarCarrinho(); // Atualiza a exibição do carrinho
}

// Função para finalizar a compra
function finalizarCompra() {
    alert("Compra finalizada!");
    localStorage.removeItem('carrinho');
    mostrarCarrinho(); // Atualiza o carrinho para exibir que está vazio
}

// Função para limpar o carrinho
function limparCarrinho(){
    localStorage.removeItem('carrinho');
    mostrarCarrinho();
    mostrarNotificacao("Carrinho limpo!");
}

// Carrega o carrinho ao abrir a página carrinho.html
document.addEventListener('DOMContentLoaded', mostrarCarrinho);
