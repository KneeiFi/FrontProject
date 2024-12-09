import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
//import { bootstrapApplication } from '@angular/platform-browser';
//import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
//import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
//import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
//import { PostComponent } from './post/post.component';


export const appConfig: ApplicationConfig = {
  
  providers: [
    ReactiveFormsModule,
    provideZoneChangeDetection({ eventCoalescing: true }),  
    provideRouter(routes),
    provideHttpClient()
  ]
};
