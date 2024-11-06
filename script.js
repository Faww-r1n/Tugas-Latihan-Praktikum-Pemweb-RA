let cart = [];

function addToCart(name, price, qtyId) {
    const qty = parseInt(document.getElementById(qtyId).value);
    if (qty > 0) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.qty += qty;
        } else {
            cart.push({ name, price, qty });
        }
        document.getElementById(qtyId).value = 0;
        renderCart();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceContainer = document.getElementById("total-price");
    const discountMessageContainer = document.getElementById("discount-message");
    cartItemsContainer.innerHTML = "";
    
    let totalPrice = 0;
    let totalItems = 0;
    
    cart.forEach((item, index) => {
        const row = document.createElement("tr");
        
        const productName = document.createElement("td");
        productName.textContent = item.name;
        
        const productPrice = document.createElement("td");
        productPrice.textContent = `Rp. ${item.price.toLocaleString()}`;
        
        const productQty = document.createElement("td");
        productQty.textContent = item.qty;
        
        const productSubtotal = document.createElement("td");
        const subtotal = item.price * item.qty;
        totalPrice += subtotal;
        totalItems += item.qty;
        productSubtotal.textContent = `Rp. ${subtotal.toLocaleString()}`;
        
        const removeButton = document.createElement("td");
        const button = document.createElement("button");
        button.textContent = "Batal";
        button.onclick = () => removeFromCart(index);
        removeButton.appendChild(button);
        
        row.appendChild(productName);
        row.appendChild(productPrice);
        row.appendChild(productQty);
        row.appendChild(productSubtotal);
        row.appendChild(removeButton);
        
        cartItemsContainer.appendChild(row);
    });
    
    let discount = 0;
    let discountMessage = "Tidak ada diskon yang berlaku.";
    if (totalPrice > 2000000) {
        discount = 0.15;
        discountMessage = "Diskon 15%";

    } else if (totalPrice > 1000000) {
        discount = 0.10;
        discountMessage = "Diskon 10%";
    }
    
    if (totalItems > 5) {
        discount += 0.05;
        discountMessage += " Tambahan diskon 5% untuk lebih dari 5 barang.";
    }
    
    const discountAmount = totalPrice * discount;
    const finalPrice = totalPrice - discountAmount;

    discountMessageContainer.textContent = discountMessage;
    totalPriceContainer.textContent = `Rp. ${finalPrice.toLocaleString()} (Diskon Rp. ${discountAmount.toLocaleString()})`;
}

renderCart();
