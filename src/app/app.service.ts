import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { routingType, UserType } from "./app.model";
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
    
    private dummyUserRouter: routingType[]=[
        {
            username: 'johndoe@gmail.com',
            password: 'password123',
            userType: 'User'
        },
        {
            username: 'janesmith@gmail.com',
            password: 'password456',
            userType: 'User'
        },
        {
            username: 'alicejohnson@gmail.com',
            password: 'password789',
            userType: 'User'        
        },
        {
            username: 'bobbrown@gmail.com',
            password: 'password101',
            userType: 'User'
        },
        {
            username: 'charliedavis@gmail.com',
            password: 'password202',
            userType: 'User'
        },
        {
            username: 'admin@gmail.com',
            password: '123',
            userType: 'Admin'
        },{
            username: 'techCorp@gmail.com',
            password: '123',
            userType: 'Company'
        }
    ];
    login(username: string, password: string){
        let loginReq = this.dummyUserRouter.find((user) => { return user.username === username && user.password === password; });
        switch (loginReq?.userType) {
            case 'User':
                this.userServices.login(loginReq.username, loginReq.password);
                this.userTypeSinal.set('User');
                this.routerService.navigate(['user', 'dashboard']);
                break;
            case 'Company':
                this.userServices.login(loginReq.username, loginReq.password);
                this.userTypeSinal.set('Company');
                this.routerService.navigate(['company', 'dashboard']);
                break;
                case 'Admin':
                    this.userServices.login(loginReq.username, loginReq.password);
                this.userTypeSinal.set('Admin');
                this.routerService.navigate(['admin', 'dashboard']);
                break;
        }
        return loginReq;
    }
    logout(){
        this.userTypeSinal.set(undefined);
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