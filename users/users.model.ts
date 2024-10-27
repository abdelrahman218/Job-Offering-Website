import { Application } from "./applications/applications.model";

export type User = {
  id: string,
  name: string,
  photo: string,
  applications: Application[],
  username: string,
  password: string
};