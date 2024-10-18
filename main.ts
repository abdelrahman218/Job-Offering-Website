import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideZoneChangeDetection } from '@angular/core';
import { routes } from './app/app.routes'; 
import { CompaniesComponent } from './app/companies/companies.component'; 

export const appConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    ReactiveFormsModule 
  ],
};

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
