import { Component, OnInit } from '@angular/core';
import { Dropdown } from 'bootstrap';
import { CompaniesService } from '../companies.service';
import { CommonModule } from '@angular/common';
import { RouterLink,  Router } from '@angular/router';
import { Company, posts } from '../../app.model';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  jobPosts: posts[] = [];
  companies!: Company;
  showDet() {
    document.getElementById("p1")!.style.display = "block";
    document.getElementById("p2")!.style.display = "block";
    document.getElementById("b1")!.style.display = "none";
  }
  constructor(private companiesService: CompaniesService, private router: Router) {}
  get companylogoPath(){
    return this.companiesService.apiUrl+'/getLogo?email='+this.companiesService.getCurrentCompany().User.Email;
  }
  ngOnInit() {
    this.companiesService.jobPosts$.subscribe(posts => {
      this.jobPosts = posts; 
    });
    const companyEmail=this.companiesService.getCurrentCompany().User.Email;
    this.companiesService.getPosts(companyEmail);
      this.companies={UserType:this.companiesService.getCurrentCompany().UserType,User:{
      id:this.companiesService.getCurrentCompany().User.id,
      Email:this.companiesService.getCurrentCompany().User.Email,
      name:this.companiesService.getCurrentCompany().User.name,
      industry:this.companiesService.getCurrentCompany().User.industry,
      location:this.companiesService.getCurrentCompany().User.location,
      description:this.companiesService.getCurrentCompany().User.description,
      Password:this.companiesService.getCurrentCompany().User.Password,
      logo:this.companiesService.getCurrentCompany().User.logo
    }

    };
    console.log(this.companies);
  }

  ngAfterViewInit(): void {
    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownElementList.map(function (dropdownToggleEl) {
      return new Dropdown(dropdownToggleEl);
    });
  }
  get hasNoPostsForCurrentCompany(): boolean {
    return this.jobPosts?.length === 0 || !this.jobPosts.some(post => post.companyEmail === this.companies?.User?.Email);
  } 
  show() {
    this.router.navigate(['company/post']);
  }
}
