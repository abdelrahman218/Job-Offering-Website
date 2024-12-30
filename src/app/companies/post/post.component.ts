import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule,FormArray,FormControl  } from '@angular/forms';
import { CompaniesService } from '../companies.service';
import { Router,ActivatedRoute } from '@angular/router';
import { posts } from '../../app.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  postForm: FormGroup;
  isSubmitted = false;
  showAddTag=false;
  constructor(
    private fb: FormBuilder,
    private companyService: CompaniesService,
    private router: Router,
    public route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.postForm = this.fb.group({
      jobTitle: ['', Validators.required],
      careerLevel: ['', Validators.required],
      workplace: ['', Validators.required],
      jobRequirements: ['', Validators.required],
      jobCategory: ['', Validators.required],
      jobDescription: ['', Validators.required],
      tags: new FormArray([])
    });
  }

  ngOnInit(): void {
    // Check if editing an existing post
    const postId = this.route.snapshot.paramMap.get('postId');
    if (postId) {
      this.companyService.getPostById(Number(postId)).subscribe((post) => {
        this.postForm.patchValue({jobTitle: post.jobTitle,
          careerLevel: post.careerLevel,
          workplace: post.workplace,
          jobRequirements: post.jobRequirements,
          jobCategory: post.jobCategory,
          jobDescription: post.jobDescription,
          tags: post.tags});
      });
    }
  }

  submitForm() {
    this.isSubmitted = true;

    if (this.postForm.valid) {
      const postId = this.route.snapshot.paramMap.get('postId');
      const currentCompany = this.companyService.getCurrentCompany();
      
      const newPost:posts = {
        id: postId ? Number(postId) : Date.now(), // Use existing ID for edit or generate a new ID
        jobTitle: this.postForm.value.jobTitle,
        careerLevel: this.postForm.value.careerLevel,
        jobCategory: this.postForm.value.jobCategory,
        workplace: this.postForm.value.workplace,
        jobDescription: this.postForm.value.jobDescription,
        jobRequirements: this.postForm.value.jobRequirements,
        companyName: currentCompany.User.name,
        location: currentCompany.User.location,
        companyEmail: currentCompany.User.Email,
        tags: this.postForm.value.tags,
      };
      if (postId) {
        // Edit existing post
        this.companyService.editPost(newPost, Number(postId));
      } else {
        // Add new post
        this.companyService.addPost(newPost);
      }

      this.postForm.reset();
      this.cdr.detectChanges();
      this.router.navigate(['company/post/posts']);
    } else {
      this.postForm.markAllAsTouched();
    }
  }
    // Get the tags FormArray
    get tags(): FormArray {
      return this.postForm.get('tags') as FormArray;
    }
    //show popup
    Show(){
      this.showAddTag=true;
    }
    // Add a new tag
    addTag(tagValue: string) {
      this.showAddTag=false;
      if (tagValue.trim()) {
        this.tags.push(new FormControl(tagValue.trim()));
      }
    }
  
    // Remove a tag by index
    removeTag(index: number) {
      this.tags.removeAt(index);
    }
 
 sub(){
  const tagValue = this.postForm.get('tags')?.value;
  this.postForm.get('tags')?.setValue(tagValue);
  this.showAddTag=false;
  
 }
}
