let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Função para carregar os itens do carrinho
function loadCartItems() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)} 
                        <button class="remove-item" onclick="removeFromCart(${index})">
                            <i class="fas fa-trash"></i>
                        </button>`;
        cartItemsList.appendChild(li);
        total += item.price;
    });

    document.getElementById('total-price').textContent = total.toFixed(2);
}

// Função para remover item do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

// Carrega os itens do carrinho ao abrir a página
loadCartItems();
