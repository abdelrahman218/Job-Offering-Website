import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { signup } from '../app.model';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';
import { ErrorService } from '../error/error.service';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css',
})
export class SingupComponent {
  private httpClientService = inject(HttpClient);
  private errorService=inject(ErrorService);
  private router=inject(Router);
  signupInfo: signup = {
    FName: '',
    LName: '',
    Email: '',
    Password: '',
    PTitle: '',
  };
  signup() {
    this.httpClientService.post('http://localhost:8080/signup', this.signupInfo)
    .pipe(
      tap({ complete: () => {
        this.router.navigate(['/login'])
      }}),
      catchError((error) => {
        this.errorService.emitError('Signup Failed');
        throw new Error("Couldn't Signup");
      })
    ).subscribe();
  }
}