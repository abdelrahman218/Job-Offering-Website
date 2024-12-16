//Angular Imports
import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs';

//Services
import { UserService } from "./users/users.service";
import { ErrorService } from "./error/error.service";
import {CompaniesService} from './companies/companies.service'

//Models
import { type User, type UserType } from "./app.model";

@Injectable({
    providedIn: 'root'
})

export class AppService{
  //Dependecy Injection
  private routerService = inject(Router);
  private userService = inject(UserService);
  private errorService=inject(ErrorService);
  private companyService=inject(CompaniesService);
  
  //App Service's Attributes
  private userTypeSubject = new BehaviorSubject<UserType | null>(null);
  userTypeSignal=signal<UserType | undefined>(undefined);
  userType$ = this.userTypeSubject.asObservable(); // Exposes the userType as an observable
  
  //Other Service's Signals
  isError=this.errorService.isError;
  errorMessage=this.errorService.errorMessage;
   
  constructor() {
    // Restore user type from localStorage on service initialization
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      this.userTypeSubject.next(storedUserType as UserType);
    }
  }
  
  setUserType(newType: UserType) {
    console.log('Setting UserType:', newType);  
    this.userTypeSubject.next(newType);
  }
  getUserType(){
    this.userTypeSubject.value;
  }
  clearUserType() {
    this.userTypeSubject.next(null);
  }
    
  login(userType: UserType,user: User){
    this.userTypeSignal.set(userType);
    this.userService.login(user);
  }
  logout(){
    this.userTypeSignal.set(undefined);
    this.userService.signout();
    this.companyService.logout();
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    this.routerService.navigate(['']);
  }
}