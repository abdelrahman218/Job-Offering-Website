import { Component } from '@angular/core';
import { FiltersComponent } from './filters/filters.component';
@Component({
  selector: 'app-find-a-job',
  standalone: true,
  imports: [FiltersComponent],
  templateUrl: './find-a-job.component.html',
  styleUrl: './find-a-job.component.css'
})
export class FindAJobComponent {
  isVisible=false;

  OnToggle(){
    this.isVisible=!this.isVisible;
  }
}
