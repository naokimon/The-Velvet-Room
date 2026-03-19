function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(itemId, clickedButton) {
    const item = personas.find(p => p.id === itemId) || weapons.find(w => w.id === itemId);
    if (!item) return;

    const cart = getCart();
    const existing = cart.find(i => i.id === itemId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id: itemId, quantity: 1 });
    }

    saveCart(cart);
    if (clickedButton) showCartFeedback(clickedButton);
}

function removeFromCart(personaId) {
    const cart = getCart().filter(item => item.id !== personaId);
    saveCart(cart);
}

function showCartFeedback(clickedButton) {
    const original = clickedButton.textContent;
    clickedButton.textContent = "Added to cart!";
    clickedButton.style.color = "var(--text-color)";
    setTimeout(() => {
        clickedButton.textContent = original;
        clickedButton.style.color = "";
    }, 2000);
}