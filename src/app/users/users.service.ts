import { Injectable , signal} from '@angular/core';
import { User, type ApplicationStateType } from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSignal = signal<User>({name:'',id: '',professionalTitle:'',photo:'',applications:[],skills:[],username: '',password: ''});
  user=this.userSignal.asReadonly();

  login(user: User){
    this.userSignal.set(user);
  }
  signout(){
    this.userSignal.set({name:'',id: '',professionalTitle:'',photo:'',applications:[],skills:[],username: '',password: ''});
  }
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
  
  removeSkill(skill: string){
    const skills=this.userSignal().skills.filter((Sk)=> Sk!==skill);
    this.userSignal.update((prev)=>{return {...prev,skills: skills}})
    //Delete it from database
  }
}