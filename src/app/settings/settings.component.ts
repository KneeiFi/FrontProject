import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateUserDTO } from '../models/user.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'] 
})
export class SettingsComponent {
  avatarUrl: string | null = null;
  newDescription: string = '';
  newNickname: string = '';

  constructor(public userService: UserService, private router: Router ) {}

  updateUserField(fieldName: keyof CreateUserDTO, value: string, password: string) {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      const updatedUser: CreateUserDTO = {
        nickname: currentUser.nickname || '', 
        phoneNumber: currentUser.phoneNumber || '',
        userDescription: currentUser.userDescription || '',
        userIconFileName: currentUser.userIconFileName || '',
        password,
        [fieldName]: value as any
      };
  
      this.userService.putUser(currentUser.id, updatedUser).subscribe({
        next: (response) => {
          this.userService.setCurrentUser(response);
          console.log(`${fieldName} updated successfully`);
        },
        error: (err) => {
          console.error(`Failed to update ${fieldName}`, err);
        }
      });
    } else {
      console.error('No user logged in');
    }
  }
  onAvatarChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarUrl = e.target.result;
        this.updateUserField('userIconFileName', this.avatarUrl || '', 'user-provided-password');
      };
      reader.readAsDataURL(file);
    }
  }

  setDescription() {
    this.updateUserField('userDescription', this.newDescription, 'user-provided-password');
  }

  setNickname() {
    this.updateUserField('nickname', this.newNickname, 'user-provided-password');
  }

  logout() {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      this.userService.logoutUser(currentUser.id).subscribe({
        next: () => {
          console.log('Logged out successfully');
          this.userService.clearCurrentUser();
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Logout failed', err);
        }
      });
    } else {
      console.error('No user logged in');
    }
  }
}