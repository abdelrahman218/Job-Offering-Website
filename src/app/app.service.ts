import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { User, UserType } from "./app.model";
import { UserService } from "./users/users.service";
import { ErrorService } from "./error/error.service";

@Injectable({
    providedIn: 'root'
})

export class AppService{
    private routerService = inject(Router);
    private userService = inject(UserService);
    private errorService=inject(ErrorService);
    userTypeSignal=signal<UserType | undefined>(undefined);
    isError=this.errorService.isError;
    errorMessage=this.errorService.errorMessage;
    
    login(userType: UserType,user: User){
        this.userTypeSignal.set(userType);
        this.userService.login(user);
    }
    logout(){
        this.userTypeSignal.set(undefined);
        this.userService.signout();
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
        this.routerService.navigate(['']);
    }
}