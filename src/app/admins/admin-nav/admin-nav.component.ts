import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouterLink, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) { }

  ngOnInit() {
    // Subscribe to router events to update icon highlighting on navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) { 
        this.highlightIconBasedOnUrl(); 
      }
    });
  }

  ngAfterViewInit() {
    this.highlightIconBasedOnUrl();
  }

  private highlightIconBasedOnUrl(): void {
    let targetIcon: HTMLElement | null = null;
    const currentUrl = this.router.url;

    const allSvgIcons = document.querySelectorAll('.personIcon, .companyIcon, .homeIcon, .superAdminIcon');

    allSvgIcons.forEach((icon: any) => {
      const path = icon.querySelector('path');
      if (path) {
        path.setAttribute('fill', '#dedada');
        (icon as HTMLElement).style.backgroundColor = 'transparent';
      }
    });

    if (currentUrl.includes('job-seeker')) {
      targetIcon = document.querySelector('.personIcon') as HTMLElement;
    } else if (currentUrl.includes('job-lister')) {
      targetIcon = document.querySelector('.companyIcon') as HTMLElement;
    } else if (currentUrl.includes('dashboard')) {
      targetIcon = document.querySelector('.homeIcon') as HTMLElement;
    } else if (currentUrl.includes('super-admin')) {
      targetIcon = document.querySelector('.superAdminIcon') as HTMLElement;
    }

    if (targetIcon) {
      const path = targetIcon.querySelector('path');
      if (path) {
        path.setAttribute('fill', '#2F4157');
      }
      targetIcon.style.backgroundColor = '#DADDD9';
    }
  }
}