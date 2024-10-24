import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { ApplicationComponent } from './application/application.component';
import { type ApplicationType as Application} from '../../app.model';
import { CardComponent } from "../shared/card/card.component";

type ToggleType = 'active' | 'archived';
@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [ApplicationComponent, CardComponent],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css',
})
export class ApplicationsComponent implements OnInit {
  private toggle!: ToggleType;
  private userService = inject(UserService);
  applications!: Application[];
  ngOnInit(): void {
    this.switchTo('active');
  }

  switchTo(target: ToggleType) {
    switch (target) {
      case 'active':
        this.applications = this.userService
          .getUser()
          .applications.filter(
            (app) => app.state === 'Submitted' || app.state === 'In Review'
          );
        break;
      case 'archived':
        this.applications = this.userService
          .getUser()
          .applications.filter(
            (app) => app.state === 'Accepted' || app.state === 'Rejected'
          );
        break;
      default:
        this.applications = this.userService.getUser().applications;
    }
    this.toggle = target;
  }
  get currentMenu() {
    return this.toggle;
  }
}
