import { Company } from "../app.model";
export const newCompany: Company[] = [{
    id: '1',
    name: 'Tech Corp',
    logo: 'logo-url',
    industry: 'Technology',
    location: 'San Francisco',
    description: 'A tech company',
    Email: 'techCorp',
    Password: '123',
    jobs: [{id: '1',
      title: 'Technical engineer',
      careerLevel: "Internship",
      jobCategory: "Full time",
      workplace: "On-site" ,
      description: "technical engineer full time job",
      companyId: '1',
      jobRequirements:"bachelor degree"}]
  }];