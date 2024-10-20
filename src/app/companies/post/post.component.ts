import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { CompaniesService } from '../services/companies.service';
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
      FullTime: [false],
      PartTime: [false],
      Freelance: [false], 
      workplace: ['', Validators.required],
      jobDescription:['']
    },{ validators: this.requireAtLeastOneCategory});
    this.loadJobPosts();
  }
  requireAtLeastOneCategory(formGroup: FormGroup) {
    const values = formGroup.value;
    const isValid = values.FullTime || values.PartTime || values.Freelance;
    return isValid ? null : { jobCategoryRequired: true };
  }
  jobCategoryInvalid() {
    return this.postForm.hasError('jobCategoryRequired') ;
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
      const selectedCategories = [];
      if (this.postForm.value.FullTime) {
        selectedCategories.push('Full time');
      }
      if (this.postForm.value.PartTime) {
        selectedCategories.push('Part time');
      }
      if (this.postForm.value.Freelance) {
        selectedCategories.push('Freelance/Project');
      }
      console.log('Selected Categories:', selectedCategories);
      console.log('Form is valid, submitting data...');
      const newPost = {
        jobTitle: this.postForm.value.jobTitle,
        careerLevel: this.postForm.value.careerLevel,
        jobCategory: selectedCategories, 
        workplace: this.postForm.value.workplace,
        jobDescription: this.postForm.value.jobDescription
      };
      const existingPosts = JSON.parse(localStorage.getItem('jobPosts') || '[]');
      existingPosts.push(this.postForm.value); 
      localStorage.setItem('jobPosts', JSON.stringify(existingPosts));
      console.log("Posts after saving:", existingPosts); 
      this.postForm.reset();
      this.companyService.addPost(newPost); 
      console.log("Form Data:", this.postForm.value); 
      console.log('New Job Post:', newPost);
      console.log(localStorage.getItem('jobPosts'));
      this.router.navigate(['company/post/posts']);  
    } else {
      console.log('Form is invalid');
      this.postForm.markAllAsTouched();  
    }
  }
  
}
