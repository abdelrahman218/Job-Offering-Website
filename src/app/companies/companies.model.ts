import { Job } from "./job/job.model";

export type Company = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  description: string;
  jobs: Job[];
}