import { Application } from "./applications/applications.model";

export type User = {
  id: string,
  name: string,
  professionalTitle: string,
  photo: string,
  applications: Application[],
  skills: string[],
  username: string,
  password: string
};