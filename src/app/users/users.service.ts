import { Injectable } from '@angular/core';
import { type ApplicationStateType } from '../app.model';
import { dummyUsers } from './dummy-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = dummyUsers[3];
  
  private filterAccordingToAppState(state : ApplicationStateType){
    return this.user.applications.filter((app)=>{app.state===state}).length;
  }

  getUser(){
    return this.user;
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
    const apps=this.user.applications.filter((app)=> app.id!==appId);
    this.user={...this.user,applications: apps};
    //Delete it from database
  }
}