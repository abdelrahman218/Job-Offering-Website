import { Routes } from '@angular/router';

// Main Pages Components
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UsersComponent } from './users/users.component';
import { CompaniesComponent } from './companies/companies.component';
import { AdminsComponent } from './admins/admins.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { Error404Component } from './error404/error404.component';
import { JobListerViewComponent } from './admins/job-lister-view.component';
import { JobSeekerViewComponent } from './admins/job-seeker-view.component';

// Routers
import { userRoutes } from './users/users.routes';
import { companyRoutes } from './companies/companies.routes';
import { adminRoutes } from './admins/admins.routes';

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
        path: 'job-lister',
        component: JobListerViewComponent,
        title: 'Job Lister View'  // Title for the job lister view
    },
    {
        path: 'job-seeker',
        component: JobSeekerViewComponent,
        title: 'Job Seeker View'  // Title for the job seeker view
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
