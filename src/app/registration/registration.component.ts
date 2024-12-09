import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CreateUserDTO } from '../models/user.dto';
import { passwordMatchValidator } from '../validators'; 
import { ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  passwordVisible: boolean = false;
  repeatPasswordVisible: boolean = false;
  phoneError: string | null = null;
  registrationError: string | null = null; 

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registrationForm = this.fb.group(
      {
        nickname: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      },
      { validator: passwordMatchValidator() } 
    );
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (field === 'repeat-password') {
      this.repeatPasswordVisible = !this.repeatPasswordVisible;
    }
  }

  validatePhoneNumber() {
    const phoneControl = this.registrationForm.get('phone');
    if (phoneControl?.invalid) {
      this.phoneError = 'Please enter a valid phone number.';
    } else {
      this.phoneError = null;
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const { nickname, password, phoneNumber } = this.registrationForm.value;
      const newUser: CreateUserDTO = { nickname, password, phoneNumber,  };

      this.userService.registerUser(newUser).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration failed:', error);
          this.registrationError = 'Error during registration. Please try again.'; 
        }
      );
    } else {
      console.log('The form is incorrect');
    }
  }
}