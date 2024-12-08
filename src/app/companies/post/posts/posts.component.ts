import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../companies.service';
import { CommonModule } from '@angular/common';
import { posts } from '../../../app.model';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  jobPosts: posts[] = [];

  constructor(private companyService: CompaniesService) {}

  ngOnInit(): void {
    this.companyService.jobPosts$.subscribe(posts => {
      this.jobPosts = posts; 
    });
    const companyEmail=this.companyService.getCurrentCompany().User.Email;
    this.companyService.getPosts(companyEmail);
  }

  delete(id: number) {
    // Call CompaniesService to delete the post by id
    this.companyService.deletePost(id);
  }
}
