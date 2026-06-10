// Load data from localStorage
let menu = JSON.parse(localStorage.getItem('menu')) || getDefaultMenu();
let phoneNumber = localStorage.getItem('phoneNumber') || '0785277428';
let advertisement = localStorage.getItem('advertisement') || 'Welcome to Clovis Hotel!';

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

// Initialize admin panel
function initAdmin() {
    loadPhoneNumber();
    loadAdvertisement();
    loadFoodList();
}

// Load and display phone number
function loadPhoneNumber() {
    document.getElementById('phoneNumber').value = phoneNumber;
}

// Save phone number
function savePhoneNumber() {
    const newPhoneNumber = document.getElementById('phoneNumber').value.trim();
    
    if (!newPhoneNumber) {
        alert('Please enter a phone number');
        return;
    }
    
    phoneNumber = newPhoneNumber;
    localStorage.setItem('phoneNumber', phoneNumber);
    showAdminNotification('✅ Phone number saved successfully!');
}

// Load and display advertisement
function loadAdvertisement() {
    document.getElementById('advertisementText').value = advertisement;
}

// Save advertisement
function saveAdvertisement() {
    const newAdvertisement = document.getElementById('advertisementText').value.trim();
    
    if (!newAdvertisement) {
        alert('Please enter advertisement text');
        return;
    }
    
    advertisement = newAdvertisement;
    localStorage.setItem('advertisement', advertisement);
    showAdminNotification('✅ Advertisement saved successfully!');
}

// Add new food item
function addFood() {
    const name = document.getElementById('foodName').value.trim();
    const price = parseInt(document.getElementById('foodPrice').value);
    const category = document.getElementById('foodCategory').value.trim();
    const description = document.getElementById('foodDescription').value.trim();
    const icon = document.getElementById('foodIcon').value.trim();
    
    if (!name || !price || !category || !description || !icon) {
        alert('Please fill in all fields');
        return;
    }
    
    if (price <= 0) {
        alert('Price must be greater than 0');
        return;
    }
    
    const newId = Math.max(...menu.map(m => m.id), 0) + 1;
    
    const newItem = {
        id: newId,
        name,
        price,
        category,
        description,
        icon
    };
    
    menu.push(newItem);
    localStorage.setItem('menu', JSON.stringify(menu));
    
    // Clear form
    document.getElementById('foodName').value = '';
    document.getElementById('foodPrice').value = '';
    document.getElementById('foodCategory').value = '';
    document.getElementById('foodDescription').value = '';
    document.getElementById('foodIcon').value = '';
    
    loadFoodList();
    showAdminNotification(`✅ ${name} added successfully!`);
}

// Load and display food list
function loadFoodList() {
    const foodList = document.getElementById('foodList');
    
    if (menu.length === 0) {
        foodList.innerHTML = '<p class="no-items">No food items added yet</p>';
        return;
    }
    
    let html = '';
    
    menu.forEach(item => {
        html += `
            <div class="food-item-edit">
                <div class="food-item-info">
                    <div class="food-header">
                        <span class="food-icon">${item.icon}</span>
                        <div>
                            <h4>${item.name}</h4>
                            <p class="category-badge">${item.category}</p>
                        </div>
                    </div>
                    <p class="food-description">${item.description}</p>
                    <div class="food-price-display">Price: <strong>${item.price} FBU</strong></div>
                </div>
                <div class="food-actions">
                    <button class="btn-edit" onclick="editFood(${item.id})">✏️ Edit</button>
                    <button class="btn-delete" onclick="deleteFood(${item.id})">🗑️ Delete</button>
                </div>
            </div>
        `;
    });
    
    foodList.innerHTML = html;
}

// Edit food item
function editFood(itemId) {
    const item = menu.find(m => m.id === itemId);
    if (!item) return;
    
    const newName = prompt('Edit food name:', item.name);
    if (newName === null) return;
    
    const newPrice = prompt('Edit price (FBU):', item.price);
    if (newPrice === null) return;
    
    const newDescription = prompt('Edit description:', item.description);
    if (newDescription === null) return;
    
    const newIcon = prompt('Edit icon/emoji:', item.icon);
    if (newIcon === null) return;
    
    const newCategory = prompt('Edit category:', item.category);
    if (newCategory === null) return;
    
    if (!newName || !newPrice || !newDescription || !newIcon || !newCategory) {
        alert('All fields are required');
        return;
    }
    
    if (parseInt(newPrice) <= 0) {
        alert('Price must be greater than 0');
        return;
    }
    
    item.name = newName;
    item.price = parseInt(newPrice);
    item.description = newDescription;
    item.icon = newIcon.substring(0, 2);
    item.category = newCategory;
    
    localStorage.setItem('menu', JSON.stringify(menu));
    loadFoodList();
    showAdminNotification(`✅ ${newName} updated successfully!`);
}

// Delete food item
function deleteFood(itemId) {
    const item = menu.find(m => m.id === itemId);
    if (!item) return;
    
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
        menu = menu.filter(m => m.id !== itemId);
        localStorage.setItem('menu', JSON.stringify(menu));
        loadFoodList();
        showAdminNotification(`✅ ${item.name} deleted successfully!`);
    }
}

// Show notification
function showAdminNotification(message) {
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
window.addEventListener('DOMContentLoaded', initAdmin);