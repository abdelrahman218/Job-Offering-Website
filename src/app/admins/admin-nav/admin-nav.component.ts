import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  constructor(private router: Router){}

  // On component initialization, highlight the correct icon based on the current URL
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.highlightIconBasedOnUrl();
    });
  }

  // A method to highlight the correct icon based on the current URL
  private highlightIconBasedOnUrl(): void {
    let targetIcon: HTMLElement | null = null;
    const currentUrl = this.router.url;

    // Get all SVG elements with the class 'personIcon', 'companyIcon', and 'homeIcon'
    const allSvgIcons = document.querySelectorAll('.personIcon, .companyIcon, .homeIcon, .superAdminIcon');
    
    // Reset all icons to the original fill and background color
    allSvgIcons.forEach((icon: any) => {
      const path = icon.querySelector('path'); // The path inside the SVG
      if (path) { // Null check for 'path'
        path.setAttribute('fill', '#dedada'); // Reset to original icon color
        (icon as HTMLElement).style.backgroundColor = 'transparent'; // Reset background color
      }
    });

    // Determine which icon to highlight based on the current URL
    if (currentUrl.includes('job-seeker')) {
      targetIcon = document.querySelector('.personIcon') as HTMLElement;
    } else if (currentUrl.includes('job-lister')) {
      targetIcon = document.querySelector('.companyIcon') as HTMLElement;
    } else if (currentUrl.includes('dashboard')) {
      targetIcon = document.querySelector('.homeIcon') as HTMLElement;
    }else if (currentUrl.includes('super-admin')) {
      targetIcon = document.querySelector('.superAdminIcon') as HTMLElement;
    }

    if (targetIcon) {
      const path = targetIcon.querySelector('path');
      if (path) { // Null check for 'path'
        path.setAttribute('fill', '#2F4157'); // Dark blue color for the icon
      }
      targetIcon.style.backgroundColor = '#DADDD9'; // Light background color
    }
  }
}