import { Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './post/posts/posts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
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
{path:"edit-profile",component:EditProfileComponent,title:'Edit Profile'},
{
    path:'dashboard',
    component:DashboardComponent,
    title:"Dashboard"
}
]
