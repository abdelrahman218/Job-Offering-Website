import { Component, inject, signal, Signal  } from '@angular/core';
import { FiltersComponent } from './filters/filters.component';
import { CardComponent } from './card/card.component';
import { UserType } from '../../app.model';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-find-a-job',
  standalone: true,
  imports: [FiltersComponent,CardComponent],
  templateUrl: './find-a-job.component.html',
  styleUrl: './find-a-job.component.css'
})
export class FindAJobComponent {
  private appService=inject(AppService);
  isVisible=false;

  OnToggle(){
    this.isVisible=!this.isVisible;
  }
  userType=this.appService.userTypeSinal.asReadonly();
}