import { Component, Input, OnInit } from '@angular/core';
import { UserType, posts } from '../../../app.model';
import { Router } from '@angular/router';
import { UserService } from '../../users.service';
import { FormsModule } from '@angular/forms';
import { CompaniesService } from '../../../companies/companies.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({ required: true }) userType?: UserType;
  @Input({ required: true }) post !: posts;
  appliedJobs?:Number[];
  constructor(private router: Router, private userService: UserService, private httpClient: HttpClient) { }
  ngOnInit(){
    this.userService.getApplied().subscribe({
      next: (jobs) => {
        this.appliedJobs = jobs;
      },
      error: (error) => {
        console.error('Error fetching applied jobs:', error);
      }
    });
  }
  login() {
    this.router.navigate(["/login"]);
  }
  public cv!: File;
  isAppliedBefore(){
    return this.appliedJobs?.includes(this.post.id);
  }
  selectCV(event: any) {
    this.cv = event.target.files[0];
    console.log(this.cv);
  }
  submitCV() {
    this.userService.submitCV(this.cv, this.post.id.toString(), this.post.companyEmail);
    this.reloadComponent();
  }
  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}