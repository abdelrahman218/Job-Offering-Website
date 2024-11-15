import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';
import { User, UserType } from '../app.model';

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
            applications: [],
            skills: res.User.Skills,
            username: res.User.Email,
            password: res.User.Password,
            UserType: res.UserType,
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
              applications: res.applications,
              skills: res.skills,
              username: res.username,
              password: res.password,
            });
          },
          complete: () => {
            this.router.navigate(['/user']);
          },
        }),
        catchError((error) => {
          this.appService.emitError('Invalid Username or Password');
          throw error;
        })
      )
      .subscribe();
  }
}
