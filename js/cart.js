let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  const totalContainer = document.getElementById('cart-total');
  if (!cartContainer) return;

  cartContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <h4>${item.name}</h4>
      <p>Qty: ${item.qty}</p>
      <p>R${(item.price * item.qty).toFixed(2)}</p>
    `;
    cartContainer.appendChild(itemDiv);
    total += item.price * item.qty;
  });

  totalContainer.textContent = `Total: R${total.toFixed(2)}`;
}

function clearCart() {
  cart = [];
  localStorage.removeItem('cart');
  alert('Order placed successfully!');
  window.location.href = 'index.html';
}

window.onload = renderCart;

