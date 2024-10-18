import { Component } from '@angular/core';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [],
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent {

  navToggle(e: any) {
    // Get all SVG elements with the class 'personIcon', 'companyIcon', and 'homeIcon' in the container
    const allSvgIcons = document.querySelectorAll('.personIcon, .companyIcon, .homeIcon');

    // Reset all icons to the original fill and background color
    allSvgIcons.forEach((icon: any) => {
      const path = icon.querySelector('path'); // The path inside the SVG
      path.setAttribute('fill', '#dedada'); // Reset to original icon color
      icon.style.backgroundColor = 'transparent'; // Reset background color
    });

    // Apply the new color to the clicked icon
    const svgIcon = e.currentTarget; // The whole SVG element
    const path = svgIcon.querySelector('path'); // The path inside the SVG

    // Change the clicked icon color
    path.setAttribute('fill', '#2F4157'); // Dark blue color for the icon

    // Apply background color to the clicked SVG container
    svgIcon.style.backgroundColor = '#DADDD9'; // Light background color

    // Find the title element
    const titleElement: any = document.querySelector('.title');

    // Check the class of the clicked icon and update the title text accordingly
    if (svgIcon.classList.contains('companyIcon')) {
      console.log("Job Listers View");
      titleElement.textContent = "Job Listers View"; // Update the title text
    } else if (svgIcon.classList.contains('personIcon')) {
      console.log("Job Seekers View");
      titleElement.textContent = "Job Seekers View"; // Update the title text
    } else if (svgIcon.classList.contains('homeIcon')) {
      console.log("Welcome to Dashboard.");
      titleElement.textContent = "Welcome to Dashboard."; // Update the title text
    }
  }
}
