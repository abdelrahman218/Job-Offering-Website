//Angular Imports
import { Component, inject, output } from '@angular/core';
import { RouterLink,Router } from '@angular/router';

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
  constructor(private router: Router){}
  private userService=inject(UserService);
  OnSelect=output<void>();
  OnLogOut=output<void>();
  editProfile(){
    const userType=localStorage.getItem("userType");
    if(userType=="Company"){
      this.OnSelect.emit();
      this.router.navigate(['company/edit-profile']);
    }else{
    this.OnSelect.emit();
    this.userService.editProfileTab();
    }
  }
  logout(){
    this.OnSelect.emit();
    this.OnLogOut.emit();
  }
}