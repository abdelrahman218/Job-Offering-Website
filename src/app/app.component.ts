//Angular Imports
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//Components
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

//Models
import { type UserType } from './app.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  userType: UserType = 'User';
}