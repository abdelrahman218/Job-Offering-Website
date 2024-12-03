import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserType } from '../app.model';
import { UserService } from '../users/users.service';
import { ButtonComponent } from '../users/shared/button/button.component';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';
import { ErrorService } from '../error/error.service';
import { DropDownComponent } from "./drop-down/drop-down.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ButtonComponent, DropDownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input({ required: true }) userType?: UserType;
  isDropDown:boolean=true;
  private httpClientService = inject(HttpClient);
  private appService = inject(AppService);
  private errorService= inject(ErrorService);
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
          this.appService.logout();
        }
      }),
    catchError((error)=>{
      this.errorService.emitError('Logout Failed');
      throw new Error("Couldn't Logout");
    }))
      .subscribe();
  }
  toggleDropDownMenu(){
    this.isDropDown=!this.isDropDown;
  }
}