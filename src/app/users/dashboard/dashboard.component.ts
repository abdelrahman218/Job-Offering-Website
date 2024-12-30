//Angular Imports
import { Component } from '@angular/core';

//Components
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { TileComponent } from "../shared/tile/tile.component";
import { CurrentApplicationComponent } from "./current-application/current-application.component";
import { UserSkillsComponent } from "./user-skills/user-skills.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ UserProfileComponent, TileComponent, CurrentApplicationComponent, UserSkillsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

}