// cart.js for Golden Greens Shopping Cart

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
  const item = cart.find(product => product.name === name);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
  updateCartCount();
}

function updateCartCount() {
  const cartIcon = document.getElementById('cart-count');
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  if (cartIcon) {
    cartIcon.textContent = count;
  }
}

function displayCartItems() {
  const cartList = document.getElementById('cart-items');
  const totalAmount = document.getElementById('total-amount');

  if (!cartList || !totalAmount) return;

  cartList.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x ${item.quantity} - R${(item.price * item.quantity).toFixed(2)}`;
    cartList.appendChild(li);
    total += item.price * item.quantity;
  });

  totalAmount.textContent = `Total: R${total.toFixed(2)}`;
}

function clearCart() {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
  updateCartCount();
  alert('Cart cleared!');
}

// Call on page load if needed
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  if (document.getElementById('cart-items')) {
    displayCartItems();
  }
});
