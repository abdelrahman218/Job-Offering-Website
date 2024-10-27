//Angular Imports
import { Component, inject, signal, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//Components
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

//Models
import { type UserType } from './app.model';
import { dummyUserRouterService } from './dummy-user-router.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private loginService=inject(dummyUserRouterService);
  userType=this.loginService.userTypeSinal.asReadonly();
}