import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';
import { User, UserType } from '../app.model';
import { ErrorService } from '../error/error.service';

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
  private errorService = inject(ErrorService);
  private router = inject(Router);
  username!: string;
  password!: string;
  login() {
    this.httpClientService
      .post('http://localhost:8080/login', {
        Email: this.username,
        Password: this.password,
      })
      .pipe(
        map((res: any) => {
          let user: User & { UserType: UserType } = {
            id: res.User.Email,
            photo: res.User.ProfilePic,
            name: res.User.Name,
            professionalTitle: res.User.ProfessionalTitle,
            skills: res.User.Skills,
            username: res.User.Email,
            UserType: res.UserType
          };
          return user;
        }),
        tap({
          next: (res) => {
            this.appService.login(res.UserType, {
              id: res.id,
              photo: res.photo,
              name: res.name,
              professionalTitle: res.professionalTitle,
              skills: res.skills,
              username: res.username
            });
            localStorage.setItem('user',JSON.stringify({
              id: res.id,
              photo: res.photo,
              name: res.name,
              professionalTitle: res.professionalTitle,
              skills: res.skills,
              username: res.username
            }));
            localStorage.setItem('userType',res.UserType);
          },
          complete: () => {
            this.router.navigate(['/user']);
          },
        }),
        catchError((error) => {
          this.errorService.emitError('Invalid Username or Password', false);
          throw error;
        })
      )
      .subscribe();
  }
}