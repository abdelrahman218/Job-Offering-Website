import { Component,inject,Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserType } from '../app.model';
import { UserService } from '../users/users.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input({required: true}) userType !: UserType;
  private userService=inject(UserService);
  profilePicture='profile-pics/'+this.userService.getUser().photo;
}