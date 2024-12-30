//Angular Imports
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

//Components
import { ButtonComponent } from '../users/shared/button/button.component';
import { DropDownComponent } from "./drop-down/drop-down.component";

//Services
import { AppService } from '../app.service';
import { UserService } from '../users/users.service';
import { ErrorService } from '../error/error.service';

//Models
import { type UserType } from '../app.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ButtonComponent, DropDownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})

export class HeaderComponent {
  @Input({ required: true }) userType?: UserType;
  isDropDown:boolean=false;
  private httpClientService = inject(HttpClient);
  private appService = inject(AppService);
  private userService = inject(UserService);
  private errorService= inject(ErrorService);
  scrollToAboutUs() {
    // get the scroll height of the window
    const scrollHeight = document.body.scrollHeight;

    // scroll to the bottom of webpage
    window.scrollTo(0, scrollHeight);
  }
  logout() {
    this.httpClientService
      .get(this.userService.backendUrl.replace('user','logout'),this.userService.UserHttpHeader())
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