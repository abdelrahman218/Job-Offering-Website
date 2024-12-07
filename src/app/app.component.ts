//Angular Imports
import { Component, inject, OnInit} from '@angular/core';
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
export class AppComponent implements OnInit{
  private appService=inject(AppService);
  userType=this.appService.userTypeSignal.asReadonly();
  isError=this.appService.isError;
  errorMessage=this.appService.errorMessage;

  ngOnInit(){
    var user : any=localStorage.getItem('user');
    const userType : any=localStorage.getItem('userType');

    if(user){
      user=JSON.parse(user);
    }

    if(user&&userType){
      this.appService.login(userType,user);
    }
  }
}