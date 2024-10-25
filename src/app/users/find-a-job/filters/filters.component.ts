import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  isRotated = false;
  isDisplayed = true;

  rotate() {
    this.isRotated = !this.isRotated;
  }
  displayit(){
    this.isDisplayed=!this.isDisplayed;
  }
}
