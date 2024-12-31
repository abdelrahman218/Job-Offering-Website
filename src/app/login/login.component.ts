import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';
import { User, UserType } from '../app.model';
import { AppService } from '../app.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private httpClientService = inject(HttpClient);
  private appService = inject(AppService);
  private router = inject(Router);
  username!: string;
  password!: string;
  isLoginAsAdmin = false; 

  async login() {
  try {
    const loginUrl = this.isLoginAsAdmin ? 'http://localhost:8080/admin/login' : 'http://localhost:8080/login';

    const { username, password } = this; // Assuming username and password are defined in the component class

    const response = await this.httpClientService.post<any>(loginUrl, {
      [this.isLoginAsAdmin ? 'username' : 'Email']: username,
      password,
    }).toPromise(); // Use toPromise() for asynchronous handling

    if (this.isLoginAsAdmin) {
      localStorage.setItem('adminToken', response.token);
      this.router.navigate(['/admin']);
    } else {
      const user: User & { UserType: UserType } = {
        id: response.User.Email,
        photo: response.User.ProfilePic,
        name: response.User.Name,
        professionalTitle: response.User.ProfessionalTitle,
        applications: [],
        skills: response.User.Skills,
        username: response.User.Email,
        password: response.User.Password, // Consider not storing password in the user object
        UserType: response.UserType,
      };

      this.appService.login(user.UserType, user);
      this.router.navigate(['/user']);
    }

    this.username = '';
    this.password = '';
  } catch (error) {
    this.appService.emitError('Invalid Username or Password');
    console.error('Login error:', error); // Log the actual error for debugging
  } finally {
    // Optional: Perform actions that should always happen, regardless of success or failure
    // (e.g., disabling a loading indicator)
  }
}
}