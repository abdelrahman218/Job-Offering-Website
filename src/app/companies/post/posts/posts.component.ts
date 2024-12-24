import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../companies.service';
import { CommonModule } from '@angular/common';
import { posts, Application, ApplicationStateType } from '../../../app.model';
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
  showNoApplicationsPopup = false;
  selectedPost: number | null = null;
  postToDelete: any;
  currentApplicationPage = 0;
  applicationsPerPage = 1;
  totalPages: number = 0;
  constructor(private companyService: CompaniesService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.companyService.jobPosts$.subscribe(posts => {
      this.jobPosts = posts;
    });
    const companyEmail = this.companyService.getCurrentCompany().User.Email;
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
  isNumber(val: any): boolean {
    return typeof val === 'number';
  }

  getPageNumber(page: number | string): number {
    return page as number;
  }

  getVisiblePageNumbers(): (number | string)[] {
    const maxVisiblePages = 7;
    const pages: (number | string)[] = [];

    if (this.totalPages <= maxVisiblePages) {
      return Array.from({ length: this.totalPages }, (_, i) => i);
    }

    pages.push(0);

    if (this.currentApplicationPage > 2) {
      pages.push('...');
    }

    let start = Math.max(1, this.currentApplicationPage - 1);
    let end = Math.min(this.currentApplicationPage + 1, this.totalPages - 2);

    if (this.currentApplicationPage <= 2) {
      end = 3;
    }

    if (this.currentApplicationPage >= this.totalPages - 3) {
      start = this.totalPages - 4;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (this.currentApplicationPage < this.totalPages - 3) {
      pages.push('...');
    }

    pages.push(this.totalPages - 1);

    return pages;
  }
  // Generate page numbers based on the number of applications
  getApplicationPageNumbers(applications: Application[]): number[] {
    this.totalPages = Math.ceil(applications.length / this.applicationsPerPage);
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }


  getCurrentPageApplications(): Application[] {
    const startIndex = this.currentApplicationPage * this.applicationsPerPage;
    const endIndex = startIndex + this.applicationsPerPage;
    return this.selectedPostApplications.slice(startIndex, endIndex);
  }

  setCurrentApplicationPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentApplicationPage = page;
    }
  }

  edit(postId: number) {
    this.router.navigate(['company/post/edit', postId]); // Assuming there's an edit-post route
  }
  // Fetch and display applications for a selected job post
  viewApplications(postId: number) {
    this.selectedPost = postId;
    this.companyService.getApplicationsByPost(postId).subscribe((applications: Application[]) => {
      console.log('Applications received:', applications);
      this.selectedPostApplications = applications;
      this.totalPages = Math.ceil(applications.length / this.applicationsPerPage);
      this.currentApplicationPage = 0;
      this.showApplicationsPopup = true;
    },
      (error: any) => {
        if (error.status === 404) {
          console.log("Nooooooo");
          // Handle 'No applications found' scenario
          this.showNoApplicationsPopup = true;
          setTimeout(() => {
            this.showNoApplicationsPopup = false;
          }, 2000);
        } else {
          console.error('Error fetching applications:', error.message);
        }
      }
    );
  }


  // Close the applications popup
  closeApplicationsPopup() {
    this.showApplicationsPopup = false;
    this.selectedPostApplications = [];
  }

  // Update the state of an application
  updateApplicationState(application: Application, newState: ApplicationStateType, postId: any) {
    this.selectedPost = postId;
    const updatedApp = {
      Applicant: application.Applicant,
      Post: postId,
      State: newState  // This will be 'Accepted', 'Rejected', etc.
    };
    this.companyService.updateApplicationState(updatedApp, postId).subscribe(() => {
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