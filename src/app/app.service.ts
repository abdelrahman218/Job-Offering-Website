import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { User, UserType } from "./app.model";
import { UserService } from "./users/users.service";

@Injectable({
    providedIn: 'root'
})

export class AppService{
    private routerService = inject(Router);
    private userServices = inject(UserService);
    private isErrorSignal=signal<boolean>(false);
    private errorMessageSignal=signal<string>('');
    userTypeSinal=signal<UserType | undefined>(undefined);
    isError=this.isErrorSignal.asReadonly();
    errorMessage=this.errorMessageSignal.asReadonly();
    
    login(userType: UserType,user: User){
        this.userTypeSinal.set(userType);
        this.userServices.login(user);
    }
    logout(){
        this.userTypeSinal.set(undefined);
        this.userServices.signout();
        this.routerService.navigate(['']);
    }
    emitError(message:string){
        this.errorMessageSignal.set(message);
        this.isErrorSignal.set(true);
    }
    closeError(){
        this.errorMessageSignal.set('');
        this.isErrorSignal.set(false);
    }
}