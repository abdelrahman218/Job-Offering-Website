import { Component, inject } from '@angular/core';
import { UserRecommendComponent } from "./user-recommend/user-recommend.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UserRecommendComponent, UserProfileComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

}