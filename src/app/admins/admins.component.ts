import { Component } from '@angular/core';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [AdminNavComponent,RouterOutlet],
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent {}
