import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserserviceService } from '../services/userservice.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true, // ✅ Standalone Component
  imports: [CommonModule, RouterLink, ReactiveFormsModule,], // ✅ Import CommonModule
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  selectedImageUrl: string | null = null; // Removed SafeUrl
  productId: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private userservice: UserserviceService,
    private route: ActivatedRoute,
    private toaster:ToastrService
  ) {
    this.productForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      category: ['', Validators.required],
      userId: [''],
      imageUrl: ['', Validators.required] // This will be used for submission
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.userservice.getProduct(this.productId).subscribe({
        next: (data) => {
          this.productForm.patchValue(data);
          // alert("Patched Successfully");
this.toaster.success("patched successfully")
          if (data.imageUrl) {
            this.productForm.patchValue({ imageUrl: data.imageUrl });
            this.selectedImageUrl = data.imageUrl; // Set image preview
          }
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        alert('❌ Invalid file type! Please upload a JPG or PNG image.');
        fileInput.value = ''; // Reset the file input
        return;
      }

      if (file.size > maxSize) {
        alert('❌ File too large! Maximum allowed size is 2MB.');
        fileInput.value = ''; // Reset the file input
        return;
      }

      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.selectedImageUrl = e.target?.result as string; // Set base64 URL
        this.productForm.patchValue({ imageUrl: this.selectedImageUrl });
        console.log('Image preview URL set:', this.selectedImageUrl);
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedImageUrl = null;
      this.productForm.patchValue({ imageUrl: null });
    }
  }

  onSubmit(): void {
    const formData = new FormData();
  
    // Append form values
    Object.keys(this.productForm.controls).forEach((key) => {
      const value = this.productForm.get(key)?.value;
      if (value) {
        formData.append(key, value);
      }
    });
  
    // Append selected file if available
    if (this.selectedFile) {
      formData.append('imageUrl', this.selectedFile, this.selectedFile.name);
    }
  
    console.log("Form Data Before Sending:", [...formData.entries()]);
  
    if (this.productId) {
      // UPDATE request
      this.userservice.updateProduct(Number(this.productId), formData).subscribe({
        next: (data) => {
          console.log("✅ Product Updated Successfully!", data);
          this.toaster.success("Product Updated Successfully");
        },
        error: (err) => {
          console.error("❌ Update Error:", err);
        }
      });
    } else {
      // CREATE request
      this.userservice.createProduct(formData).subscribe({
        next: (data) => {
          console.log("✅ Product Created Successfully!", data);
          this.toaster.success("Product Created Successfully");
        },
        error: (err) => {
          console.error("❌ Create Error:", err);
        }
      });
    }
  }
}  