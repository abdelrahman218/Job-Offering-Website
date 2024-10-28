import { Component } from '@angular/core';
import { Dropdown } from 'bootstrap';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent {
  isPostComponentVisible = false;

  showPostComponent() {
    this.isPostComponentVisible = true;
  }

  hidePostComponent() {
    this.isPostComponentVisible = false;
  }
  companyName: string="Amazon";
  ngAfterViewInit(): void {
    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownElementList.map(function (dropdownToggleEl) {
      return new Dropdown(dropdownToggleEl);  
    });
  }


}
