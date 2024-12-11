import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Component({
  selector: 'app-root', 
  standalone: true, 
  imports: [RouterOutlet,],
  providers: [ UserService ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDarkTheme = true;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void 
  {
    const storedTheme = localStorage.getItem('dark-theme');
    this.isDarkTheme = storedTheme === 'true';
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  toggleTheme() 
  {
    this.isDarkTheme = !this.isDarkTheme;

    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      localStorage.setItem('dark-theme', 'true');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      localStorage.setItem('dark-theme', 'false');
    }
  }

  goToProfile() 
  {
    if (this.userService.getCurrentUser()?.id) {
      this.router.navigate(['/user-profile/', this.userService.getCurrentUser()?.id]);
    } else {
      console.error('User Id is not set');
    }
  }

  goToHome()
  {
    this.router.navigate(['']);
  }

  goToAddPost()
  {
    this.router.navigate(['add-post']);
  }

  goToSettings()
  {
    this.router.navigate(['settings']);
  }

  getAvatar() : String | null | undefined
  {
    return this.userService.getCurrentUser()?.userIconFileName;
  }

 
}
