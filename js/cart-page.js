function loadCartPage() {
    const cart = getCart();
    const container = document.getElementById("cart-items");
    const checkoutBtn = document.getElementById("checkout-btn");
    const totalEl = document.getElementById("cart-total-price");

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 4rem; font-size: 1.6rem;">
                <p>Your cart is empty...</p>
                <a href="../index.html#persona-page">Browse Personas</a>
            </div>
        `;
        if (checkoutBtn) checkoutBtn.style.display = "none";
        if (totalEl) totalEl.parentElement.style.display = "none";
        return;
    }

    if (checkoutBtn) checkoutBtn.style.display = "";
    if (totalEl) totalEl.parentElement.style.display = "";

    let totalYen = 0;
    container.innerHTML = "";

    cart.forEach(item => {
        const persona = personas.find(p => p.id === item.id);
        if (!persona) return;

        const numericPrice = parseInt(persona.price.replace(/[¥,]/g, ""));
        const lineTotal = numericPrice * item.quantity;
        totalYen += lineTotal;

        const div = document.createElement("div");
        div.classList.add("cart-product");
        div.innerHTML = `
            <img src="${persona.image}" alt="${persona.name}">
            <section class="cart-description">
                <span class="cart-producttitle"><a href="product.html?id=${persona.id}">${persona.name}</a></span>
                <span class="cart-productarcana">Arcana: ${persona.arcana}</span>
                <span class="cart-productcost">${persona.price}</span>
            </section>
            <div class="cart-quantity">
                <button class="quantity-btn minus">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn plus">+</button>
            </div>
            <button class="cart-productbutton" data-id="${persona.id}">
                Delete from cart..?
            </button>
        `;

        div.querySelector(".minus").addEventListener("click", () => {
            const cart = getCart();
            const entry = cart.find(i => i.id === persona.id);
            if (entry.quantity > 1) {
                entry.quantity -= 1;
                saveCart(cart);
            } else {
                removeFromCart(persona.id);
            }
            loadCartPage();
        });

        div.querySelector(".plus").addEventListener("click", () => {
            const cart = getCart();
            const entry = cart.find(i => i.id === persona.id);
            entry.quantity += 1;
            saveCart(cart);
            loadCartPage();
        });

        div.querySelector(".cart-productbutton").addEventListener("click", () => {
            removeFromCart(persona.id);
            loadCartPage();
        });

        container.appendChild(div);
    });

    if (totalEl) {
        totalEl.textContent = `¥${totalYen.toLocaleString()}`;
    }
}

function checkout() {
    const cart = getCart();
    if (cart.length === 0) return;

    let totalYen = 0;
    cart.forEach(item => {
        const persona = personas.find(p => p.id === item.id);
        if (!persona) return;
        const numericPrice = parseInt(persona.price.replace(/[¥,]/g, ""));
        totalYen += numericPrice * item.quantity;
    });

    saveCart([]);
    loadCartPage();

    document.getElementById("modal-message").textContent =
        `Thank you for your purchase... I await your destiny.`;
    document.getElementById("checkout-modal").classList.add("show");
}

function closeModal() {
    document.getElementById("checkout-modal").classList.remove("show");
    window.location.href = "../index.html#persona-page"
}

loadCartPage();