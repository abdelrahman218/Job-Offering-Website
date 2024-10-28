import { Component,inject,Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserType } from '../app.model';
import { UserService } from '../users/users.service';
import { ButtonComponent } from '../users/shared/button/button.component';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input({required: true}) userType ?: UserType;

  private appServices=inject(AppService);
  scrollToAboutUs(){
    // get the scroll height of the window
    const scrollHeight = document.body.scrollHeight;

    // scroll to the bottom of webpage
    window.scrollTo(0, scrollHeight);
  }
  logout(){
    this.appServices.logout();
  }
}