import { Component,Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserType } from '../navigating-user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input({required: true}) userType !: UserType;
}