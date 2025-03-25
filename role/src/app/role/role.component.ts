import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-role',
  imports:[RouterLink],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit {
 
  roles: any[] = [];
  users: any[] = [];
  filteredUsers: any[] = [];
  selectedRole: string = '';

  constructor(private userservice: UserserviceService,private route:Router) {}

  ngOnInit(): void {
    // Fetch roles
    let roleid=sessionStorage.getItem('roleid')
    this.userservice.getRoles().subscribe({
      next: (data) => {
        this.roles = data;
      }
    });

    // Fetch all users
    this.userservice.getRoles().subscribe({
      next: (data) => {
        this.users = data;
      }
    });
  }

  // Function to filter users based on selected role
  showUsersByRole(role: string) {
    this.selectedRole = role;
    this.filteredUsers = this.users.filter(user => user.role === role);
  }


  onRoleDetails(roleId: number) {
    this.route.navigate(['/viewroledetails', roleId]); // Navigates to the role details page
  }

  // Delete a role
  onDelete(roleId: number) {
    this.userservice.deleteRole(roleId).subscribe({
      next: () => {
        this.roles = this.roles.filter(role => role.id !== roleId);
      }
    });
  }
}

