import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { UserserviceService } from '../services/userservice.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signuplogin',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './signuplogin.component.html',
  styleUrls: ['./signuplogin.component.css']
})
export class SignuploginComponent implements OnInit {
  userform: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userservice: UserserviceService,
    private ac: ActivatedRoute,
    private route: Router,
    private toster:ToastrService
  ) {
   
    this.userform = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roleId:['',Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      gender: ['',],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      
    });
  }
  ngOnInit(): void {
    
    const id = this.ac.snapshot.paramMap.get('id');
    if (id) {
      this.userservice.getUser(id).subscribe({
        next: (data) => {
          console.log('Fetched data:', data);
  
          if (data && data.userDetails) {
            // Ensure gender exists and matches 'Male' or 'Female'
            // const genderValue = data.userDetails?.gender; // Check this value in console
  
            // Only patch if gender exists
        
              // console.log('Gender Value:', genderValue);  // Log gender to check it
              this.toster.success("patched successfully")
              this.userform.patchValue({
                name: data.name,
                email: data.email,
                password: data.password,
                roleId: data.roleId,
                lastName: data.userDetails?.lastName,
                mobile: data.userDetails?.mobile,
                // console.log('Gender value from data:', data.userDetails?.gender),
               gender: data.userDetails?.gender,
                dateOfBirth: data.userDetails?.dateOfBirth,
                address: data.userDetails?.address,
                

              });
            } else {
              console.error('Gender field is missing or invalid');
            }
          
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
        }
      });
    }
  }
  
  
    

  onSubmit(): void {
    console.log('Form submitted with:', this.userform.value);
    const id = this.ac.snapshot.paramMap.get('id');
  
    if (id) {
      this.userservice.updateUser(id, this.userform.value).subscribe({
        next: (data) => {
          // alert('Updated successfully');
          this.toster.success("updated successfully")
        },
        error: (err) => {
          console.error('Error updating user:', err);
        }
      });
    } else {
      this.userservice.createUser(this.userform.value).subscribe({
        next: (data) => {
          // alert('Created successfully');
          this.toster.success("created succesfully")
          this.route.navigate(['/viewlist']);
        },
        error: (err) => {
          console.error('Error creating user:', err);
        }
      });
    }
  }
}  