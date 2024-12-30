import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CompaniesService } from '../companies.service';

@Component({
  selector: 'app-company-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.css']
})
export class CompanyRegistrationComponent {
  registrationForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  selectedLogo: File | null = null;
  logoError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private companiesService: CompaniesService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
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
    if (this.registrationForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = '';

      const formData = new FormData();
      formData.append('name', this.registrationForm.value.name);
      formData.append('Email', this.registrationForm.value.Email);
      formData.append('Password', this.registrationForm.value.Password);
      formData.append('industry', this.registrationForm.value.industry);
      formData.append('location', this.registrationForm.value.location);
      formData.append('description', this.registrationForm.value.description || '');
      if (this.selectedLogo) {
        formData.append('logo', this.selectedLogo, this.selectedLogo.name);
      }

      this.companiesService.registerCompany(formData).subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.errorMessage = error.error.message || 'Registration failed. Please try again.';
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}