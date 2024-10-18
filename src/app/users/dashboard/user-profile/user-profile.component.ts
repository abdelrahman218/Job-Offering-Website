import { Component, inject } from '@angular/core';
import { UserService } from '../../users.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  private usersService = inject(UserService);

  user = this.usersService.getUser();
  submitted = this.usersService.getNumAppSubmitted();
  inReview =  this.usersService.getNumAppInReview();
  accepted = this.usersService.getNumAppAccepted();
  rejected = this.usersService.getNumAppRejected();

  get profilePicPath(){
    return 'profile-pics/'+this.usersService.getUser().photo;
  }
}