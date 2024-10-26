import { Component, inject } from '@angular/core';
import { UserRecommendComponent } from "./user-recommend/user-recommend.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { TileComponent } from "../shared/tile/tile.component";
import { CurrentApplicationComponent } from "./current-application/current-application.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UserRecommendComponent, UserProfileComponent, TileComponent, CurrentApplicationComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

}