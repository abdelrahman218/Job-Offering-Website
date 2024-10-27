import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FindAJobComponent } from './find-a-job/find-a-job.component';
import { ApplicationsComponent } from './applications/applications.component';

export const userRoutes: Routes =[
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard'
    },
    {
        path: 'find-a-job',
        component: FindAJobComponent,
        title: 'Find a job'
    },
    {
        path: 'applications',
        component: ApplicationsComponent,
        title: 'My Applications'
    }
]