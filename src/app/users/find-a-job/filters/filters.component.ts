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
  experience= true;
  location= true;
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

  data: string | null = null;

  toggleDisplay(groupName: string) {
    this.data = this.data === groupName ? null : groupName;
  }
}