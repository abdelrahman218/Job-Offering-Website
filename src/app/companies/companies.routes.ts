import { Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './post/posts/posts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
{
    path:'dashboard',
    component:DashboardComponent,
    title:"Dashboard"
}
]
