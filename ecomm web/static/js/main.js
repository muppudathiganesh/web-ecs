// ### JavaScript & Fetch API (`static/js/main.js`):
// ```javascript
// Fetch product list
function loadProducts() {
    fetch('/api/products')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('product-list');
            container.innerHTML = '';
            data.products.forEach(p => {
                const card = `<div class="card">
                    <h3>${p.name}</h3>
                    <p>${p.description}</p>
                    <p>₹${p.price}</p>
                    <button onclick="addToCart(${p.id})">Add to Cart</button>
                    <button onclick="showEditModal(${p.id}, '${p.name}', '${p.description}', ${p.price})">Edit</button>
                    <button onclick="deleteProduct(${p.id})">Delete</button>
                </div>`;
                container.innerHTML += card;
            });
        });
}

function addToCart(productId) {
    fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId })
    })
    .then(res => res.json())
    .then(data => alert(data.message));
}

function showEditModal(id, name, description, price) {
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-name').value = name;
    document.getElementById('edit-description').value = description;
    document.getElementById('edit-price').value = price;
    document.getElementById('editModal').style.display = 'block';
}

function updateProduct() {
    const id = document.getElementById('edit-id').value;
    const name = document.getElementById('edit-name').value;
    const description = document.getElementById('edit-description').value;
    const price = document.getElementById('edit-price').value;

    fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        document.getElementById('editModal').style.display = 'none';
        loadProducts();
    });
}

function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    fetch(`/api/products/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadProducts();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    document.getElementById('edit-form').addEventListener('submit', function(e) {
        e.preventDefault();
        updateProduct();
    });
});