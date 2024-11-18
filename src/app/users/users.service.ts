import { inject, Injectable, signal } from '@angular/core';
import { User, type ApplicationStateType } from '../app.model';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClientService = inject(HttpClient);
  private userSignal = signal<User>({
    name: '',
    id: '',
    professionalTitle: '',
    photo: '',
    applications: [],
    skills: [],
    username: '',
    password: '',
  });
  user = this.userSignal.asReadonly();

  login(user: User) {
    this.userSignal.set(user);
  }
  signout() {
    this.userSignal.set({
      name: '',
      id: '',
      professionalTitle: '',
      photo: '',
      applications: [],
      skills: [],
      username: '',
      password: '',
    });
  }
  private filterAccordingToAppState(state: ApplicationStateType) {
    return this.userSignal().applications.filter((app) => app.state === state)
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

  withdrawApp(appId: string) {
    const apps = this.userSignal().applications.filter(
      (app) => app.id !== appId
    );
    this.userSignal.update((prev) => {
      return { ...prev, applications: apps };
    });
    //Delete it from database
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
        throw new Error('Couldn\'t add skill');
      })
    ).subscribe();
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
          throw new Error('Couldn\'t delete skill');
        })
      )
      .subscribe();
  }
}