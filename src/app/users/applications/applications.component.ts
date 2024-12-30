//Angular Imports
import { Component, inject, OnInit , Signal ,computed} from '@angular/core';

//Components
import { ApplicationComponent } from './application/application.component';
import { CardComponent } from "../shared/card/card.component";

//Services
import { UserService } from '../users.service';

//Models
import { type ApplicationType as Application} from '../../app.model';

type ToggleType = 'active' | 'archived';
@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [ApplicationComponent, CardComponent],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css',
})
export class ApplicationsComponent implements OnInit{
  private toggle!: ToggleType;
  private userService = inject(UserService);
  applications!: Signal<Application[]>;
  ngOnInit(): void {
    this.switchTo('active');
  }
  
  switchTo(target: ToggleType) {
    switch (target) {
      case 'active':
        this.applications = computed(()=>this.userService.applications().filter(
          (app) => app.state === 'Submitted' || app.state === 'In Review'
        )); 
        break;
      case 'archived':
        this.applications = computed(()=>this.userService.applications().filter(
          (app) => app.state === 'Accepted' || app.state === 'Rejected'
        ));
        break;
    }
    this.toggle = target;
  }
  get currentMenu() {
    return this.toggle;
  }
}