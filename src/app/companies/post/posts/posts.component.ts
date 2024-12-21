import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../companies.service';
import { CommonModule } from '@angular/common';
import { posts,Application,ApplicationStateType } from '../../../app.model';
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
  selectedPostApplications: Application[] = [];
  showDeleteConfirmation = false;
  showApplicationsPopup = false;
  selectedPost: number | null = null;
  postToDelete: number | null = null;
  constructor(private companyService: CompaniesService,private router: Router) {}

  async ngOnInit():Promise<void>  {
    this.companyService.jobPosts$.subscribe(posts => {
      this.jobPosts = posts; 
    });
    const companyEmail=this.companyService.getCurrentCompany().User.Email;
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
   // Fetch and display applications for a selected job post
   viewApplications(postId: number) {
    this.selectedPost = postId;
    this.companyService.getApplicationsByPost(postId).subscribe((applications: Application[]) => {
      console.log('Applications received:', applications);
      this.selectedPostApplications = applications;
      this.showApplicationsPopup = true;
    });
  }

  // Close the applications popup
  closeApplicationsPopup() {
    this.showApplicationsPopup = false;
    this.selectedPostApplications = [];
  }

  // Update the state of an application
  updateApplicationState(application: Application, newState: ApplicationStateType,postId:any) {
    this.selectedPost = postId;
    const updatedApp = {
      Applicant:application.Applicant ,  
      Post: postId,
      State: newState  // This will be 'Accepted', 'Rejected', etc.
    };
    this.companyService.updateApplicationState(updatedApp,postId).subscribe(() => {
      // Update the application state locally
      const appIndex = this.selectedPostApplications.findIndex(app => app === application);
      if (appIndex > -1) {
        this.selectedPostApplications[appIndex].State = newState;
      }
    });
    console.log(this.selectedPostApplications);
  }

  // View CV for an application
  viewApplicantCV(application: Application) {
    this.router.navigate(['company/application/cv', application.Post]); 
  }
}