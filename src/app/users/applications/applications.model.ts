export type ApplicationState='Submitted'|'In Review'|'Accepted'|'Rejected';

export type Application = {
    id: string,
    jobTitle: string,
    companyname: string,
    companyLogo:string, 
    state: ApplicationState
};