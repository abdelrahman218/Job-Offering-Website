import { Component, Input } from '@angular/core';
import { RouterLink} from '@angular/router';
import { type UserType } from '../app.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input({ required: true }) userType?: UserType;
}
