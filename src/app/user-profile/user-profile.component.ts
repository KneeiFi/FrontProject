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
  userId: number = 0; 
  userDTO: UserDTO | null = null; 

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.userId = params['id']; 
      this.loadUserData(); 
    });
  }

  
  loadUserData(): void {
    this.userService.getUserbyId(this.userId).subscribe({
      next: (data) => {
        this.userDTO = data;  
      },
      error: (err) => {
        console.error('Error loading user data:', err);
      }
    });
  }
}