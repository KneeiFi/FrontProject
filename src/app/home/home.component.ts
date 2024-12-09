import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { PostDTO } from '../models/post.dto'; 
import { CommonModule } from '@angular/common';
import { UserDTO } from '../models/user.dto';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  posts: PostDTO[] = [];
  users: Map<number, UserDTO> = new Map(); 

  take: number = 10;
  skip: number = 0;

  constructor(private postService: PostService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts(this.skip, this.take, false).subscribe((data) => {
      this.posts = data;
      this.loadUsersForPosts();
    });
  }

  loadUsersForPosts() {
    this.posts.forEach(post => {
      this.getUser(post.userId);
    });
  }

  getUser(userId: number) {
    
    if (this.users.has(userId)) {
      return; 
    }

    this.userService.getUserbyId(userId).subscribe((user) => {
      this.users.set(userId, user); 
    });
  }

  
  getUserFromMap(userId: number): UserDTO | undefined {
    return this.users.get(userId);
  }

  goToProfile(idUser: number)
  {
    this.router.navigate(['user-profile/' + idUser]);
  }

  likeAdd(PostDTO: PostDTO)
  {

  }
}