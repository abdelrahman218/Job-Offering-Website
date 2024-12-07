//Angular Imports
import { Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';

//Components
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { AppService } from './app.service';
import { ErrorComponent } from "./error/error.component";
import { CompaniesService } from './companies/companies.service';
import { UserType } from './app.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ErrorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private appService=inject(AppService);   
  isError=this.appService.isError;
  errorMessage=this.appService.errorMessage;

    userType=this.appService.userTypeSignal.asReadonly()
   
  ngOnInit(){
    
    var user : any=localStorage.getItem('user');
    const userType : any=localStorage.getItem('userType');
    var company:any=localStorage.getItem('company');
    
    if(user){
      user=JSON.parse(user);
    }
    else if(company&&userType=="Company"){
      company=JSON.parse(company);
      this.appService.userTypeSignal.set("Company");
    }
    if(user&&userType){
      this.appService.login(userType,user);
    }
   
    
  }
}