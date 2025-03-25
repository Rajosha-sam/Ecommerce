import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {
    this.loadCart();
  }

  private saveCart(): void {
    const userId = sessionStorage.getItem('userid');  // Get the logged-in user's ID
    if (userId) {
      localStorage.setItem(`cart-${userId}`, JSON.stringify(this.cartItems));  // Save cart for the specific user
    }
  }

  private loadCart(): void {
    const userId = sessionStorage.getItem('userid');  // Get the logged-in user's ID
    if (userId) {
      const savedCart = localStorage.getItem(`cart-${userId}`);  // Retrieve cart for the specific user
      this.cartItems = savedCart ? JSON.parse(savedCart) : [];  // Load the cart or default to an empty array
    }
  }

  getCartItems(): any[] {
    this.loadCart();  // Ensure latest cart data is loaded
    return this.cartItems;
  }

  getCartItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);  // Get total item count
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);  // Get total price
  }

  addToCart(product: any): void {
    console.log('Adding to cart:', product);  // Log the product being added to the cart
    
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;  // If it already exists, increase quantity
    } else {
      this.cartItems.push({ ...product, quantity: 1 });  // Otherwise, add the new product with quantity 1
    }
    
    this.saveCart();  // Save the updated cart to localStorage
    console.log('Updated cart items:', this.cartItems);  // Log the updated cart
  }

  removeFromCart(productId: number): void {
    const index = this.cartItems.findIndex(item => item.id === productId);  // Find the product by ID
    if (index > -1) {
      // Check if the item exists in the cart
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;  // Decrease the quantity if it's greater than 1
      } else {
        this.cartItems.splice(index, 1);  // If quantity is 1, remove the product from the cart
      }
      this.saveCart();  // Save the updated cart to localStorage
    } else {
      console.log('Item not found in cart');
    }
  }

  clearCart(): void {
    this.cartItems = [];  // Clear the cart
    this.saveCart();  // Save the empty cart to localStorage
  }

  // Update the cart item (e.g. quantity)
  updateCartItem(updatedItem: any) {
    const index = this.cartItems.findIndex(item => item.id === updatedItem.id);
    if (index > -1) {
      this.cartItems[index] = updatedItem;  // Update the item in the cart
      this.saveCart();  // Save the updated cart to localStorage
    }
  }
}



