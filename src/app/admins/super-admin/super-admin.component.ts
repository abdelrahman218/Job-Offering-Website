import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Admin } from '../../models/admin';


@Component({
  selector: 'app-super-admin',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent {

  admins: Admin[] = []; // Array to hold admins
  adminData: Admin = { name: '', email: '', role: '' }; // Initialize as an empty Admin object
  selectedContent: string = 'add'; // Default to "add" content

  // Function to add a new admin
  addAdmin() {
    const { name, email, role } = this.adminData; // Destructure adminData
    const newAdmin = new Admin(name, email, role); // Create a new Admin object
    this.admins.push(newAdmin); // Add the new admin to the list
    this.resetForm(); // Reset the form after adding
  }

  // Function to update the admin
  updateAdmin() {
    const email = this.adminData.email; // Safely access the email
    const index = this.admins.findIndex(admin => admin.email === email);
    
    if (index !== -1) {
      this.admins[index] = { ...this.adminData }; // Update admin data
      this.resetForm(); // Reset adminData after updating
      alert("Info Updated Successfully");
    } else {
      alert("Admin not found."); // Handle case where admin is not found
    }
  }

  // Function to edit an admin
  editAdmin(admin: Admin) {
    // Manually clone admin for editing
    this.adminData = { name: admin.name, email: admin.email, role: admin.role };
    this.selectedContent = 'edit'; // Switch to edit view
  }

  // Function to reset the form
  resetForm() {
    this.adminData = { name: '', email: '', role: '' }; // Reset admin data
    this.selectedContent = 'add'; // Switch back to add view
  }


  
  toggleContent(event: any, content: string) {
    this.selectedContent = content; // Update to show selected content
    const button = event.currentTarget as HTMLElement;

    // Get all button divs with class 'Button'
    const allButtons = document.querySelectorAll('.Button');

    // Reset all buttons to default style
    allButtons.forEach((icon: any) => {
      const path = icon.querySelector('path');
      if (path) {
        path.setAttribute('fill', '#DADDD9'); // Reset icon color
      }
      icon.style.backgroundColor = '#1E3050'; // Reset background color
      icon.style.color = '#DADDD9'; // Reset font color to light
    });

    // Apply styles to the selected button
    const path = button.querySelector('path');
    if (path) {
      path.setAttribute('fill', '#1E3050'); // Set icon color for the selected button
    }
    button.style.backgroundColor = '#DADDD9'; // Dark blue background for the selected button
    button.style.color = '#1E3050'; // Light color for the text
  }

  
}