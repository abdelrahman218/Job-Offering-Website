import { Component, Output, Input} from '@angular/core';
import { CareerLevelType } from '../../../app.model';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
   isWorkplaceDisplayed= true;
   isExperienceDisplayed= true;
   isLocationDisplayed= true;
   // Available options for each section (you can later fetch these from an API)
   workplaceOptions = [
      'Remote',
      'On-site',
      'Hybrid'
   ];
 
   experienceOptions = [
     'entry-level',
     'expertised-level',
     'senior-manager',
     'Internship'
   ];
 
   locationOptions = [
     'Cairo',
     'Alexandria',
     'Giza',
     'Sharm El Sheikh',
     'Hurghada',
     'Aswan'
   ];

   // Toggle display for each section
   toggleDisplay(section: string): void {
     switch(section) {
       case 'workplace':
         this.isWorkplaceDisplayed = !this.isWorkplaceDisplayed;
         break;
       case 'experience':
         this.isExperienceDisplayed = !this.isExperienceDisplayed;
         break;
       case 'location':
         this.isLocationDisplayed = !this.isLocationDisplayed;
         break;
     }
   }

   openCategoryDropdown(categoryId: string) {
    // Logic to open category dropdown
    const categoryDropdown = document.getElementById(categoryId);
    categoryDropdown?.click(); // or however you open the dropdown
  }

  checkCategoryCheckbox(categoryName: string) {
    // Find and check the checkbox with matching category ID
    const checkbox = document.querySelector(`input[value="${categoryName}"]`) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = true;
      // Trigger change event if needed
      checkbox.dispatchEvent(new Event('change'));
    }
  }
}