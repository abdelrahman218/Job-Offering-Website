import { Component,ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CompaniesService } from '../companies.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  postForm: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private companyService: CompaniesService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.postForm = this.fb.group({
      jobTitle: ['', Validators.required],
      careerLevel: ['', Validators.required],
      workplace: ['', Validators.required],
      jobRequirements: ['', Validators.required],
      jobCategory: ['', Validators.required],
      jobDescription: ['',Validators.required],
      tags:['']
    });
  }

  submitForm() {
    const currentCompany = this.companyService.getCurrentCompany();
  
    console.log('Current Company Raw:', currentCompany);
    console.log('Current Company Email:', currentCompany.User.Email);
    console.log("Form Data before saving:", this.postForm.value);
    this.isSubmitted = true;
    if (this.postForm.valid) {
      console.log('Form is valid, submitting data...');
      const newPost = {
        id:Math.floor(Math.random() * 1000000),
        jobTitle: this.postForm.value.jobTitle,
        careerLevel: this.postForm.value.careerLevel,
        jobCategory: this.postForm.value.jobCategory,
        workplace: this.postForm.value.workplace,
        jobDescription: this.postForm.value.jobDescription,
        jobRequirements: this.postForm.value.jobRequirements,
        companyName: currentCompany.User.name, 
        location: currentCompany.User.location,
        companyEmail: currentCompany.User.Email,
        tags:this.postForm.value.tags
      };
      this.companyService.addPost(newPost);
      console.log(newPost);
      this.postForm.reset();
      this.cdr.detectChanges();
      this.router.navigate(['company/post/posts']).then(() => {
        console.log('Navigation successful!');
          this.companyService.loadJobPosts();
      });
       
    } else {
      console.log('Form is invalid');
      this.postForm.markAllAsTouched();
    }
  }
}
