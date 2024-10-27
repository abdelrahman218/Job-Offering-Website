import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Joblister } from '../../models/Joblister';

@Component({
  selector: 'app-job-lister',
  standalone: true,
  imports: [NgFor],
  templateUrl: './job-lister.component.html',
  styleUrl: './job-lister.component.css'
})
export class JobListerComponent {
  jobslistersList : Joblister[] = [
    {
      id: 1,
      name: 'TechCorp',
      location: 'Cairo, Egypt',
      industry: 'Information Technology',
      size: 250,
      contactEmail: 'hr@techcorp.com',
      phone: '+20234567890',
      website: 'https://www.techcorp.com',
      description: 'Leading software development company.',
      activeListings: 5,
      establishedDate: new Date('2010-05-12')
    },
    {
      id: 2,
      name: 'InnovateSolutions',
      location: 'Dubai, UAE',
      industry: 'Consulting',
      size: 150,
      contactEmail: 'jobs@innovatesolutions.com',
      phone: '+97156789012',
      website: 'https://www.innovatesolutions.com',
      description: 'Providing innovative consulting solutions.',
      activeListings: 2,
      establishedDate: new Date('2015-02-25')
    },
    {
      id: 3,
      name: 'GreenEnergy Ltd',
      location: 'Riyadh, Saudi Arabia',
      industry: 'Renewable Energy',
      size: 500,
      contactEmail: 'recruit@greenenergy.com',
      phone: '+966501234567',
      website: 'https://www.greenenergy.com',
      description: 'Pioneering company in solar and wind energy solutions.',
      activeListings: 7,
      establishedDate: new Date('2008-11-03')
    },
    {
      id: 4,
      name: 'MediCare Health',
      location: 'Amman, Jordan',
      industry: 'Healthcare',
      size: 350,
      contactEmail: 'careers@medicarehealth.com',
      phone: '+962798765432',
      website: 'https://www.medicarehealth.com',
      description: 'Leading healthcare provider in the region.',
      activeListings: 4,
      establishedDate: new Date('2012-07-19')
    },
    {
      id: 5,
      name: 'EduLearn Institute',
      location: 'Beirut, Lebanon',
      industry: 'Education',
      size: 100,
      contactEmail: 'jobs@edulearn.com',
      phone: '+96171012345',
      website: 'https://www.edulearn.com',
      description: 'Innovative educational solutions for schools and universities.',
      activeListings: 3,
      establishedDate: new Date('2016-09-14')
    }
  ]
}
