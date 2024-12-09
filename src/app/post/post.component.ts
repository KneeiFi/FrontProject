import { Component, Input } from '@angular/core';
import { PostDTO } from '../models/post.dto';

@Component({
  selector: 'app-post',
  standalone: true,
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post?: PostDTO;  
  @Input() userNickname?: string;
  @Input() userAvatar?: string;
}