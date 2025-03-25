import { Component, OnInit, HostListener } from '@angular/core';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-viewcart',
  imports: [CommonModule, RouterLink],
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewCartComponent implements OnInit {
  cartItems: any[] = [];
  wishlistItems: any[] = []; // Wishlist items
  totalPrice: number = 0;
  totalItems: number = 0;
  isLoading: boolean = true;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Ensure the user is logged in before loading data
    const userId = sessionStorage.getItem('userid');
    
    if (userId) {
      this.loadCartData();
      this.loadWishlistData();  // Load user-specific wishlist data
    } else {
      this.toastr.error('Please log in to view your cart and wishlist.');
    }
  }

  // Load cart data from CartService
  loadCartData(): void {
    this.isLoading = true; // Set loading to true
    this.cartItems = this.cartService.getCartItems();
    this.totalItems = this.cartService.getCartItemCount();
    this.totalPrice = this.cartService.getTotalPrice();
    this.isLoading = false; // Set loading to false
  }

  // Load wishlist data from WishlistService
  loadWishlistData(): void {
    this.isLoading = true; // Set loading to true
    this.wishlistItems = this.wishlistService.getWishlistItems();
    this.isLoading = false; // Set loading to false
  }

  // Remove item from cart
  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.toastr.success('Item removed from cart');
    this.loadCartData(); // Recalculate total items and total price
  }

  confirmOrder() {
    const confirmation = confirm('Are you sure you want to place the order?');
    if (confirmation) {
      alert('Order confirmed!');
      // Proceed with the checkout process
    } else {
      alert('Order not confirmed.');
    }
  }

  // Remove item from wishlist
  removeFromWishlist(productId: number): void {
    this.wishlistService.removeFromWishlist(productId);
    this.toastr.success('Item removed from wishlist');
    this.loadWishlistData(); // Refresh wishlist
  }

  // Clear all items from cart
  clearCart(): void {
    this.cartService.clearCart();
    this.toastr.info('Cart cleared');
    this.loadCartData(); // Recalculate total items and total price
  }

  // Move item from wishlist to cart
  moveToCart(product: any): void {
    this.cartService.addToCart(product); // Add to cart
    this.wishlistService.removeFromWishlist(product.id); // Remove from wishlist
    this.loadCartData(); // Recalculate cart data
    this.loadWishlistData(); // Recalculate wishlist data
    this.toastr.success('Item moved to cart');
  }

  // Increase quantity of an item and update cart data
  increaseQuantity(item: any) {
    item.quantity++; // Increment the item quantity
    this.cartService.updateCartItem(item); // Update the item in the CartService
    this.loadCartData(); // Recalculate total items and total price
  }

  // Decrease quantity of an item and update cart data
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--; // Decrease the item quantity
      this.cartService.updateCartItem(item); // Update the item in the CartService
    } else {
      this.removeFromCart(item.id); // Remove item if quantity reaches 1
    }
    this.loadCartData(); // Recalculate total items and total price
  }

  // Confirm item removal with a dialog
  confirmRemove(item: any): void {
    if (confirm(`Are you sure you want to remove ${item.name}?`)) {
      this.removeFromCart(item.id); // For cart items
      // or
      this.removeFromWishlist(item.id); // For wishlist items
    }
  }

  // Handle image load errors globally
  @HostListener('error', ['$event'])
  onImageError(event: any) {
    event.target.src = 'assets/images/product1.jpg'; // Fallback image
  }
}











