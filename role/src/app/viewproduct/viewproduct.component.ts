import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-viewproduct',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  user: any[] = [];
  filteredProducts: any[] = [];
  isCustomer: boolean = false;
  searchQuery: string = '';  // Holds the value of the search query

  constructor(private userservice: UserserviceService, private toaster: ToastrService,) {}

  ngOnInit(): void {
    this.userservice.getProducts().subscribe({
      next: (data) => {
        this.user = data;
        this.filteredProducts = data; // Initialize with all products
        console.log(data); // Just for debugging
      },
      error: () => {},
      complete: () => {}
    });

    const roleid = sessionStorage.getItem('roleid');
    this.isCustomer = roleid === '2';  // Check if the user is a customer
  }

  // This method will handle the input event from the search bar
  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value; // Get the value from the input field
    this.searchQuery = query; // Store the search query

    // Filter products based on the search query
    this.filteredProducts = this.user.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) // Case-insensitive search
    );
    
  }
 
  

  onDelete(id: number): void {
    if (!this.isCustomer) {
      this.userservice.deleteProduct(id).subscribe({
        next: () => {
          this.toaster.success("Deleted successfully");
          this.ngOnInit();  // Refresh the product list
        },
        error: (err) => console.error('Error deleting product', err)
      });
    }
  }

  // Fallback image if product image fails to load
  onImageError(product: any) {
    product.imageUrl = 'assets/default-product.png'; // Fallback image
  }
}
