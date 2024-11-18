import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserType } from '../app.model';
import { UserService } from '../users/users.service';
import { ButtonComponent } from '../users/shared/button/button.component';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input({ required: true }) userType?: UserType;

  private httpClientService = inject(HttpClient);
  private appServices = inject(AppService);
  scrollToAboutUs() {
    // get the scroll height of the window
    const scrollHeight = document.body.scrollHeight;

    // scroll to the bottom of webpage
    window.scrollTo(0, scrollHeight);
  }
  logout() {
    this.httpClientService
      .get('http://localhost:8080/logout')
      .pipe(tap({
        complete: ()=>{
          this.appServices.logout();
        }
      }),
    catchError((error)=>{
      this.appServices.emitError('Couldn\'t Logout!! Try again Later');
      throw new Error("Couldn't Logout");
    }))
      .subscribe();
  }
}