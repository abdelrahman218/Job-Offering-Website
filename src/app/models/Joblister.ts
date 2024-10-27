export class Joblister{
    /*id: number; // Unique identifier for the company
    name: string; // Company name
    location: string; // Company location (city, country)
    industry: string; // Type of industry the company operates in
    size: number; // Number of employees in the company
    contactEmail: string; // Contact email address for the company
    phone: string; // Phone number for communication
    website: string; // Company website URL
    description: string; // Brief description of the company
    activeListings: number; // Number of job listings currently active
    establishedDate: Date; // When the company was established*/
  
    constructor(
        public id: number,
        public name: string,
        public location: string,
        public industry: string,
        public size: number,
        public contactEmail: string,
        public phone: string,
        public website: string,
        public description: string,
        public activeListings: number,
        public establishedDate: Date
    ) {}
}