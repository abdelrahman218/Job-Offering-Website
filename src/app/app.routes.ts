import { Routes } from '@angular/router';

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
        component: UsersComponent
    },
    {
        path: 'company',
        children: companyRoutes,
        component: CompaniesComponent
    },
    {
        path: 'admin',
        children: adminRoutes,
        component: AdminsComponent
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent,
        title: 'Unauthorized Access'
    },
    {
        path: '**',
        component: Error404Component,
        title: 'Error 404'
    }
];