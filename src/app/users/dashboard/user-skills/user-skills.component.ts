import { Component, inject } from '@angular/core';
import { UserService } from '../../users.service';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-user-skills',
  standalone: true,
  imports: [RouterLink,ButtonComponent],
  templateUrl: './user-skills.component.html',
  styleUrl: './user-skills.component.css'
})
export class UserSkillsComponent {
  private usersService = inject(UserService);

  userSkills = this.usersService.getUser().skills;
}