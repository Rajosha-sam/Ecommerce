import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';  // Import NgbModal
import { CartService } from '../cart.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService for notifications
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-viewcustomerproduct',
  imports: [RouterLink, CommonModule],
  templateUrl: './viewcustomerproduct.component.html',
  styleUrls: ['./viewcustomerproduct.component.css']
})
export class ViewcustomerproductComponent implements OnInit {
  @ViewChild('productDetailsModal', { static: false }) productDetailsModal!: TemplateRef<any>;  // Reference to modal
  user: any[] = [];  // Stores all products
  filteredProducts: any[] = [];  // Stores filtered products
  searchQuery: string = '';  // Holds the value of the search query
  selectedProduct: any; // Selected product for modal
Math: any;

  constructor(
    private userservice: UserserviceService,
    private modalService: NgbModal,
    public cartService: CartService,
    private toastr: ToastrService ,
    public wishlistService: WishlistService
    // Inject ToastrService for success messages
  ) {}

  ngOnInit(): void {
    // Fetch products on page load
    this.userservice.getProducts().subscribe({
      next: (data) => {
        this.user = data;  // Assign fetched products to 'user'
        this.filteredProducts = data;  // Initialize filteredProducts with all products
        console.log('Fetched Products:', data);
      },
      error: (err) => console.error('Error fetching products:', err),
      complete: () => console.log('Product data fetching complete.')
    });
  }

  // Called when search input changes
  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;  // Get the value from the input field
    this.searchQuery = query;  // Store the search query

    // Filter products based on the search query
    this.filteredProducts = this.user.filter((product: { name: string; }) =>
      product.name.toLowerCase().includes(query.toLowerCase())  // Case-insensitive search
    );
  }

  // Open the modal and pass product data
  openModal(product: any): void {
    this.selectedProduct = product;  // Assign selected product to be displayed in the modal
    const modalRef = this.modalService.open(this.productDetailsModal, { centered: true, size: 'lg' });  // Open the modal
    modalRef.componentInstance.product = this.selectedProduct;  // Pass the product data to the modal
  }

  // Add product to cart
  addToCart(product: any): void {
    this.cartService.addToCart(product);
    this.toastr.success(`${product.name} added to cart!`);
  }

  // Add product to wishlist
  addToWishlist(product: any): void {
    this.wishlistService.addToWishlist(product);
    this.toastr.success(`${product.name} has been added to your wishlist!`);
  }

  // Fallback image if product image fails to load
  onImageError(product: any): void {
    product.imageUrl = 'assets/default-product.png';  // Fallback image
  }
}








 
    
 
  
  
 

