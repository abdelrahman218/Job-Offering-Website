import { Component, OnInit } from '@angular/core';
import { Dropdown } from 'bootstrap';
import { CompaniesService } from '../companies.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { newCompany } from '../dummy-companies';
import { Company, posts } from '../../app.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
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
    // Listen to the jobPosts signal from the CompaniesService
    this.companiesService.jobPosts$.subscribe(posts => {
      this.jobPosts = posts;
      console.log("Updated Job Posts:", this.jobPosts);
    });
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
