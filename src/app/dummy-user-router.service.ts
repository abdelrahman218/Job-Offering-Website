import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { routingType, UserType } from "./app.model";
import { UserService } from "./users/users.service";

@Injectable({
    providedIn: 'root'
})

export class dummyUserRouterService{
    private routerService = inject(Router);
    private userServices = inject(UserService);
    userTypeSinal=signal<UserType | undefined>(undefined);
    private dummyUserRouter: routingType[]=[
        {
            username: 'johndoe',
            password: 'password123',
            userType: 'User'
        },
        {
            username: 'janesmith',
            password: 'password456',
            userType: 'User'
        },
        {
            username: 'alicejohnson',
            password: 'password789',
            userType: 'User'        
        },
        {
            username: 'bobbrown',
            password: 'password101',
            userType: 'User'
        },
        {
            username: 'charliedavis',
            password: 'password202',
            userType: 'User'
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
                this.routerService.navigate(['admin', '']);
                break;
        }
        return loginReq;
    }
}