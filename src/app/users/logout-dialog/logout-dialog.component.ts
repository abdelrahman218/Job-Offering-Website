import { Component } from '@angular/core';
import { DialogComponent } from "../shared/dialog/dialog.component";

@Component({
  selector: 'app-logout-dialog',
  standalone: true,
  imports: [DialogComponent],
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.css'
})
export class LogoutDialogComponent {

}
