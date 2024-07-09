// Product class to store id, name, price, and image of the product
class Product {
  constructor(id, name, price, image) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.image = image;
  }
}

// ShoppingCartItem class to store product and quantity
class ShoppingCartItem {
  constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
  }

  calculateTotalPrice() {
      return this.product.price * this.quantity;
  }
}

// ShoppingCart class to manage the cart items
class ShoppingCart {
  constructor() {
      this.items = [];
  }

  // to get the total number of items in the cart
  getTotalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // To get the grand total price of all items in the cart
  getGrandTotalPrice() {
      return this.items.reduce((total, item) => total + item.calculateTotalPrice(), 0);
  }

  // to add an item to the cart
  addItem(product, quantity = 1) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
          existingItem.quantity += quantity;
      } else {
          this.items.push(new ShoppingCartItem(product, quantity));
      }
      this.updateCart();
  }

  // To remove an item from the cart
  removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
      this.updateCart();
  }

  // To display cart items in the UI
  displayCartItems() {
      const cartItemsContainer = document.getElementById('cart-items');
      cartItemsContainer.innerHTML = '';
      this.items.forEach(item => {
          const cartItem = document.createElement('div');
          cartItem.className = 'cart-item';
          cartItem.innerHTML = `
              <img src="${item.product.image}" alt="${item.product.name}">
              <div>
                  <h3>${item.product.name}</h3>
                  <p>$${item.calculateTotalPrice().toFixed(2)}</p>
              </div>
              <div>
                  <button onclick="cart.decreaseQuantity(${item.product.id})">-</button>
                  <span>${item.quantity}</span>
                  <button onclick="cart.increaseQuantity(${item.product.id})">+</button>
              </div>
          `;
          cartItemsContainer.appendChild(cartItem);
      });

      // Display total quantity and grand total price
      const cartSummary = document.createElement('div');
      cartSummary.className = 'cart-summary';
      cartSummary.innerHTML = `
          <h3>Total Price: $${this.getGrandTotalPrice().toFixed(2)}</h3>
      `;
      cartItemsContainer.appendChild(cartSummary);

      // Update cart count in the header
      document.getElementById('cart-count').innerText = this.getTotalItems();
  }

// to update the cart UI
  updateCart() {
    this.displayCartItems();

    // Show or hide checkout button based on the cart items
    const checkoutButton = document.getElementById('checkout-button');
    if (this.getTotalItems() > 0) {
        checkoutButton.style.display = 'block';
    } else {
        checkoutButton.style.display = 'none';
    }
}

//to increase the quantity of an item in the cart
increaseQuantity(productId) {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
        item.quantity++;
    }
    this.updateCart();
}

  //to decrease the quantity of an item in the cart
  decreaseQuantity(productId) {
      const item = this.items.find(item => item.product.id === productId);
      if (item && item.quantity > 1) {
          item.quantity--;
      } else {
          this.removeItem(productId);
      }
      this.updateCart();
  }
}

// Creating product instances
const products = [
  new Product(1, 'Product 1', 100, './product1.jpg'),
  new Product(2, 'Product 2', 130, './product2.jpg'),
  new Product(3, 'Product 3', 150, './product3.jpg')
];

// Creating a shopping cart instance
const cart = new ShoppingCart();

// Function to add a product to the cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
      cart.addItem(product);
  }
}

// // Function to close the cart (can be implemented as needed)
// function closeCart() {
//   alert('Closing cart functionality can be implemented here.');
// }

// // Function to proceed to checkout (can be implemented as needed)
// function checkout() {
//   alert('Checkout functionality can be implemented here.');
// }
