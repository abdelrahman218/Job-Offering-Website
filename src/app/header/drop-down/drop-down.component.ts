//Angular Imports
import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';

//Services
import { UserService } from '../../users/users.service';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.css'
})

export class DropDownComponent {
  private appService=inject(AppService);
  private userService=inject(UserService);
  OnSelect=output<void>();
  editProfile(){
    this.OnSelect.emit();
    this.userService.editProfileTab();
  }
  logout(){
    this.OnSelect.emit();
    this.appService.logout();
  }
}