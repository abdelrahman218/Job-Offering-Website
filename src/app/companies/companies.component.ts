import { Component, OnInit } from '@angular/core';
import { Dropdown } from 'bootstrap';
import { RouterLink, RouterOutlet, NavigationEnd,Router,Event } from '@angular/router';
import { CompaniesService } from './services/companies.service';
import { Company } from './companies.model';
import { CommonModule } from '@angular/common';
import { newCompany } from './dummy-companies';
import { Location } from '@angular/common';
@Component({
  selector: 'app-company',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  isPostComponentVisible = false;
  companies: Company[] = newCompany;
  constructor(private companiesService: CompaniesService,private router: Router, private location: Location) { }
  ngOnInit(){
   this.companiesService.getJobPosts();
   this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      if (this.location.path() === '/company/post' ||this.location.path() === '/company/post/posts' ) {
        this.isPostComponentVisible = true;
      } else {
        this.isPostComponentVisible = false;
      }
    }
  });
  }
  showPostComponent() {
    if(this.isPostComponentVisible==false){
    this.isPostComponentVisible = true;
    }else{
      this.isPostComponentVisible=false;
    }
  }
  companyName: string = "Amazon";
  ngAfterViewInit(): void {
    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownElementList.map(function (dropdownToggleEl) {
      return new Dropdown(dropdownToggleEl);
    });
  }
}
