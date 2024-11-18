import { Injectable } from '@angular/core';
import { posts } from '../app.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private jobPosts: posts[] = [];
  private storageKey = 'jobPosts';
  
  private jobPostsSubject = new BehaviorSubject<any[]>(this.loadPosts());
  jobPosts$ = this.jobPostsSubject.asObservable();

  private loadPosts(): any[] {
    return JSON.parse(localStorage.getItem('jobPosts') || '[]');
  }
  addPost(post: any) {
    const existingPosts = this.loadPosts();
    existingPosts.push(post);
    localStorage.setItem('jobPosts', JSON.stringify(existingPosts));
    this.jobPostsSubject.next(existingPosts); 
  }
  editPost(updatedPost: any, index: number) {
    const existingPosts = this.loadPosts();
    existingPosts[index] = updatedPost; 
    localStorage.setItem(this.storageKey, JSON.stringify(existingPosts));
    this.jobPostsSubject.next(existingPosts); 
  }

  deletePost(index: number) {
    const existingPosts = this.loadPosts();
    existingPosts.splice(index, 1); 
    localStorage.setItem(this.storageKey, JSON.stringify(existingPosts));
    this.jobPostsSubject.next(existingPosts);
  }
  getJobPosts(): posts[] {
    return this.jobPosts;
  }
}