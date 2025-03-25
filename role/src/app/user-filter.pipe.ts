import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter',
  standalone: true
})
export class UserFilterPipe implements PipeTransform {
  private roleMap: { [key: string]: number } = {
    'admin': 1,
    'customer': 2,
    'seller': 3
  };

  transform(users: any[] | null, selectedRole: string): any[] {
    if (!users || !Array.isArray(users)) {
      return [];
    }

    if (!selectedRole) {
      return users; 
    }

    const roleId = this.roleMap[selectedRole.toLowerCase()];
    
    return users.filter(user => user.roleId === roleId);
  }
}




