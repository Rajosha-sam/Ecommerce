import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { UserserviceService } from '../services/userservice.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

userForm:FormGroup=new FormGroup({})
isActive: any;
constructor(private fb:FormBuilder,private userservice:UserserviceService,private route:Router,private toaster:ToastrService){}
ngOnInit(): void {
  this.userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
}



onsubmit() {
  const { email, password } = this.userForm.value;
  console.log('Form values:', { email, password });

  this.userservice.getLogin(email, password).subscribe({
    next: (data) => {
      console.log('Login Response:', data);

      if (data.token) {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userid', data.userId);
        sessionStorage.setItem('roleid', data.roleId);
        console.log('Token received:', data.token);

        if (data.roleId === 1) {
          this.route.navigate(['/viewlist']);
        } else if (data.roleId === 2) {
          this.route.navigate(['/customer']);
        } else if (data.roleId === 3) {
          this.route.navigate(['/seller']);
        }

        this.toaster.success("Login successful");
      } else {
        this.toaster.error("Invalid user credentials");
      }
    },
    error: (err) => {
      if (err.status === 401) {
        this.toaster.error("Your account is deactivated. Please contact support.");
      } else {
        this.toaster.error("Invalid user");
      }
    }
  });
}
}
