import { Component, signal, Signal  } from '@angular/core';
import { FiltersComponent } from './filters/filters.component';
import { CardComponent } from './card/card.component';
import { UserType } from '../../app.model';
@Component({
  selector: 'app-find-a-job',
  standalone: true,
  imports: [FiltersComponent,CardComponent],
  templateUrl: './find-a-job.component.html',
  styleUrl: './find-a-job.component.css'
})
export class FindAJobComponent {
  isVisible=false;

  OnToggle(){
    this.isVisible=!this.isVisible;
  }
  private userTypeSinal=signal<UserType>(undefined);
  userType=this.userTypeSinal.asReadonly();
}
