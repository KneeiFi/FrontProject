import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserDTO, CreateUserDTO, UserLoginDTO } from './models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7030/users'; 

  constructor(private http: HttpClient) {}

  getUserbyId(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/${id}`);
  }

 
  getUsers(name: string, skip: number, take: number): Observable<UserDTO[]> {
    let params = new HttpParams()
      .set('name', name)
      .set('skip', skip.toString())
      .set('take', take.toString());

    return this.http.get<UserDTO[]>(this.apiUrl, { params });
  }

  registerUser(createUserDto: CreateUserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.apiUrl}/CreateUser`, createUserDto);
  }

  putUser(userId: number, user: CreateUserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${this.apiUrl}/${userId}`, user);
  }

  loginUser(loginDto: UserLoginDTO): Observable<UserDTO> {
    return this.http.patch<UserDTO>(`${this.apiUrl}/login`, loginDto);
  }

  logoutUser(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/logout${id}`, {});
  }

  setCurrentUser(user: UserDTO): void {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }

  //-
  getCurrentUser(): UserDTO | null {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

 
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  
  clearCurrentUser(): void {
    sessionStorage.removeItem('currentUser');
  }
}
  
