import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems: any[] = [];
  private userId: string;

  constructor() {
    this.userId = sessionStorage.getItem('userid') || '';  // Ensure userId is available
    this.loadWishlist();
  }

  private saveWishlist(): void {
    if (this.userId) {
      localStorage.setItem(`wishlist_${this.userId}`, JSON.stringify(this.wishlistItems)); // Save to localStorage with userId
    }
  }

  private loadWishlist(): void {
    if (this.userId) {
      const savedWishlist = localStorage.getItem(`wishlist_${this.userId}`);
      this.wishlistItems = savedWishlist ? JSON.parse(savedWishlist) : [];
    }
  }

  getWishlistItems(): any[] {
    this.loadWishlist();  // Ensure data is loaded from localStorage
    return this.wishlistItems;
  }

  addToWishlist(product: any): void {
    const existingProduct = this.wishlistItems.find(item => item.id === product.id);
    if (!existingProduct) {
      this.wishlistItems.push(product);  // Add product if not already in the wishlist
    }
    this.saveWishlist();  // Save updated wishlist to localStorage
  }

  removeFromWishlist(productId: number): void {
    const index = this.wishlistItems.findIndex(item => item.id === productId);
    if (index > -1) {
      this.wishlistItems.splice(index, 1);  // Remove item from wishlist
      this.saveWishlist();  // Save updated wishlist
    }
  }

  clearWishlist(): void {
    this.wishlistItems = [];  // Clear wishlist
    this.saveWishlist();  // Save empty wishlist
  }
}


