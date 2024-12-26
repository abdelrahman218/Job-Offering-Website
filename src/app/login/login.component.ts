//Angular Imports
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap,throwError } from 'rxjs';

//Services
import { AppService } from '../app.service';
import { UserService } from '../users/users.service';
import { CompaniesService } from '../companies/companies.service';
import { ErrorService } from '../error/error.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  //Dependency Injection
  private httpClientService = inject(HttpClient);
  private appService = inject(AppService);
  private userService = inject(UserService)
  private companiesService=inject(CompaniesService)
  private errorService = inject(ErrorService);
  private router = inject(Router);

  //Component Attributes
  username!: string;
  password!: string;

  login() {
    this.httpClientService.post(this.userService.backendUrl.replace('user','login'), {
      Email: this.username,
      Password: this.password,
    })
    .pipe(
      map((res: any) => {
        // Process user details
        var user: any=res;
        if (res.UserType === 'User') {
          user= {
            photo: res.User.ProfilePic,
            name: res.User.Name,
            professionalTitle: res.User.ProfessionalTitle,
            skills: res.User.Skills,
            username: res.User.Email,
            UserType: 'User'
          };
          localStorage.setItem('sessionId',res.SessionID);
          localStorage.setItem('user',JSON.stringify({
            photo: res.photo,
            name: res.name,
            professionalTitle: res.professionalTitle,
            skills: res.skills,
            username: res.username
          }));
        }
        return {user, SessionID: res.SessionID};
      }),
      tap((res) => {
        // Store Login user details
        if(res.user.UserType==='User'){
          this.appService.login(res.user.UserType, {
            photo: res.user.photo,
            name: res.user.name,
            professionalTitle: res.user.professionalTitle,
            skills: res.user.skills,
            username: res.user.username
          },res.SessionID);
        }
        else if(res.user.UserType==='Company'){
          localStorage.setItem('company', JSON.stringify(res.user));
          this.appService.setUserType('Company');
          this.appService.userTypeSignal.set("Company");
        }
        
        localStorage.setItem('userType', res.user.UserType);
      }),
      tap((res) => {
        // Navigate based on user type
        if (res.user.UserType === 'User') {
          this.router.navigate(['/user']);
        }
        else if(res.user.UserType==='Company'){
          this.router.navigate(['/company/dashboard']);
        }
      }),
      catchError((error) => {
        var errMessage=''
        switch(error.status){
          case 401:
            errMessage='Incorrect Username Or Password';
            break;
          case 500:
            errMessage='Internal Server Error';
            break;
          default:
            errMessage='Something Went Wrong'
        }
        this.errorService.emitError(errMessage, true);
        return throwError(error);
      })
    ).subscribe();
  }
}