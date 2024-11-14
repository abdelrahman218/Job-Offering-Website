//Angular Imports
import { Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';

//Components
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { AppService } from './app.service';
import { ErrorComponent } from "./error/error.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ErrorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private appService=inject(AppService);
  userType=this.appService.userTypeSinal.asReadonly();
  isError=this.appService.isError;
  errorMessage=this.appService.errorMessage;

  closeError(){
    this.appService.closeError();
  }
}