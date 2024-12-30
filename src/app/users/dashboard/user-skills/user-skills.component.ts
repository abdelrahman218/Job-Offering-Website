//Angular Imports
import { Component, inject , computed} from '@angular/core';
import { RouterLink } from '@angular/router';

//Components
import { ButtonComponent } from '../../shared/button/button.component';

//Services
import { UserService } from '../../users.service';

@Component({
  selector: 'app-user-skills',
  standalone: true,
  imports: [RouterLink,ButtonComponent],
  templateUrl: './user-skills.component.html',
  styleUrl: './user-skills.component.css'
})

export class UserSkillsComponent {
  private usersService = inject(UserService);

  userSkills = computed(()=>this.usersService.user().skills);

  addSkill(){
    this.usersService.addSkillTab();
  }
  removeSkill(skill: string){
    this.usersService.removeSkill(skill);
  }
}