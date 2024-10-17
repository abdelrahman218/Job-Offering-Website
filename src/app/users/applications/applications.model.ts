export type ApplicationState='Submitted'|'In Review'|'Accepted'|'Rejected';

export type Application = {
    id: string,
    jobTitle: string,
    companyId: string, 
    state: ApplicationState
};