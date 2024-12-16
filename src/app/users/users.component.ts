//Angular Imports
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//Components
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { AddSkillComponent } from "./add-skill/add-skill.component";

//Services
import { UserService } from './users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterOutlet, EditProfileComponent, AddSkillComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent {
 private userService=inject(UserService);
 state=this.userService.state; 
}