import { Component, OnInit } from '@angular/core';
import { Dropdown } from 'bootstrap';
import { CompaniesService } from '../companies.service';
import { CommonModule } from '@angular/common';
import { RouterLink,  Router } from '@angular/router';
import { newCompany } from '../dummy-companies';
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
  companies: Company[] = newCompany;
  showDet() {
    document.getElementById("p1")!.style.display = "block";
    document.getElementById("p2")!.style.display = "block";
    document.getElementById("b1")!.style.display = "none";
  }
  constructor(private companiesService: CompaniesService, private router: Router) {}

  ngOnInit() {
    this.companiesService.jobPosts$.subscribe(posts => {
      this.jobPosts = posts; 
    });
    this.companiesService.getPosts();
  }

  ngAfterViewInit(): void {
    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownElementList.map(function (dropdownToggleEl) {
      return new Dropdown(dropdownToggleEl);
    });
  }

  show() {
    this.router.navigate(['company/post']);
  }
}
