import { Injectable } from '@angular/core';
import { CommentDTO, CreateCommentDTO } from './models/comment.dto';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'https://localhost:7030/comments';

  constructor(private http: HttpClient) {}

 
  getCommentById(id: number): Observable<CommentDTO | null> {
    return this.http.get<CommentDTO>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        return of(null); 
      })
    );
  }

  postComment(createCommentDTO: CreateCommentDTO): Observable<CreateCommentDTO>{
    return this.http.post<CommentDTO>(this.apiUrl, createCommentDTO)
  }

}