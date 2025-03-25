import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators ,FormBuilder} from '@angular/forms';
import { UserserviceService } from '../services/userservice.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addrole',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './addrole.component.html',
  styleUrl: './addrole.component.css'
})
export class AddroleComponent implements OnInit {
form:FormGroup=new FormGroup({})
constructor(private fb:FormBuilder,private roleservice:UserserviceService,private toaster:ToastrService){}
  ngOnInit(): void {
  this.form=this.fb.group({
    name:['']
  })
  }
  onsubmit(){
this.roleservice.createRole(this.form.value).subscribe({
  next:(data)=>{
// alert("created successfully")
this.toaster.success("created successfully")
  },
  error:()=>{

  },
  complete:()=>{

  }
})
  }

}
