import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service'; 
import { Router } from '@angular/router'
import { UserLoginDTO } from '../models/user.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string | null = null; 

  ngOnInit() {
    if (this.userService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      const loginDto: UserLoginDTO = { login: username, password };

      this.userService.loginUser(loginDto).subscribe(
        (response) => {
          console.log('Login successful:', response);

          
          this.userService.setCurrentUser(response);

      
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Login failed:', error);
          
          this.loginError = 'Invalid username or password.';
        }
      );
    } else {
      console.log('The form is incorrect');
    }
  }

  goToRegistration() {
    this.router.navigate(['registration']);
  }
}
