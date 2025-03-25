import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-viewroledetails',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './viewroledetails.component.html',
  styleUrl: './viewroledetails.component.css'
})
export class ViewroledetailsComponent implements OnInit {
  roleId!: number;
  users: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private userservice: UserserviceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.roleId = Number(params.get('id'));
      if (this.roleId) this.loadUsersByRole(this.roleId);
    });
  }

  loadUsersByRole(roleId: number) {
    this.userservice.getUsers().subscribe({
      next: (data) => {
        console.log("Fetched Users:", data);
        this.users = data?.filter((user: { roleId: number }) => user.roleId === roleId) || [];
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }
}




