import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';  // Import NgbModal
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productdetails',
  imports: [CommonModule],
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  @Input() product: any;
  productId: number | null = null;
Math: any;

  constructor(
    private route: ActivatedRoute,
    private userservice: UserserviceService,
    private toaster: ToastrService,
    public cartservice: CartService,
    private modalService: NgbModal  // Inject NgbModal service
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];  // Get the product ID from the route
      if (this.productId !== null && this.productId !== undefined) {
        this.getProductDetails();
      }
    });
  }

  // Open modal directly on product click (no button needed)
  openModal(content: any): void {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  // Add product to cart
  addToCart(product: any, modal: any): void {
    this.cartservice.addToCart(product);
    this.toaster.success(`${product.name} added to cart!`);
    modal.dismiss('Cart Added');  // Dismiss modal after adding to cart
  }

  // Add product to wishlist
  addToWishlist(product: any): void {
    this.toaster.success(`${product.name} added to wishlist!`);
  }

  // Fetch product details
  getProductDetails(): void {
    if (this.productId !== null) {
      this.userservice.getProductById(this.productId).subscribe({
        next: (data) => {
          this.product = {
            ...data,
            freeDelivery: data.freeDelivery || false,
            rating: data.rating || 0,
            discount: data.discount || 0,
          };
        },
        error: (err) => {
          this.toaster.error('Failed to load product details.');
        }
      });
    }
  }

  // Handle image loading errors
  onImageError(product: any): void {
    product.imageUrl = 'assets/default-image.jpg'; // Fallback image path
  }
}
















