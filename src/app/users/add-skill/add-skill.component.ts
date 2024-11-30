import { Component, inject, signal } from '@angular/core';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/button/button.component';
import { UserService } from '../users.service';

@Component({
  selector: 'app-add-skill',
  standalone: true,
  imports: [DialogComponent,FormsModule,ButtonComponent],
  templateUrl: './add-skill.component.html',
  styleUrl: './add-skill.component.css'
})
export class AddSkillComponent {
  private userService=inject(UserService);
  isRequired=signal<boolean>(false);
  skill :string ='';
  addSkill(){
    if(this.skill){
      this.userService.closeTab();
      this.userService.addSkill(this.skill);
    }else{
      this.isRequired.set(true);
    }
  }
  closeDialog(){
    this.userService.closeTab();
  }
}