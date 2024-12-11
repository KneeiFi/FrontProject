import { Injectable,} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePost, PostDTO } from './models/post.dto';


@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'https://localhost:7030/posts'; 

  constructor(private http: HttpClient) {}

  getPosts(skip: number, take: number, isFiltered: boolean = false): Observable<PostDTO[]> {
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('take', take.toString())
      .set('isFiltered', isFiltered.toString());

    return this.http.get<PostDTO[]>(this.apiUrl, { params });
  }
  getPost(id: number): Observable<PostDTO>{
    return this.http.get<PostDTO>(`${this.apiUrl}/${id}`);
  }

  postPost(post: CreatePost): Observable<CreatePost>
  {
    return this.http.post<CreatePost>(this.apiUrl, post);
  }
}