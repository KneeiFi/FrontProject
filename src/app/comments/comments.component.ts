import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../comment.service';
import { CommentDTO } from '../models/comment.dto';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../models/user.dto';
import { UserService } from '../user.service';
import { PostDTO } from '../models/post.dto';
import { PostService } from '../post.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {
  comments: CommentDTO[] = [];
  users: Map<number, UserDTO> = new Map(); 
  postDTO?: PostDTO;
  constructor(private commentService: CommentService, private route: ActivatedRoute, 
    private userService: UserService, private postService: PostService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let postId = params['id'];
      this.loadPost(postId);
      this.loadComments(postId);
      
    });
    
  }
  async loadComments(postId: number | null | undefined) {
    let currentId = 1;
    let finished = false;

    while (!finished) {
      try {
        const data = await this.commentService.getCommentById(currentId).toPromise();

        if (data) {
          if(data.postId == this.postDTO?.id){
            this.comments.push(data);
            this.loadUser(data.userId);
          }
          currentId++; 
        } else {
          finished = true;
        }
      } catch (err) {
        finished = true;
      }
    }
  }
  loadUser(userId: number): void {
    if (!this.users.has(userId)) {
      this.userService.getUserbyId(userId).subscribe({
        next: (user) => {
          this.users.set(userId, user);
        },
        error: (err) => {
          console.error(`Failed to load user with ID ${userId}`, err);
        }
      });
    }
  }

  loadPost(postId: number)
  {
      this.postService.getPost(postId).subscribe({next: 
        (data) => {this.postDTO = data},
        error: (err) => {console.error(err)}
      });
  }

  getUserNickname(userId: number): string | null{
    const user = this.users.get(userId); 
    return user ? user.nickname : 'Unknown'; 
  }
}
