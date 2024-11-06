// Obtém o carrinho de compras salvo no localStorage ou cria um novo carrinho vazio
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Atualiza a contagem de itens no carrinho
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

// Adiciona um produto ao carrinho
function addToCart(productName, productPrice) {
    const product = {
        name: productName,
        price: parseFloat(productPrice)
    };
    
    // Adiciona o produto ao carrinho
    cart.push(product);

    // Salva o carrinho atualizado no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualiza a contagem de itens no carrinho
    updateCartCount();
}

// Função para remover um item do carrinho
function removeFromCart(index) {
    // Remove o produto do carrinho usando o índice
    cart.splice(index, 1);

    // Salva o carrinho atualizado no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualiza a contagem de itens no carrinho
    updateCartCount();

    // Atualiza a exibição do carrinho
    displayCart();
}

// Exibe os itens do carrinho na página
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Limpa o conteúdo atual

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        return;
    }

    // Exibe os itens do carrinho
    cart.forEach((item, index) => {
        const itemElement = document.createElement('li');
        itemElement.classList.add('cart-item');

        itemElement.innerHTML = `
            <p>${item.name} - R$ ${item.price.toFixed(2)}</p>
            <button class="remove-item" onclick="removeFromCart(${index})">
                <i class="fas fa-trash-alt"></i> Remover
            </button>
        `;
        
        cartContainer.appendChild(itemElement);
    });

    // Exibe o resumo do carrinho
    const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    const summaryElement = document.getElementById('cart-summary');
    summaryElement.innerHTML = `
        <p><strong>Total: R$ ${total}</strong></p>
        <button class="checkout-button">Finalizar Compra</button>
    `;
}

// Chama a função de adicionar produto ao carrinho quando um botão é clicado
document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        const productName = product.getAttribute('data-name');
        const productPrice = product.getAttribute('data-price');
        addToCart(productName, productPrice);
    });
});

// Exibe a contagem de itens no carrinho quando a página é carregada
updateCartCount();

// Exibe o carrinho na página de carrinho
if (document.getElementById('cart-items')) {
    displayCart();
}

// Função para finalizar a compra
function finalizePurchase() {
    // Aqui você pode adicionar outras verificações ou lógica de pagamento se necessário
    // Agora redireciona para o Instagram
    window.location.href = 'https://www.instagram.com/1donjuannn/';
}

// Carrega os itens do carrinho ao abrir a página
loadCartItems();

// Adiciona o evento de clique ao botão de Finalizar Compra
document.getElementById('finalize-purchase').addEventListener('click', finalizePurchase);