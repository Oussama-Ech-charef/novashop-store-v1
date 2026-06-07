

const productContainer = document.getElementById("product-details-container");


const params = new URLSearchParams(window.location.search);

const productId = params.get("id");
async function loadProduct() {
    try {
        const response = await fetch("assets/data/products.json");
        const products = await response.json();
        const product = products.find(item => item.id == productId);
        if (!product) {
            productContainer.innerHTML = `

                <h2>Product Not Found</h2>

            `;
            return;
        }

        displayProduct(product);

    } catch (error) {
        console.error(error);
    }
}

function displayProduct(product) {

    productContainer.innerHTML = `

        <div class="product-details-content">

            <div class="product-details-image">

                <img src="${product.image}" alt="${product.name}">

            </div>

            <div class="product-details-info">

                <h1>${product.name}</h1>

                <p class="product-price">
                    $${product.price}
                </p>

                <p class="product-description">

                    Premium technology product designed
                    for performance, reliability and
                    everyday productivity.

                </p>

                <button class="btn">
                    Add To Cart
                </button>

            </div>

        </div>

    `;
}

loadProduct();
