let currentCategory = 'All';
let cartTotal = 0;

// Fetch Menu Data from Backend
async function fetchMenu() {
    const search = document.getElementById('search-bar').value;
    const container = document.getElementById('menu-container');
    const msgContainer = document.getElementById('message-container');
    
    container.innerHTML = '<p class="loading">Loading menu...</p>';
    msgContainer.innerHTML = '';

    try {
        const response = await fetch(`/api/menu?search=${search}&category=${currentCategory}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const items = await response.json();
        
        if (items.length === 0) {
            container.innerHTML = '<p>No items found.</p>';
            return;
        }

        container.innerHTML = items.map(item => `
            <div class="card">
                <h2>${item.image_url}</h2>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <strong>$${item.price}</strong>
                <br><br>
                <button onclick="addToCart(${item.price})">Add to Cart</button>
            </div>
        `).join('');
    } catch (error) {
        container.innerHTML = '';
        msgContainer.innerHTML = `<p class="error">Error: Could not connect to the server.</p>`;
    }
}

// Handle Category Filtering
function setCategory(category) {
    currentCategory = category;
    fetchMenu();
}

// Handle Cart Updates
function addToCart(price) {
    cartTotal += parseFloat(price);
    document.getElementById('cart-total').innerText = `Total: $${cartTotal.toFixed(2)}`;
}

// Handle Order Submission
async function submitOrder() {
    const name = document.getElementById('customer-name').value;
    const btn = document.getElementById('checkout-btn');
    const msgContainer = document.getElementById('message-container');

    if (!name || cartTotal === 0) {
        alert("Please enter your name and add items to your cart.");
        return;
    }

    // Loading State
    btn.innerText = "Processing...";
    btn.disabled = true;

    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customer_name: name, total_price: cartTotal })
        });

        if (!response.ok) throw new Error('Order failed');

        msgContainer.innerHTML = `<p style="color: green;">Success! Order placed for ${name}.</p>`;
        
        // Reset Cart
        cartTotal = 0;
        document.getElementById('cart-total').innerText = `Total: $0.00`;
        document.getElementById('customer-name').value = '';
    } catch (error) {
        msgContainer.innerHTML = `<p class="error">Error placing order. Try again.</p>`;
    } finally {
        // Reset Button State
        btn.innerText = "Place Order";
        btn.disabled = false;
    }
}

// Load menu on page start
fetchMenu();