import { Component, OnInit, signal } from '@angular/core';
import { AdminService } from '../admin.service';
import { User } from '../../app.model'; 
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-job-seekers',
  templateUrl: './job-seeker.component.html',
  imports: [NgFor, NgIf],
  styleUrls: ['./job-seeker.component.css']
})
export class JobSeekerComponent implements OnInit {
  jobSeekers = signal<User[]>([]);
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllUsers().subscribe({
      next: (users) => {
        this.jobSeekers.set(users);
        this.isLoading = false;
        this.jobSeekers().forEach(user => {
          console.log('User Name:', user.name); 
          console.log('User Email:', user.username); 
          console.log('User Job:', user.professionalTitle); 
          
          // Log other user properties as needed
        });
      },
      error: (err) => {
        this.error = 'Error fetching job seekers.';
        console.error('Error fetching job seekers:', err);
        this.isLoading = false;
      },
    });
  }

  deleteUser(userId: string) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.adminService.deleteUser(userId)
        .subscribe({
          next: () => {
            console.log('User deleted successfully.');
            this.jobSeekers.set(this.jobSeekers().filter(user => user.id !== userId)); 

          },
          error: (err) => {
            this.error = 'Error deleting user.';
            console.error('Error deleting user:', err);
          }
        });
    }
  }
}