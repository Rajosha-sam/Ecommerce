import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-seller',
  imports: [RouterLink],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css'
})
export class SellerComponent implements OnInit {
  user: any;
  
constructor(private userservice: UserserviceService){}
  ngOnInit(): void {
     this.userservice.getProducts().subscribe({
      next: (data) => {
        this.user = data;
        console.log(data); 
      },
      error: () => {},
      complete: () => {}
    });
  }


  onImageError(product: any) {
    product.imageUrl = 'assets/default-product.png'; // Fallback image
  }
}
