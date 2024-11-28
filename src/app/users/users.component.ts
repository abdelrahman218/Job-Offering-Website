import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './users.service';
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { LogoutDialogComponent } from "./logout-dialog/logout-dialog.component";
import { AddSkillComponent } from "./add-skill/add-skill.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterOutlet, EditProfileComponent, LogoutDialogComponent, AddSkillComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
 private userService=inject(UserService);
 state=this.userService.state; 
}