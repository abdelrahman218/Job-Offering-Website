import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,lastValueFrom } from 'rxjs';
import { Company, posts } from '../app.model';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private jobPostsSubject = new BehaviorSubject<posts[]>([]);
  public jobPosts$ = this.jobPostsSubject.asObservable();
  private apiUrl = 'http://localhost:8080/company';

  constructor(private http: HttpClient) {
   
  }

  // Load job posts from the backend
  loadJobPosts() {
    this.http.get<posts[]>(`${this.apiUrl}/getPosts`).subscribe(posts => {
      this.jobPostsSubject.next(posts);
    });
  }
  //Method to get Posts by companyEmail
  getPosts(companyEmail:string):any{
     if (companyEmail) {
      this.http.get<posts[]>(`${this.apiUrl}/getPostsByCompanyEmail/${companyEmail}`).subscribe(posts => {
        this.jobPostsSubject.next(posts);
      });
    } else {
      console.error('No company email found');
    }
  }
  // Method to add a new job post
  addPost(newPost: posts) {
    this.http.post<posts>(`${this.apiUrl}/addPost`, newPost).subscribe(post => {
      const updatedPosts = [...this.jobPostsSubject.getValue(), post];
      this.jobPostsSubject.next(updatedPosts);
    });
  }
  // Method to add Company Login

  login(credentials: { Email: string, Password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response: any) => {
          if (response.UserType === 'Company') {
            localStorage.setItem('company', JSON.stringify(response));
            localStorage.setItem('userType', response.UserType);
          }
        })
      );
  }

  //Method to add Company logout
  logout() {
    localStorage.removeItem('company');
    localStorage.removeItem('userType');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('userType') === 'Company';
  }

  getCurrentCompany(): Company  {
    const company = localStorage.getItem('company');
    return company ? JSON.parse(company) : null;
  }
  // Method to delete a job post by id
  deletePost(id: number) {
    this.http.delete(`${this.apiUrl}/deletePost/${id}`).subscribe(() => {
      const updatedPosts = this.jobPostsSubject.getValue().filter(post => post.id !== id);
      this.jobPostsSubject.next(updatedPosts);
    });
  }
  getPostById(id: number) {
    return this.http.get<posts>(`${this.apiUrl}/getPostById/${id}`);
  }
  // Edit an existing job post by ID
  editPost(updatedPost: posts, id: number) {
    this.http.put<posts>(`${this.apiUrl}/editPost/${id}`, updatedPost).subscribe((post) => {
      const currentPosts = this.jobPostsSubject.getValue();
      const updatedPosts = currentPosts.map((p) => (p.id === id ? post : p));
      this.jobPostsSubject.next(updatedPosts);
    });
  }
    // Method to get Company Name by Email
  async getCompanyName(companyEmail: string): Promise<string | undefined> {
    try {
      const response = await lastValueFrom(
        this.http.get<{ companyName: string }>(`${this.apiUrl}/getName/${companyEmail}`)
      );
      return response?.companyName;  // Use optional chaining to handle undefined
    } catch (error) {
      console.error('Error fetching company name:', error);
      return undefined;
    }
  }
 // Method to get Company Logo by Email
 async getCompanyLogo(companyEmail: string): Promise<string | undefined> {
  try {
    const response = await lastValueFrom(
      this.http.get<{ logo: string }>(`${this.apiUrl}/getLogo/${companyEmail}`)
    );
    return response?.logo;  // Use optional chaining to handle undefined
  } catch (error) {
    console.error('Error fetching company logo:', error);
    return undefined;
  }
}

// Method to get Job Title by Post ID
async getJobTitle(postId: number): Promise<string | undefined> {
  if (!postId) {
    throw new Error('Invalid Post ID');
  }
  try {
    const response = await lastValueFrom(
      this.http.get<{ jobTitle: string }>(`${this.apiUrl}/posts/getJobTitle/${postId}`)
    );
    return response?.jobTitle;  // Use optional chaining to handle undefined
  } catch (error) {
    console.error('Error fetching job title:', error);
    return undefined;
  }
}
}
