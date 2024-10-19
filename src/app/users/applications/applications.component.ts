import { Component, inject } from '@angular/core';
import { UserService } from '../users.service';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent {
  private userService=inject(UserService);
  applications=this.userService.getUser().applications;
}