import { Component, inject , computed} from '@angular/core';
import { CardComponent } from "../../shared/card/card.component";
import { ApplicationComponent } from "../../applications/application/application.component";
import { UserService } from '../../users.service';

@Component({
  selector: 'app-current-application',
  standalone: true,
  imports: [CardComponent, ApplicationComponent],
  templateUrl: './current-application.component.html',
  styleUrl: './current-application.component.css'
})
export class CurrentApplicationComponent {
  private userService=inject(UserService);
  applications=computed(()=>this.userService.user().applications);
}