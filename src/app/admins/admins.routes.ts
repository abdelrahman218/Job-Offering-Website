import { Routes } from '@angular/router';
import { JobListerComponent } from './job-lister/job-lister.component';
import { JobSeekerComponent } from './job-seeker/job-seeker.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';

export const adminRoutes: Routes =[
    { path: "", redirectTo: "dashboard", pathMatch: "full"},
    { path: 'dashboard', component: DashboardComponent, title: "Admin Dashboard" }, // Route for job listers
    { path: 'job-seeker', component: JobSeekerComponent, title: "Job Seekers View"}, // Route for job seekers
    { path: 'job-lister', component: JobListerComponent, title: "Job Listers View" }, // Route for job listers
    { path: 'super-admin', component: SuperAdminComponent, title: "Super Admin View" } // Route for job listers
]