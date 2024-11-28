import { effect, inject, Injectable, OnInit, signal } from '@angular/core';
import { ApplicationType, User, type ApplicationStateType } from '../app.model';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit{
  private httpClientService = inject(HttpClient);
  private errorService = inject(ErrorService);
  private stateSignal=signal<'Editing Profile'|'Logging out'|'Adding Skill'|'None'>('None');
  private userSignal = signal<User>({
    name: '',
    id: '',
    professionalTitle: '',
    photo: '',
    skills: [],
    username: '',
    password: '',
  });
  user = this.userSignal.asReadonly();
  state = this.stateSignal.asReadonly();

  ngOnInit(){
    effect(()=>{
      localStorage.setItem('user',JSON.stringify(this.userSignal()))
    })
  }

  login(user: User) {
    this.userSignal.set(user);
  }
  signout() {
    this.userSignal.set({
      name: '',
      id: '',
      professionalTitle: '',
      photo: '',
      skills: [],
      username: '',
      password: '',
    });
  }
  private filterAccordingToAppState(state: ApplicationStateType) {
    return this.getApps(this.userSignal().username).filter((app) => app.state === state)
      .length;
  }

  getNumAppSubmitted() {
    return this.filterAccordingToAppState('Submitted');
  }

  getNumAppInReview() {
    return this.filterAccordingToAppState('In Review');
  }

  getNumAppAccepted() {
    return this.filterAccordingToAppState('Accepted');
  }

  getNumAppRejected() {
    return this.filterAccordingToAppState('Rejected');
  }
  getApps(userEmail : string){
    var apps: ApplicationType[] = [];
    this.httpClientService
      .get(
        'http://localhost:8080/user/getApplications?email=' +
          userEmail
      )
      .pipe(
        tap({
          next: (res : any) => {
            let temp=res.Apps;
            //get Company and post info form backend
            temp.forEach((app : any) => {
              apps.push({jobTitle: 'jobTitle',post: app.Post,companyname: app.Company,companyLogo: '',state: app.State});
            });
          },
      })
      )
      .subscribe();
      return apps;
  }
  withdrawApp(appPost: string) {
    this.httpClientService
      .post('http://localhost:8080/user/removeApplication', {
        Email: this.user().username,
        Post: appPost,
      })
      .pipe(
        tap({
          complete: ()=>{
            const apps = this.getApps(this.userSignal().username).filter(
              (app) => app.post !== appPost
            );
            this.userSignal.update((prev) => {
              return { ...prev, applications: apps };
            });
          }
        }),
        catchError((error) => {
          this.errorService.emitError("Application couldn\'t be withdrawn");
          throw new Error("Couldn't withdraw application");
        })
      ).subscribe();
  }

  addSkill(skill: string) {
    this.httpClientService
      .post('http://localhost:8080/user/addSkill', {
        Email: this.user().username,
        Skill: skill,
      })
      .pipe(
        tap({
          complete: () => {
            const oldSkills = this.userSignal().skills;
            this.userSignal.update((prev) => {
              return { ...prev, skills: [...oldSkills, skill] };
            });
          },
        }),
        catchError(() => {
          this.errorService.emitError("Skill couldn't be added");
          throw new Error("Couldn't add skill");
        })
      )
      .subscribe();
  }

  removeSkill(skill: string) {
    this.httpClientService
      .post('http://localhost:8080/user/removeSkill', {
        Email: this.user().username,
        Skill: skill,
      })
      .pipe(
        tap({
          complete: () => {
            const skills = this.userSignal().skills.filter(
              (Sk) => Sk !== skill
            );
            this.userSignal.update((prev) => {
              return { ...prev, skills: skills };
            });
          },
        }),
        catchError(() => {
          this.errorService.emitError("Skill couldn't be added");
          throw new Error("Couldn't delete skill");
        })
      )
      .subscribe();
  }
}