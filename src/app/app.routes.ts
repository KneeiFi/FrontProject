import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { AuthGuard } from './auth.guard';
import { AddPostComponent } from './add-post/add-post.component';


export const routes: Routes = [
  { path: '', component: HomeComponent}, 
  { path: 'user-profile/:id', component: UserProfileComponent,canActivate: [AuthGuard] },  
  { path: 'login', component: LoginComponent },  
  { path: 'registration', component: RegistrationComponent },  
  { path: 'search-users/:name', component: SearchUserComponent,canActivate: [AuthGuard]  },
  { path: 'add-post', component: AddPostComponent,canActivate: [AuthGuard] }
];