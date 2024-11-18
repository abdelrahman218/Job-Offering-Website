
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { CompaniesService } from '../companies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  postForm: FormGroup;
  jobPosts: any[] = [];
  isSubmitted = false;
  constructor(
    private fb: FormBuilder,
    private companyService: CompaniesService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      jobTitle: ['', Validators.required],
      careerLevel: ['', Validators.required],
      workplace: ['', Validators.required],
      jobRequirements: ['', Validators.required],
      jobCategory:['',Validators.required],
      jobDescription:['']
    });
    this.loadJobPosts();
  }
  loadJobPosts() {
    const storedPosts = localStorage.getItem('jobPosts');
    if (storedPosts) {
      this.jobPosts = JSON.parse(storedPosts); 
    }
  }
  submitForm() {
    console.log("Form Data before saving:", this.postForm.value);
    this.isSubmitted = true; 
    if (this.postForm.valid) {
      console.log('Form is valid, submitting data...');
      const newPost = {
        jobTitle: this.postForm.value.jobTitle,
        careerLevel: this.postForm.value.careerLevel,
        jobCategory:this.postForm.value.jobCategory,
        workplace: this.postForm.value.workplace,
        jobDescription: this.postForm.value.jobDescription,
        jobRequirements:this.postForm.value.jobRequirements
      };
      const existingPosts = JSON.parse(localStorage.getItem('jobPosts') || '[]');
      localStorage.setItem('jobPosts', JSON.stringify(existingPosts));
      console.log("Posts after saving:", existingPosts); 
      this.postForm.reset();
      this.companyService.addPost(newPost); 
      console.log('New Job Post:', newPost);
      console.log(localStorage.getItem('jobPosts'));
      this.router.navigate(['company/post/posts']);  
    } else {
      console.log('Form is invalid');
      localStorage.clear();
      this.postForm.markAllAsTouched();  
    }
  }
}