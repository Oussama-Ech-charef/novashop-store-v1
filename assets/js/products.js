
const productsGrid = document.getElementById("products-grid");
const filterButtons = document.querySelectorAll(".category-filters button");

let allProducts = [];

async function loadProducts() {

    try {

        const response = await fetch("assets/data/products.json");

        const products = await response.json();

        allProducts = products;

        displayProducts(allProducts);

    } catch (error) {

        console.error("Error loading products:", error);

    }

}

function displayProducts(products) {

    productsGrid.innerHTML = "";

    products.forEach(product => {

        productsGrid.innerHTML += `

            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

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

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const category = button.dataset.category;

        if (category === "All") {

            displayProducts(allProducts);

        } else {

            const filteredProducts = allProducts.filter(product =>
                product.category === category
            );

            displayProducts(filteredProducts);

        }

    });

});

loadProducts();
