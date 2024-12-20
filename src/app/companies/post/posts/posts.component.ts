import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../companies.service';
import { CommonModule } from '@angular/common';
import { posts } from '../../../app.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  jobPosts: posts[] = [];
  showDeleteConfirmation = false;
  postToDelete: any;
  constructor(private companyService: CompaniesService,private router: Router) {}

  async ngOnInit():Promise<void>  {
    this.companyService.jobPosts$.subscribe(posts => {
      this.jobPosts = posts; 
    });
    const companyEmail=this.companyService.getCurrentCompany().User.Email;
    const job=this.companyService.getPosts(companyEmail);
    this.companyService.getCurrentCompany().User.jobs.push(job);
    console.log("job",job);
    console.log(companyEmail);
    this.companyService.getPosts(companyEmail);
  }

  confirmDelete(postId: number) {
    this.showDeleteConfirmation = true;
    this.postToDelete = postId;
  }

  delete(postId: number) {
    this.companyService.deletePost(postId);
    this.showDeleteConfirmation = false; 
  }

  cancelDelete() {
    this.showDeleteConfirmation = false; 
  }


  edit(postId: number) {
    this.router.navigate(['company/post/edit',postId]); // Assuming there's an edit-post route
  }
}
