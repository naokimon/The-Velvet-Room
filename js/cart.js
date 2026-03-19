function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(personaId, clickedButton) {
    const persona = personas.find(p => p.id === personaId);
    if (!persona) return;
    const cart = getCart();
    const existing = cart.find(item => item.id === personaId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id: personaId, quantity: 1 });
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
    clickedButton.style.color = "black";
    setTimeout(() => {
        clickedButton.textContent = original;
        clickedButton.style.color = "";
    }, 2000);
}