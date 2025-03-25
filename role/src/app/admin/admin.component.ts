import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
constructor(private userservcie:UserserviceService){}
  

}
