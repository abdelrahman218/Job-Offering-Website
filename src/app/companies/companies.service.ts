import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { posts } from '../app.model';  

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private jobPostsSubject = new BehaviorSubject<posts[]>([]); 
  jobPosts$ = this.jobPostsSubject.asObservable();  
  private apiUrl = 'http://localhost:8080/company';  

  constructor(private http: HttpClient) {
    this.loadJobPosts();
  }

  // Load job posts from the backend
  loadJobPosts() {
    this.http.get<posts[]>(`${this.apiUrl}/getPosts`).subscribe(posts => {
      this.jobPostsSubject.next(posts);
    });
  }

  // Method to add a new job post
  addPost(newPost: posts) {
    this.http.post<posts>(`${this.apiUrl}/addPost`, newPost).subscribe(post => {
      const updatedPosts = [...this.jobPostsSubject.getValue(), post];
      this.jobPostsSubject.next(updatedPosts); 
    });
  }

  // Method to delete a job post by id
  deletePost(id: string) {
    this.http.delete(`${this.apiUrl}/deletePost/${id}`).subscribe(() => {
      const updatedPosts = this.jobPostsSubject.getValue().filter(post => post.id !== id);
      this.jobPostsSubject.next(updatedPosts);
    });
  }
   // Edit an existing job post by ID
   editPost(updatedPost: posts, id: string) {
    this.http.put<posts>(`${this.apiUrl}editPost/${id}`, updatedPost).subscribe((post) => {
      const currentPosts = this.jobPostsSubject.getValue();
      const updatedPosts = currentPosts.map((p) => (p.id === id ? post : p)); 
      this.jobPostsSubject.next(updatedPosts);
    });
  }
}
