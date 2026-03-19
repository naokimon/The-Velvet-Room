function renderPersonas(query = "") {
    const container = document.getElementById("persona-page");
    const sortValue = document.getElementById("sort-select")?.value || "default";

    let sorted = [...personas];

    if (query) {
        sorted = sorted.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.arcana.toLowerCase().includes(query)
        );
    }

    switch (sortValue) {
        case "name-asc":
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "name-desc":
            sorted.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case "price-asc":
            sorted.sort((a, b) => parseInt(a.price.replace(/[¥,]/g, "")) - parseInt(b.price.replace(/[¥,]/g, "")));
            break;
        case "price-desc":
            sorted.sort((a, b) => parseInt(b.price.replace(/[¥,]/g, "")) - parseInt(a.price.replace(/[¥,]/g, "")));
            break;
        case "arcana":
            sorted.sort((a, b) => a.arcana.localeCompare(b.arcana));
            break;
        default:
            break;
    }

    container.innerHTML = "";

    if (sorted.length === 0) {
        container.innerHTML = `<p style="text-align:center; font-size: 1.6rem; padding: 2rem;">No personas found...</p>`;
        return;
    }

    sorted.forEach(persona => {
        const div = document.createElement("div");
        div.classList.add("persona");
        div.innerHTML = `
            <img src="${persona.indexImage}" alt="${persona.name}">
            <article class="persona-info">
                <h2><a href="pages/product.html?id=${persona.id}">${persona.name}</a></h2>
                <p>Arcana: ${persona.arcana}</p>
                <span>${persona.price}</span>
            </article>
            <article class="persona-options">
                <button class="add-to-cart-btn" data-id="${persona.id}">
                    Buy now..?
                </button>
            </article>
        `;

        div.querySelector(".add-to-cart-btn").addEventListener("click", (e) => {
            addToCart(persona.id, e.currentTarget);
        });

        container.appendChild(div);
    });
}

function renderWeapons(query = "") {
    const container = document.getElementById("weapons-page");
    const sortValue = document.getElementById("weapon-sort-select")?.value || "default";

    let sorted = [...weapons].filter(w => w.id);

    if (query) {
        sorted = sorted.filter(w =>
            w.name.toLowerCase().includes(query) ||
            w.equipmentType.toLowerCase().includes(query)
        );
    }

    switch (sortValue) {
        case "name-asc":
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "name-desc":
            sorted.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case "price-asc":
            sorted.sort((a, b) => parseInt(a.price.replace(/[¥,]/g, "")) - parseInt(b.price.replace(/[¥,]/g, "")));
            break;
        case "price-desc":
            sorted.sort((a, b) => parseInt(b.price.replace(/[¥,]/g, "")) - parseInt(a.price.replace(/[¥,]/g, "")));
            break;
        case "type":
            sorted.sort((a, b) => a.equipmentType.localeCompare(b.equipmentType));
            break;
        default:
            break;
    }

    container.innerHTML = "";

    if (sorted.length === 0) {
        container.innerHTML = `<p style="text-align:center; font-size: 1.6rem; padding: 2rem;">No weapons found...</p>`;
        return;
    }

    sorted.forEach(weapon => {
        const div = document.createElement("div");
        div.classList.add("weapon");
        div.innerHTML = `
            <img src="${weapon.indexImage}" alt="${weapon.name}">
            <article class="weapons-info">
                <h2><a href="pages/weapon-product.html?id=${weapon.id}">${weapon.name}</a></h2>
                <p>Type: <a target="_blank" href="https://megatenwiki.com/wiki/${weapon.id}">${weapon.equipmentType}</a></p>
                <span>${weapon.price}</span>
            </article>
            <article class="weapons-options">
                <button class="add-to-cart-btn" data-id="${weapon.id}">
                    Buy now..?
                </button>
            </article>
        `;

        div.querySelector(".add-to-cart-btn").addEventListener("click", (e) => {
            addToCart(weapon.id, e.currentTarget);
        });

        container.appendChild(div);
    });
}

function handleSearch() {
    const query = document.getElementById("search-input").value.toLowerCase().trim();
    renderPersonas(query);
    renderWeapons(query);
}

renderPersonas();
renderWeapons();

// soms doet de browser raar en autoplayed hij niet, als iemand nu ergens klikt op het scherm speelt ie automatisch ez fix
const video = document.querySelector(".cutscene-background");

if (video) {
    video.play().catch(() => {
        document.addEventListener("touchstart", () => {
            video.play();
        }, { once: true });
    });
}   