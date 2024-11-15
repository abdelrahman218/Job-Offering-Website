import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Jobseeker } from '../../models/Jobseeker';

@Component({
  selector: 'app-job-seeker',
  standalone: true,
  imports: [NgFor],
  templateUrl: './job-seeker.component.html',
  styleUrl: './job-seeker.component.css'
})
export class JobSeekerComponent {
  jobseekersList = [
    new Jobseeker('Ahmed Ali', 28, 'Bachelor’s Degree in Computer Science'),
    new Jobseeker('Sara Mahmoud', 25, 'Bachelor’s Degree in Business Administration'),
    new Jobseeker('Mohamed Hassan', 30, 'Master’s Degree in Mechanical Engineering'),
    new Jobseeker('Nour ElDin', 22, 'Diploma in Graphic Design'),
    new Jobseeker('Lina Youssef', 27, 'Bachelor’s Degree in Marketing'),
    new Jobseeker('Karim Nabil', 24, 'Bachelor’s Degree in Information Technology'),
    new Jobseeker('Fatma Omar', 29, 'Master’s Degree in Data Science'),
    new Jobseeker('Hassan Ibrahim', 26, 'Bachelor’s Degree in Finance'),
    new Jobseeker('Rania Salah', 23, 'Diploma in Web Development'),
    new Jobseeker('Youssef Ezzat', 32, 'Master’s Degree in Electrical Engineering')
  ];
}
