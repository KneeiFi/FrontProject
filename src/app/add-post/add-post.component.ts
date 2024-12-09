import { Component, ViewChild, ElementRef } from '@angular/core';
import { PostService } from '../post.service';
import { UserService } from '../user.service';
import { CreatePost } from '../models/post.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  @ViewChild('fileInput') fileInput: ElementRef | undefined; 
  images: string[] = [];
  description: string = '';

  constructor(private postService: PostService, private userService: UserService,private router: Router ) {}

  onFileSelected(event: any): void {
    const fileList = event.target.files;
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }

  onSubmit(): void {
    const currentUser = this.userService.getCurrentUser();  

    if (currentUser) {
      const media = this.images.join(';');  

      const post: CreatePost = {  
        userId: currentUser.id,
        description: this.description,
        media: media,  
        likesCount: 0,  
      };

      this.postService.postPost(post).subscribe({
        next: (response) => {
          console.log('Post submitted successfully', response);
        },
        error: (error) => {
          console.error('Error submitting post', error);
        }
      });
      this.router.navigate([''])
    } else {
      console.log('User not authenticated');
    }
  }

  triggerFileInput(): void {
    this.fileInput?.nativeElement.click();  
  }
}