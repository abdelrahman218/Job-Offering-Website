import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AdminService } from '../admin.service'; // Assuming AdminService is in the correct location
import { AdminType } from '../../app.model'; // Assuming you have an Admin interface

@Component({
  selector: 'app-super-admin',
  standalone: true,
  imports: [NgIf, FormsModule], // Include FormsModule
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent {

  admins: AdminType[] = []; // Array to hold admins (optional for local display)
  adminData: AdminType = { name: '', email: '', password:'Password@123', role: 'admin'}; // Initialize with default role
  selectedContent: string = 'add'; // Default to "add" content
  errorMessage: string | null = null;

  constructor(private adminService: AdminService) { }

  // Function to add a new admin
  addAdmin() {
    console.log('Add Admin clicked:', this.adminData);

    const { name, email, password, role } = this.adminData; // Destructure adminData
    const newAdmin: AdminType =  {name, email, password, role}; // Create a new Admin object

    this.adminService.addAdmin(newAdmin) // Call AdminService for registration
      .subscribe({
        next: () => {
          this.admins.push(newAdmin);
          this.resetForm(); // Reset the form after adding
          console.log('Admin Added Successfully'); // Use console.log for success message
        },
        error: (err) => {
          console.error('Error adding admin:', err.message || 'Error'); // Use console.error for error message
        }
      });
  }

  // Function to update the admin (assuming super admin can update)
  updateAdmin() {
    console.log('Edit Admin clicked:', this.adminData);

    const email = this.adminData.email; // Safely access the email
    const index = this.admins.findIndex(admin => admin.email === email); // Assuming admins array is used

    if (index !== -1) {
      this.adminService.updateAdmin(this.adminData.email, this.adminData) // Update using email as identifier
        .subscribe({
          next: () => {
            this.admins[index] = { ...this.adminData }; // Update local admin data (optional)
            this.resetForm(); // Reset adminData after updating
            console.log('Admin Updated Successfully'); // Use console.log for success message
          },
          error: (err) => {
            console.error('Error updating admin:', err.message || 'Error'); // Use console.error for error message
          }
        });
    } else {
      console.error("Admin not found."); // Use console.error for error message
    }
  }

  // Function to edit an admin
  editAdmin(admin: AdminType) {
    // Manually clone admin for editing
    this.adminData = { ...admin }; // Use spread operator for proper cloning
    this.selectedContent = 'edit'; // Switch to edit view
  }

  // Function to reset the form
  resetForm() {
    this.adminData = { name: '', email: '', password:'Password@123', role: 'admin' }; // Reset admin data with default role
    this.selectedContent = 'add'; // Switch back to add view
  }

  toggleContent(content: string) {
    this.resetForm();
    this.selectedContent = content;
  
    const allButtons = document.querySelectorAll('.Button');
    allButtons.forEach(btn => btn.classList.remove('selected'));
  
    const selectedButton = document.getElementById(content + 'Button');
    if (selectedButton) {
      selectedButton.classList.add('selected');
    }
  }
}