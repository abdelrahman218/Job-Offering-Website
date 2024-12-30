import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { User } from '../../app.model'; // Assuming you have a User model
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-job-seekers',
  templateUrl: './job-seeker.component.html',
  imports: [NgFor,NgIf],
  styleUrls: ['./job-seeker.component.css']
})
export class JobSeekerComponent implements OnInit {
  jobSeekers: User[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe({
      next: (users) => {
        this.jobSeekers = users;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error fetching job seekers.';
        console.error('Error fetching job seekers:', err);
        this.isLoading = false;
      }
    });
  }

  deleteUser(userId: string) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.adminService.deleteUser(userId)
        .subscribe({
          next: () => {
            console.log('User deleted successfully.');
            this.jobSeekers = this.jobSeekers.filter(user => user.id !== userId);
          },
          error: (err) => {
            this.error = 'Error deleting user.';
            console.error('Error deleting user:', err);
          }
        });
    }
  }
}