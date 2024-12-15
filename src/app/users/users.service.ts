import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';
import {ApplicationType, EditProfileData, User, type ApplicationStateType} from '../app.model';
import { ErrorService } from '../error/error.service';
import { CompaniesService } from '../companies/companies.service';

@Injectable({
  providedIn: 'root',
})
export class UserService{
  private backendUrl='http://localhost:8080/user/';
  private httpClientService = inject(HttpClient);
  private errorService = inject(ErrorService);
  private companyService = inject(CompaniesService);
  private stateSignal = signal<'Editing Profile' | 'Adding Skill' | 'None'>('None');
  private userSignal = signal<User>({
    name: '',
    professionalTitle: '',
    photo: '',
    skills: [],
    username: '',
  });
  private applicationSignal = signal<ApplicationType[]>([]);
  user = this.userSignal.asReadonly();
  applications = this.applicationSignal.asReadonly();
  state = this.stateSignal.asReadonly();

  login(user: User) {
    this.userSignal.set(user);
    this.updateUserInLocalStorage();
    this.applicationSignal.set(this.getApps(user.username));
  }

  signout() {
    this.userSignal.set({
      name: '',
      professionalTitle: '',
      photo: '',
      skills: [],
      username: '',
    });
    this.updateUserInLocalStorage();
    this.applicationSignal.set([]);
  }
  private updateUserInLocalStorage(){
    localStorage.setItem('user', JSON.stringify(this.userSignal()));
  }
  private isTheSame(edited: EditProfileData, original: EditProfileData) {
    if (
      edited.Name === original.Name &&
      edited.ProfessionalTitle === original.ProfessionalTitle
    ) {
      return true;
    }
    return false;
  }
  private filterAccordingToAppState(state: ApplicationStateType) {
    return this.applications().filter((app) => app.state === state).length;
  }

  private getApps(userEmail: string) {
    var apps: ApplicationType[] = [];
    this.httpClientService
      .get(this.backendUrl+'getApplications?email=' + userEmail)
      .pipe(
        tap({
          next: (res: any) => {
            let temp = res.Apps; 
            temp.forEach(async (app: any) => {
              let companyName = await this.companyService.getCompanyName(app.Company);
              let jobTitle = await this.companyService.getJobTitle(app.Post);
              apps.push({
                jobTitle: jobTitle,
                post: app.Post,
                companyname: companyName,
                companyEmail: app.Company,
                state: app.State,
              });
            });
          },
        })
      )
      .subscribe();
    return apps;
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
  editProfileTab(){
    this.stateSignal.set('Editing Profile');
  }
  editProfile(edited: EditProfileData, original: EditProfileData) {
    if (edited.PhotoFile) {
      const formData = new FormData();
      formData.append('Email', this.user().username);
      formData.append('Photo', edited.PhotoFile);
      this.httpClientService
        .post(this.backendUrl+'editProfilePhoto', 
          formData
        )
        .pipe(
          tap({
            complete: () => {
              if (edited.PhotoFile?.name) {
                let name = edited.PhotoFile.name;
                this.userSignal.update((prev) => {
                  return { ...prev, photo: name };
                });
                this.updateUserInLocalStorage();
              }
            },
          }),
          catchError(() => {
            this.errorService.emitError(
              "Profile Picture Couldn't be Edited",
              true
            );
            throw new Error("Could't Edit Profile Picture");
          })
        )
        .subscribe();
    }
    if (!this.isTheSame(edited, original) || edited.Password) {
      this.httpClientService
        .post(this.backendUrl+'editProfile', {
          Email: this.user().username,
          Name: edited.Name,
          ProfessionalTitle: edited.ProfessionalTitle,
          Password: edited.Password,
        })
        .pipe(
          tap({
            complete: () => {
              this.userSignal.update((prev) => {
                return {
                  ...prev,
                  name: edited.Name,
                  professionalTitle: edited.ProfessionalTitle,
                };
              });
              this.updateUserInLocalStorage();
            },
          }),
          catchError(() => {
            this.errorService.emitError("Profile Couldn't be Edited", true);
            throw new Error("Could't Edit Profile");
          })
        )
        .subscribe();
    }
  }
  withdrawApp(appPost: string) {
    this.httpClientService
      .post(this.backendUrl+'removeApplication', {
        Email: this.user().username,
        Post: appPost,
      })
      .pipe(
        tap({
          complete: () => {
            this.applicationSignal.set(
              this.applications().filter((app) => app.post !== appPost)
            );
          },
        }),
        catchError((error) => {
          this.errorService.emitError("Application couldn't be withdrawn");
          throw new Error("Couldn't withdraw application");
        })
      )
      .subscribe();
  }

  addSkillTab() {
    this.stateSignal.set('Adding Skill');
  }
  addSkill(skill: string) {
    this.httpClientService
      .post(this.backendUrl+'addSkill', {
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
            this.updateUserInLocalStorage();
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
      .post(this.backendUrl+'removeSkill', {
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
            this.updateUserInLocalStorage();
          },
        }),
        catchError(() => {
          this.errorService.emitError("Skill couldn't be added");
          throw new Error("Couldn't delete skill");
        })
      )
      .subscribe();
  }
  closeTab() {
    this.stateSignal.set('None');
  }
}
