import { Component,Input,signal } from '@angular/core';
import { CardComponent } from '../../find-a-job/card/card.component';

@Component({
  selector: 'app-user-recommend',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user-recommend.component.html',
  styleUrl: './user-recommend.component.css'
})
export class UserRecommendComponent {
}
