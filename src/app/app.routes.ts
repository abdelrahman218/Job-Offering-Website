import { CanMatchFn, Router, Routes } from '@angular/router';

//Main Pages Componanets
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UsersComponent } from './users/users.component';
import { CompaniesComponent } from './companies/companies.component';
import { AdminsComponent } from './admins/admins.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { Error404Component } from './error404/error404.component';
import { FindAJobComponent } from './users/find-a-job/find-a-job.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';

//Routers
import { userRoutes } from './users/users.routes';
import { companyRoutes } from './companies/companies.routes';
import { adminRoutes } from './admins/admins.routes';
import { AppService } from './app.service';
import { inject } from '@angular/core';
import { CardComponent } from './users/find-a-job/card/card.component';


const isUser : CanMatchFn = ()=>{
    const appService=inject(AppService);
    const routerService=inject(Router);
    if(appService.userTypeSignal()==='User'){
        return true;
    }
    else{
        routerService.navigate(['unauthorized']);
        return false;
    }
}
const isCompany: CanMatchFn = () => {

    const router = inject(Router);
    const userType = localStorage.getItem('userType');
    console.log('Guard Check - UserType:', userType);
  
    if (userType === 'Company') {
        return true;
    } else {
        router.navigate(['/unauthorized']);
        return false;
    }
  };
const isAdmin : CanMatchFn = ()=>{
    const appService=inject(AppService);
    const routerService=inject(Router);
    if(appService.userTypeSignal()==='Admin'){
        return true;
    }
    else{
        routerService.navigate(['unauthorized']);
        return false;
    }
}
export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SingupComponent
    },
    {
        path: 'find-a-job',
        component: FindAJobComponent
    },
    {
        path: 'user',
        children: userRoutes,
        canMatch: [isUser],
        component: UsersComponent
    },
    {
        path: 'company',
        children: companyRoutes,
        canMatch: [isCompany],
        component: CompaniesComponent
    },
    {
        path: 'admin',
        children: adminRoutes,
        canMatch:[isAdmin],
        component: AdminsComponent
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent,
        title: 'Unauthorized Access'
    },
    {
        path: 'login',
        component:  LoginComponent,
        title: 'Login'

    },
    {
        path: 'signup',
        component: SingupComponent,
        title: 'Signup'
    },
    {
        path: 'card',
        component: CardComponent,
        title: 'Card'
    },
    {
        path: '**',
        component: Error404Component,
        title: 'Error 404'
    }
];