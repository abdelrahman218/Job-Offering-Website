//User-Type
export type routingType={
    username: string;
    password: string;
    userType: UserType;
}
//Navigating User
export type UserType = 'Admin' | 'Company' | 'User';
//User-realted Datatypes
export type ApplicationStateType='Submitted'|'In Review'|'Accepted'|'Rejected';

export type ApplicationType = {
    id: string,
    jobTitle: string,
    companyname: string,
    companyLogo:string, 
    state: ApplicationStateType
};

export type User = {
    id: string,
    name: string,
    professionalTitle: string,
    photo: string,
    applications: ApplicationType[],
    skills: string[],
    username: string,
    password: string
};

//Company-related Datatypes

export type CareerLevelType="Internship" | "Junior" | "Experienced" | "Manager" | "Senior Management";
export type JobCategoryType="Full time" | "Part time" | "Freelance/Project";
export type WorkplaceType="On-site" | "Remote" | "Hybrid";
export type Company = {
    id: string;
    name: string;
    logo: string;
    industry: string;
    location: string;
    description: string;
    username: string,
    password: string,
    jobs: Job[];
}

export type Job = {
    id: string;
    title: string;
    careerLevel: CareerLevelType;
    jobCategory: JobCategoryType;
    workplace: WorkplaceType;
    jobRequirements:string,
    description: string;
    companyId: string;
};

export type posts={
    id: number;
    jobTitle: string;
    careerLevel: CareerLevelType;
    jobCategory: JobCategoryType;
    workplace: WorkplaceType;
    jobDescription: string;
    jobRequirements:string;
}

//Admin Datatype
export type AdminType={
    id: string,
    name: string,
    username: string,
    password: string
}