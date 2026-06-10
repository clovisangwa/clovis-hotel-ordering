// Load data from localStorage
let menu = JSON.parse(localStorage.getItem('menu')) || getDefaultMenu();
let order = JSON.parse(localStorage.getItem('order')) || {};
let phoneNumber = localStorage.getItem('phoneNumber') || '0785277428';
let advertisement = localStorage.getItem('advertisement') || 'Welcome to Clovis Hotel! Enjoy our delicious food.';
let currentQuantity = 1;
let selectedItemId = null;

// Default menu items
function getDefaultMenu() {
    return [
        {
            id: 1,
            name: 'Ugali with Beans',
            price: 3000,
            category: 'Main Course',
            description: 'Delicious maize meal with beans',
            icon: '🍝'
        },
        {
            id: 2,
            name: 'Rice and Chicken',
            price: 5000,
            category: 'Main Course',
            description: 'Fluffy rice with grilled chicken',
            icon: '🍗'
        },
        {
            id: 3,
            name: 'Fish and Chips',
            price: 6000,
            category: 'Main Course',
            description: 'Fresh fried fish with crispy chips',
            icon: '🐟'
        },
        {
            id: 4,
            name: 'Juice',
            price: 1500,
            category: 'Beverages',
            description: 'Fresh fruit juice',
            icon: '🥤'
        },
        {
            id: 5,
            name: 'Soda',
            price: 2000,
            category: 'Beverages',
            description: 'Cold carbonated drink',
            icon: '🥃'
        },
        {
            id: 6,
            name: 'Samosa',
            price: 1000,
            category: 'Appetizers',
            description: 'Crispy triangular pastry',
            icon: '🥟'
        }
    ];
}

// Initialize page
function init() {
    displayMenu();
    displayAdvertisement();
    displayCategoryButtons();
    updateOrderSummary();
    document.getElementById('displayPhoneNumber').textContent = phoneNumber;
    setupModalClose();
}

// Display advertisement
function displayAdvertisement() {
    document.getElementById('advertisementText').textContent = advertisement;
}

// Display category buttons
function displayCategoryButtons() {
    const categories = [...new Set(menu.map(item => item.category))];
    const categoryContainer = document.getElementById('categoryButtons');
    categoryContainer.innerHTML = '';
    
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.textContent = category;
        btn.onclick = () => filterByCategory(category);
        btn.setAttribute('data-category', category);
        categoryContainer.appendChild(btn);
    });
}

// Filter by category
function filterByCategory(category) {
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    const filtered = category === 'all' ? menu : menu.filter(item => item.category === category);
    displayMenuItems(filtered);
}

// Display menu
function displayMenu() {
    displayMenuItems(menu);
}

function displayMenuItems(items) {
    const container = document.getElementById('menuContainer');
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = '<p class="no-items">No items available</p>';
        return;
    }
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = `
            <div class="card-icon">${item.icon}</div>
            <h3>${item.name}</h3>
            <p class="description">${item.description}</p>
            <p class="price">${item.price} FBU</p>
            <button class="btn-add" onclick="openItemModal(${item.id})">🛒 Select</button>
        `;
        container.appendChild(card);
    });
}

// Open item modal
function openItemModal(itemId) {
    const item = menu.find(m => m.id === itemId);
    if (!item) return;
    
    selectedItemId = itemId;
    currentQuantity = 1;
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="modal-item">
            <div class="modal-icon">${item.icon}</div>
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <p class="modal-price">Price: ${item.price} FBU</p>
            <div class="quantity-selector">
                <label for="quantity">Quantity:</label>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="decreaseQuantity()">−</button>
                    <input type="number" id="quantity" value="1" min="1" max="99" onchange="updateQuantity()">
                    <button class="qty-btn" onclick="increaseQuantity()">+</button>
                </div>
            </div>
            <p class="subtotal">Subtotal: <strong>${item.price} FBU</strong></p>
        </div>
    `;
    
    document.getElementById('itemModal').style.display = 'block';
    document.getElementById('addToOrderBtn').onclick = () => addItemToOrder(itemId);
}

function increaseQuantity() {
    currentQuantity++;
    updateQuantityDisplay();
}

function decreaseQuantity() {
    if (currentQuantity > 1) {
        currentQuantity--;
        updateQuantityDisplay();
    }
}

function updateQuantity() {
    const input = document.getElementById('quantity');
    currentQuantity = parseInt(input.value) || 1;
    if (currentQuantity < 1) currentQuantity = 1;
    if (currentQuantity > 99) currentQuantity = 99;
    updateQuantityDisplay();
}

function updateQuantityDisplay() {
    document.getElementById('quantity').value = currentQuantity;
    const item = menu.find(m => m.id === selectedItemId);
    if (item) {
        const subtotal = item.price * currentQuantity;
        document.querySelector('.subtotal').innerHTML = `Subtotal: <strong>${subtotal} FBU</strong>`;
    }
}

function closeModal() {
    document.getElementById('itemModal').style.display = 'none';
}

function setupModalClose() {
    const modal = document.getElementById('itemModal');
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    }
}

// Add item to order
function addItemToOrder(itemId) {
    const item = menu.find(m => m.id === itemId);
    if (!item) return;
    
    if (order[itemId]) {
        order[itemId].quantity += currentQuantity;
    } else {
        order[itemId] = {
            ...item,
            quantity: currentQuantity
        };
    }
    
    localStorage.setItem('order', JSON.stringify(order));
    updateOrderSummary();
    closeModal();
    showNotification(`${item.name} added to order!`);
}

// Update order summary
function updateOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    const orderIds = Object.keys(order);
    
    if (orderIds.length === 0) {
        orderItems.innerHTML = '<p class="empty-order">No items selected</p>';
        document.getElementById('totalPrice').textContent = '0';
        return;
    }
    
    let html = '<ul class="order-list">';
    let total = 0;
    
    orderIds.forEach(id => {
        const item = order[id];
        const subtotal = item.price * item.quantity;
        total += subtotal;
        
        html += `
            <li class="order-item">
                <div class="item-info">
                    <span class="item-name">${item.icon} ${item.name}</span>
                    <span class="item-qty">x${item.quantity}</span>
                </div>
                <div class="item-price">${subtotal} FBU</div>
                <div class="item-actions">
                    <button class="qty-adjust" onclick="decreaseOrderQuantity(${id})">−</button>
                    <button class="qty-adjust" onclick="increaseOrderQuantity(${id})">+</button>
                    <button class="remove-btn" onclick="removeFromOrder(${id})">✕</button>
                </div>
            </li>
        `;
    });
    
    html += '</ul>';
    orderItems.innerHTML = html;
    document.getElementById('totalPrice').textContent = total;
}

function increaseOrderQuantity(itemId) {
    if (order[itemId]) {
        order[itemId].quantity++;
        localStorage.setItem('order', JSON.stringify(order));
        updateOrderSummary();
    }
}

function decreaseOrderQuantity(itemId) {
    if (order[itemId] && order[itemId].quantity > 1) {
        order[itemId].quantity--;
        localStorage.setItem('order', JSON.stringify(order));
        updateOrderSummary();
    }
}

function removeFromOrder(itemId) {
    delete order[itemId];
    localStorage.setItem('order', JSON.stringify(order));
    updateOrderSummary();
    showNotification('Item removed from order');
}

function clearOrder() {
    if (Object.keys(order).length === 0) {
        alert('No items to clear');
        return;
    }
    if (confirm('Are you sure you want to clear the entire order?')) {
        order = {};
        localStorage.setItem('order', JSON.stringify(order));
        updateOrderSummary();
        showNotification('Order cleared');
    }
}

// Send order to WhatsApp
function sendOrderToWhatsApp() {
    const orderIds = Object.keys(order);
    
    if (orderIds.length === 0) {
        alert('Please add items to your order first!');
        return;
    }
    
    let message = '🍽️ *NEW ORDER FROM CLOVIS HOTEL* 🍽️\n\n';
    let total = 0;
    
    orderIds.forEach(id => {
        const item = order[id];
        const subtotal = item.price * item.quantity;
        total += subtotal;
        message += `${item.icon} ${item.name} x${item.quantity} = ${subtotal} FBU\n`;
    });
    
    message += `\n*Total: ${total} FBU*\n`;
    message += `\n📞 Customer: [Table/Name]\n`;
    message += `⏰ Time: ${new Date().toLocaleTimeString()}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    showNotification('Opening WhatsApp...');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', init);