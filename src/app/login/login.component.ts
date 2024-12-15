import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap,EMPTY,throwError,switchMap } from 'rxjs';
import { User, UserType,Company } from '../app.model';
import { ErrorService } from '../error/error.service';
import { CompaniesService } from '../companies/companies.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private httpClientService = inject(HttpClient);
  private appService = inject(AppService);
  private companiesService=inject(CompaniesService)
  private errorService = inject(ErrorService);
  private router = inject(Router);
  username!: string;
  password!: string;
  login() {
    // Try Company Login First
    this.companiesService.login({
      Email: this.username,
      Password: this.password
    }).pipe(
      switchMap((companyResponse: any) => {
        if (companyResponse.UserType === 'Company') {
          // Company login successful
          this.appService.setUserType('Company');
          this.appService.userTypeSignal.set("Company");
          localStorage.setItem('userType', 'Company');
          localStorage.setItem('company', JSON.stringify(companyResponse));
          this.router.navigate(['/company/dashboard']);
          return EMPTY; // Stop further processing
        }
        // If not a company, proceed to user login
        return this.httpClientService.post('http://localhost:8080/login', {
          Email: this.username,
          Password: this.password,
        });
      }),
      map((res: any) => {
        // Process user details
        if (res.UserType === 'User') {
          let user: User & { UserType: UserType } = {
            photo: res.User.ProfilePic,
            name: res.User.Name,
            professionalTitle: res.User.ProfessionalTitle,
            skills: res.User.Skills,
            username: res.User.Email,
            UserType: 'User'
          };
          localStorage.setItem('user',JSON.stringify({
            id: res.id,
            photo: res.photo,
            name: res.name,
            professionalTitle: res.professionalTitle,
            skills: res.skills,
            username: res.username
          }));
          return user;
        }
        throw new Error('Invalid User Type');
      }),
      tap((user) => {
        // Store user details
        this.appService.login(user.UserType, {
          id: user.id,
          photo: user.photo,
          name: user.name,
          professionalTitle: user.professionalTitle,
          skills: user.skills,
          username: user.username
        });
        
        localStorage.setItem('userType', user.UserType);
        
      }),
      tap((user) => {
        // Navigate based on user type
        if (user.UserType === 'User') {
          this.router.navigate(['/user']);
        }
      }),
      catchError((error) => {
        this.errorService.emitError('Login Failed', false);
        return throwError(error);
      })
    ).subscribe();
  }
}