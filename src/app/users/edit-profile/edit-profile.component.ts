import { Component } from '@angular/core';
import { DialogComponent } from "../shared/dialog/dialog.component";

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [DialogComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

}
