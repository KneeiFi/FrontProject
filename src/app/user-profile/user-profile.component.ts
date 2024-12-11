import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserDTO } from '../models/user.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit { 
  userDTO: UserDTO | null = null; 

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      let userId = params['id']; 
      this.loadUserData(userId); 
    });
  }

  loadUserData(userId: number): void {
    this.userService.getUserbyId(userId).subscribe({
      next: (data) => {
        this.userDTO = data;  
      },
      error: (err) => {
        console.error('Error loading user data:', err);
      }
    });
  }
}