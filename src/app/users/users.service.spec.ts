import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UserService } from './users.service';
import { ApplicationType, type User } from '../app.model';

describe('User Service Unit Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
      teardown: {destroyAfterEach: false}
    });
  });
  it('user signal should intailize as an object with no data', () => {
    const service = TestBed.inject(UserService);
    expect(service.user()).toEqual({
      name: '',
      professionalTitle: '',
      photo: '',
      skills: [],
      username: '',
    });
  });
  it('applications signal should intailize as an empty array', () => {
    const service = TestBed.inject(UserService);
    expect(service.applications()).toEqual([]);
  });
  it('state signal should intailize as "None"', () => {
    const service = TestBed.inject(UserService);
    expect(service.state()).toEqual('None');
  });
  it('login function Works Successfully',  () => {
    const TestUser: User = {
      name: 'Test',
      photo: 'test.jpg',
      professionalTitle: 'Software Engineer',
      username: 'test@gmail.com',
      skills: ['Angular', 'Node JS'],
    };
    const backendMockApps=[{
        Applicant: 'test@gmail.com',
        Company: 'testCompany@gmail.com',
        Post: '13728737293',
        CV: '',
        State: 'Submitted'
    }]
    const mockApps: ApplicationType[] = [
      {
        post: 'test',
        jobTitle: 'testTitle',
        companyname: 'testCompany',
        companyEmail: 'testCompany@gmail.com',
        state: 'Submitted',
      },
    ];
    const sessionID = 'Test123342424';
    const httpTesting = TestBed.inject(HttpTestingController);
    const service = TestBed.inject(UserService);
    fakeAsync(()=>{
        service.login(TestUser, sessionID);
        const userReq = httpTesting.expectOne(
          service.backendUrl + 'getApplications?email=' + TestUser.username
        );
        expect(userReq.request.method).toBe('GET');
        expect(userReq.request.headers.has('SessionID')).toBeTruthy();
        expect(userReq.request.headers.get('SessionID')).toEqual(sessionID);
        userReq.flush({Apps: backendMockApps});
        const companyNameReq = httpTesting.expectOne(service.backendUrl.replace('user','company')+'getName/'+backendMockApps[0].Company);
        companyNameReq.flush('testCompany')
        const jobTitleReq = httpTesting.expectOne(service.backendUrl.replace('user','company')+'posts/getJobTitle/'+backendMockApps[0].Post);
        jobTitleReq.flush('testTitle')
        tick();
        httpTesting.verify();
        expect(service.applications()).toEqual(mockApps);
        expect(service.user()).toEqual(TestUser);
    }
    )
  });
});
