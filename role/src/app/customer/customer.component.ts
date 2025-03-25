import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer',
  imports:[RouterLink,],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {


 users: any;
userid:any;
roleid:any;
// isAddProductDisabled: boolean = false;
  constructor(private userservice: UserserviceService) {}

  ngOnInit(): void {
    this.userid=sessionStorage.getItem('userid')
    this.roleid=sessionStorage.getItem('roleid')
    this.userservice.getUsers().subscribe({
      next: (data) => {
        this.users = data;
       
          this.users = data.filter((u: any) => u.id == this.userid); 
      
      },
      error: (err) => {
        
      },
      complete: () => {
       
      }
    });
  }

}