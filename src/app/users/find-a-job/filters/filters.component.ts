import { Component, Output,EventEmitter} from '@angular/core';
@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent{
  @Output() selectedFilter=new EventEmitter<{ [key: string]: string[] }>();
  isDisplayed: any[]= [true,true,true];
  toggleDisplay(section: string): void {
    switch(section) {
      case 'workplace':
        this.isDisplayed[0] = !this.isDisplayed[0];
        break;
      case 'careerLevel':
        this.isDisplayed[1] = !this.isDisplayed[1];
        break;
      case 'location':
        this.isDisplayed[2] = !this.isDisplayed[2];
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
    id: 0,
    name: 'workplace',
    options: ['Remote', 'Hybrid', 'On-site'],
    isOpen: false
  },
  {
    id: 2,
    name: 'location',
    options: ['Cairo','Alexandria','Giza','Sharm El Sheikh','Hurghada','Aswan'],
    isOpen: false
  },
  {
    id: 1,
    name: 'careerLevel',
    options: ['entry-level', 'expertised-level', 'senior-manager'],
    isOpen: false
  }
];
selectedFilters: { [key: string]: string[] } = {
  'workplace': [],
  'location': [],
  'careerLevel': []
};
isFilterSelected(filterName: string, option: string): boolean {
  return this.selectedFilters[filterName].includes(option);
}
toggleFilter(filterName: string, option: string): void {
  if (this.isFilterSelected(filterName, option)) {
    this.selectedFilters[filterName] = this.selectedFilters[filterName]
      .filter(item => item !== option);
  } else {
    this.selectedFilters[filterName].push(option);
  }
  console.log(this.selectedFilters);
  this.selectedFilter.emit(this.selectedFilters);
}
}