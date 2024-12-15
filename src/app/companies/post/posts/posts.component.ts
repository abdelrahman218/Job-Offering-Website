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

  async ngOnInit():Promise<void>  {
      const title=await this.companyService.getJobTitle(1734024201086);
      const Name=await this.companyService.getCompanyName("techCorp@gmail.com");
      const Logo=await this.companyService.getCompanyLogo("techCorp@gmail.com");
      console.log("Logo",Logo);
      console.log("Name",Name);
      console.log("title",title);
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
