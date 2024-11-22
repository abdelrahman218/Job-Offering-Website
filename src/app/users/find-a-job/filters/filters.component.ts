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
  workplace= true;
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
         this.workplace = !this.workplace;
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
    const categoryDropdown = document.getElementById(categoryId);
    categoryDropdown?.click();
  }

  checkCategoryCheckbox(categoryName: string) {
    const checkbox = document.querySelector(`input[value="${categoryName}"]`) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change'));
    }
  }

  filterGroups = [
    {
      name: 'workplace',
      options: ['Remote', 'Hybrid', 'On-site'],
      isOpen: false
    },
    {
      name: 'location',
      options: ['Cairo','Alexandria','Giza','Sharm El Sheikh','Hurghada','Aswan'],
      isOpen: false
    },
    {
      name: 'experience',
      options: ['Entry-level', 'Mid-level', 'Senior'],
      isOpen: false
    }
  ];
  selectedFilters: { [key: string]: string[] } = {
    'workplace': [],
    'location': [],
    'experience': []
  };


}