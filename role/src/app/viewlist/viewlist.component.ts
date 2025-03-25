import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe, NgFor, NgClass } from '@angular/common';
import { UserFilterPipe } from '../user-filter.pipe';

@Component({
  selector: 'app-viewlist',
  standalone: true,
  imports: [UserFilterPipe, NgFor, NgClass, JsonPipe,RouterLink],
  templateUrl: './viewlist.component.html',
  styleUrls: ['./viewlist.component.css']
})
export class ViewlistComponent implements OnInit {
  users: any[] = [];
  selectedRole: string = '';

  constructor(
    private userservice: UserserviceService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userservice.getUsers().subscribe({
      next: (data: any[]) => {
        this.users = data || [];
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.toaster.error('Failed to fetch users');
      }
    });
  }

  onRoleChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    if (target && target.value !== undefined) {
      this.selectedRole = target.value;
    }
  }

  toggleUserStatus(user: any): void {
    if (user.isActive) {
      this.deactivateUser(user.id);
    } else {
      this.activateUser(user.id);
    }
  }

  activateUser(id: number) {
    this.userservice.activateUser(id).subscribe({
      next: () => {
        this.toaster.success('User activated successfully');
        this.fetchUsers();  // Refresh the user list
      },
      error: () => {
        this.toaster.error('Failed to activate user');
      }
    });
  }

  deactivateUser(id: number) {
    this.userservice.deactivateUser(id).subscribe({
      next: () => {
        this.toaster.success('User deactivated successfully');
        this.fetchUsers();  // Refresh the user list
      },
      error: () => {
        this.toaster.error('Failed to deactivate user');
      }
    });
  }

  onDelete(id: number) {
    this.userservice.deleteUser(id).subscribe({
      next: () => {
        this.toaster.success('Deleted successfully');
        this.fetchUsers();
      },
      error: () => {
        this.toaster.error('Failed to delete user');
      }
    });
  }

  trackByUserId(index: number, user: any): number {
    return user.id;
  }

  
}


