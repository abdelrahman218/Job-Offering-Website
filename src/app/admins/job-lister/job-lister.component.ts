import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Company } from "../../app.model";

@Component({
  selector: 'app-job-lister',
  templateUrl: './job-lister.component.html',
  styleUrls: ['./job-lister.component.css'],
})
export class JobListerComponent implements OnInit {
  jobListers: Company[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAllCompanies().subscribe({
      next: (companies) => {
        this.jobListers = companies;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error fetching job listers.';
        console.error('Error fetching job listers:', err);
        this.isLoading = false;
      },
    });
  }

  deleteUser(companyId: string) {
    if (confirm("Are you sure you want to delete this company?")) {
      this.adminService.deleteCompany(companyId)
        .subscribe({
          next: () => {
            console.log('Company deleted successfully.');
            this.jobListers = this.jobListers.filter(company => company.id !== companyId); 
          },
          error: (err) => {
            this.error = 'Error deleting company.';
            console.error('Error deleting company:', err);
          }
        });
    }
  }
}