document.addEventListener("DOMContentLoaded", () => {
    loadFeaturedProducts();
});

async function loadFeaturedProducts() {
    const featuredGrid = document.getElementById("featured-products-grid");
    if (!featuredGrid) return;

    try {
        const response = await fetch("assets/data/products.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        
        // Take the first 4 products as featured products
        const featuredProducts = products.slice(0, 4);
        
        displayFeaturedProducts(featuredProducts, featuredGrid);
    } catch (error) {
        console.error("Error loading featured products:", error);
        featuredGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--gray-color);">Failed to load featured products.</p>`;
    }
}

function displayFeaturedProducts(products, container) {
    container.innerHTML = "";
    
    products.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='https://placehold.co/600x500?text=No+Image';">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <a href="product-details.html?id=${product.id}" class="btn">
                        View Product
                    </a>
                </div>
            </div>
        `;
    });
}
