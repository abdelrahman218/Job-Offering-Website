import { Routes } from '@angular/router';

//Main Pages Componanets
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UsersComponent } from './users/users.component';
import { CompaniesComponent } from './companies/companies.component';
import { AdminsComponent } from './admins/admins.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { Error404Component } from './error404/error404.component';

//Routers
import { userRoutes } from './users/users.routes';
import { companyRoutes } from './companies/companies.routes';
import { adminRoutes } from './admins/admins.routes';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CardComponent } from './users/shared/card/card.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent
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
        path: 'login',
        component:  LoginComponent,
        title: 'Login'

    },
    {
        path: 'signup',
        component: SignupComponent,
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