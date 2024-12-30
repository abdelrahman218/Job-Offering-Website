//Angular Imports
import { Component, inject } from '@angular/core';

//Services
import { UserService } from '../../users.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})

export class UserProfileComponent {
  private userService = inject(UserService);
  user = this.userService.user;
  submitted = ()=>this.userService.getNumAppSubmitted();
  inReview =  ()=>this.userService.getNumAppInReview();
  accepted = ()=>this.userService.getNumAppAccepted();
  rejected = ()=>this.userService.getNumAppRejected();

  get profilePicPath(){
    return this.userService.backendUrl+'image?email='+this.userService.user().username;
  }
}