import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html', // ✅ Uses external HTML file
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  showNavbar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isAdmin: boolean = false;
  isCustomer: boolean = false;
  isSeller: boolean = false;

  constructor(private router: Router,public cartService: CartService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Define routes where the navbar should be hidden
        const hideNavbarRoutes = ['/login', '/','/sign']; // Add other paths if needed
  
        // Check if the current route matches any of these paths
        const hideNavbar = hideNavbarRoutes.includes(event.urlAfterRedirects);
        
        // Update the BehaviorSubject accordingly
        this.showNavbar.next(!hideNavbar);
        
        this.updateUserRole();
      }
    });
  }
  

  updateUserRole() {
    const roleId = sessionStorage.getItem('roleid');
    this.isAdmin = roleId === '1';
    this.isCustomer = roleId === '2';
    this.isSeller = roleId === '3';
  }

  logout() {
    sessionStorage.clear();
    this.showNavbar.next(false);
    this.router.navigate(['/login']).then(() => window.location.reload());
  }
}













