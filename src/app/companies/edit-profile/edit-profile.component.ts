import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CompaniesService } from '../companies.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  editForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  selectedLogo: File | null = null;
  logoError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private companiesService: CompaniesService,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/([A-ZÀ-ÿ-a-z. ']+[ ]*)+/)
      ]],
      Email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ]],
      Password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
      industry: ['', Validators.required],
      location: ['', [
        Validators.required,
        Validators.pattern(/([A-ZÀ-ÿ-a-z. ']+[ ]*)+/)
      ]],
      description: ['']
    }, { validator: this.passwordMatchValidator });
  }
  ngOnInit(): void {
    const company = this.companiesService.getCurrentCompany().User;
    this.editForm.patchValue({
      name: company.name,
      Email: company.Email,
      Password: company.Password,
      confirmPassword: company.Password,
      industry: company.industry,
      location: company.location,
      description: company.description
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('Password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        this.logoError = 'File size should not exceed 2MB.';
        this.selectedLogo = null;
      } else {
        this.logoError = null;
        this.selectedLogo = file;
      }
    }
  }

  submitForm() {
    if (this.editForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = '';

      const formData = new FormData();
      formData.append('name', this.editForm.value.name);
      formData.append('Email', this.editForm.value.Email);
      formData.append('Password', this.editForm.value.Password);
      formData.append('industry', this.editForm.value.industry);
      formData.append('location', this.editForm.value.location);
      formData.append('description', this.editForm.value.description || '');
      if (this.selectedLogo) {
        formData.append('logo', this.selectedLogo, this.selectedLogo.name);
      }
      const company = this.companiesService.getCurrentCompany();
      if (company) {
        company.User.name = this.editForm.value.name;
        company.User.Email = this.editForm.value.Email;
        company.User.Password = this.editForm.value.Password;
        company.User.industry = this.editForm.value.industry;
        company.User.location = this.editForm.value.location;
        company.User.description = this.editForm.value.description || '';
      }
      company.UserType = company.UserType || company.UserType;
      localStorage.setItem('company', JSON.stringify(company));
      this.companiesService.editProfile(formData, company.User.Email).subscribe({
        next: (response) => {
          this.router.navigate(['company/dashboard']);
        },
        error: (error) => {
          console.error('edit profile error:', error);
          this.errorMessage = error.error.message || 'Registration failed. Please try again.';
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      this.editForm.markAllAsTouched();
    }
  }
}

