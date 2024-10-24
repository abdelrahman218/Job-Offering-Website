import { Injectable , signal} from '@angular/core';
import { User, type ApplicationStateType } from '../app.model';
import { dummyUsers } from './dummy-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSignal = signal<User>(dummyUsers[0]);

  user=this.userSignal.asReadonly();

  private filterAccordingToAppState(state : ApplicationStateType){
    return this.userSignal().applications.filter((app)=>app.state===state).length;
  }

  getNumAppSubmitted(){
    return this.filterAccordingToAppState('Submitted');
  }

  getNumAppInReview(){
    return this.filterAccordingToAppState('In Review');
  }

  getNumAppAccepted(){
    return this.filterAccordingToAppState('Accepted');
  }

  getNumAppRejected(){
    return this.filterAccordingToAppState('Rejected');
  }

  withdrawApp(appId : string){
    const apps=this.userSignal().applications.filter((app)=> app.id!==appId);
    this.userSignal.update((prev)=>{return {...prev,applications: apps}})
    //Delete it from database
  }

  addSkill(skill: string){
    const oldSkills=this.userSignal().skills;
    this.userSignal.update((prev)=>{return {...prev,skills: [...oldSkills,skill]}})
  }
}