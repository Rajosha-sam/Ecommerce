import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports:[CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistItems: any[] = [];
  expandedIndex: number | null = null; // Track which item is expanded

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.wishlistItems = this.wishlistService.getWishlistItems();
  }

  toggleCollapse(index: number): void {
    // Toggle the collapse for the clicked item
    if (this.expandedIndex === index) {
      this.expandedIndex = null; // Close if already open
    } else {
      this.expandedIndex = index; // Open the clicked item
    }
  }

  moveToCart(product: any): void {
    this.cartService.addToCart(product); // Add to cart
    this.wishlistService.removeFromWishlist(product.id); // Pass product ID to remove from wishlist
    this.wishlistItems = this.wishlistService.getWishlistItems(); // Refresh the wishlist

    // Show success message
    this.toastr.success('Product has been added to the cart!', 'Success');
  }

  removeFromWishlist(product: any): void {
    this.wishlistService.removeFromWishlist(product.id); // Pass product ID to remove from wishlist
    this.wishlistItems = this.wishlistService.getWishlistItems(); // Refresh the wishlist
  }
}




