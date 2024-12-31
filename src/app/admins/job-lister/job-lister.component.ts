import { Component, OnInit, signal } from '@angular/core';
import { AdminService } from '../admin.service';
import { Company } from "../../app.model";
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-job-lister',
  templateUrl: './job-lister.component.html',
  imports: [NgFor, NgIf],
  styleUrls: ['./job-lister.component.css'],
})
export class JobListerComponent implements OnInit {
  jobListers = signal<Company[]>([]);
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAllCompanies().subscribe({
      next: (companies) => {
        this.jobListers.set(companies);
        this.isLoading = false;
        this.jobListers().forEach(company => {
          console.log('User Name:', company.name); 
          console.log('User Email:', company.location); 
          console.log('User Job:', company.industry); 

          // Log other user properties as needed
        });
      },
      error: (err) => {
        this.error = 'Error fetching job listers.';
        console.error('Error fetching job listers:', err);
        this.isLoading = false;
      },
    });
  }

  deleteUser(companyName: string) { 
    if (confirm("Are you sure you want to delete this company?")) {
      this.adminService.deleteCompany(companyName)
        .subscribe({
          next: () => {
            console.log('Company deleted successfully.');
            this.jobListers.set(this.jobListers().filter(company => company.name !== companyName)); 
          },
          error: (err) => {
            this.error = 'Error deleting company.';
            console.error('Error deleting company:', err);
          }
        });
    }
  }
}