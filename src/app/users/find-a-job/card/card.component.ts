import { Component,Input } from '@angular/core';
import { UserType } from '../../../app.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({required: true}) userType !: UserType;
  constructor(private router: Router) {}
  login(){
    this.router.navigate(["/login"]);
  }
}
