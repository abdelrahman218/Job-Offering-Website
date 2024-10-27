import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { CommonModule } from '@angular/common';
import { posts } from './posts.model';
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  jobPosts: posts[] = [];

  constructor(private companyService: CompaniesService) { }

  ngOnInit(): void {
    this.companyService.jobPosts$.subscribe(posts => {
      this.jobPosts = posts;
      console.log("Updated Job Posts:", this.jobPosts);
    });
  }
  Delete(id:number){
this.companyService.deletePost(id);
  }
}
