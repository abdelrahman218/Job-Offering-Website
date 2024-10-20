import { Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './post/posts/posts.component';
export const companyRoutes: Routes =[{
    path: 'post',
    component: PostComponent,
    title: 'Post'
},
{
    path:'post/posts',
    component:PostsComponent,
    title:'Posts'
}]
