import { Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './post/posts/posts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CompanyRegistrationComponent} from './company-registration/company-registration.component' ;
export const companyRoutes: Routes =[{
    path: 'post',
    component: PostComponent,
    title: 'Post'
},
{
    path:'post/posts',
    component:PostsComponent,
    title:'Posts'
},
{ path: 'post/edit/:postId', component: PostComponent ,title:'Edit Post'},
{
    path:'dashboard',
    component:DashboardComponent,
    title:"Dashboard"
}
]
