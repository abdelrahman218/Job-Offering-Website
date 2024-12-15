//User-Type
export type routingType={
    username: string;
    password: string;
    userType: UserType;
}
//Navigating User
export type UserType = 'Admin' | 'Company' | 'User';
//User-related Datatypes
export type ApplicationStateType='Submitted'|'In Review'|'Accepted'|'Rejected';

export type ApplicationType = {
    post: string,
    jobTitle?: string,
    companyname?: string,
    companyEmail:string,
    state: ApplicationStateType
};

export type signup={
    FName: string,
    LName: string,
    Email: string,
    Password: string,
    PTitle: string
}

export type EditProfileData={PhotoFile?: File, Name: string,ProfessionalTitle: string, Photo:string, Password: string};

export type User = {
    name: string,
    professionalTitle: string,
    photo: string,
    skills: string[],
    username: string
};

//Company-related Datatypes

export type CareerLevelType="Internship" | "Junior" | "Experienced" | "Manager" | "Senior Management";
export type JobCategoryType="Full-time" | "Part-time" | "Freelance/Project";
export type WorkplaceType="On-site" | "Remote" | "Hybrid";
export type Company = {UserType:string,User:{
    id: string;
    name: string;
    logo: string;
    industry: string;
    location: string;
    description: string;
    Email: string,
    Password: string,
    jobs: Job[];
}
}

export type Job = {
    id: string;
    title: string;
    careerLevel: CareerLevelType;
    jobCategory: string;
    workplace: WorkplaceType;
    jobRequirements:string,
    description: string;
    companyId: string;
};

export type posts={
    id: number;
    jobTitle: string;
    companyName:string;
    careerLevel: string;
    jobCategory: string;
    workplace: string;
    jobDescription: string;
    jobRequirements:string;
    location:string;
}

//Admin Datatype
export type AdminType={
    id: string,
    name: string,
    username: string,
    password: string
}