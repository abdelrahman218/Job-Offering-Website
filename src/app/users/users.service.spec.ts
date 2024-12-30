//Angular Testing Package Imports
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

//App Imports
import { UserService } from './users.service';
import { type ApplicationType,type EditProfileData, type User } from '../app.model';

describe('User Service Unit Test (Not Logged In)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
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

  it('login function Works Successfully', fakeAsync(() => {
    const TestUser: User = {
      name: 'Test',
      photo: 'test.jpg',
      professionalTitle: 'Software Engineer',
      username: 'test@gmail.com',
      skills: ['Angular', 'Node JS'],
    };
    const backendMockApps = [
      {
        Applicant: 'test@gmail.com',
        Company: 'testCompany@gmail.com',
        Post: '13728737293',
        CV: '',
        State: 'Submitted',
      },
    ];
    const mockApps: ApplicationType[] = [
      {
        post: '13728737293',
        jobTitle: 'testTitle',
        companyname: 'testCompany',
        companyEmail: 'testCompany@gmail.com',
        state: 'Submitted',
      },
    ];
    const sessionID = 'Test123342424';
    const httpTesting = TestBed.inject(HttpTestingController);
    const service = TestBed.inject(UserService);
    service.login(TestUser, sessionID);
    const userReq = httpTesting.expectOne(
      service.backendUrl + 'getApplications?email=' + TestUser.username
    );
    expect(userReq.request.method).toBe('GET');
    expect(userReq.request.headers.has('SessionID')).toBeTrue();
    expect(userReq.request.headers.get('SessionID')).toEqual(sessionID);
    userReq.flush({ Apps: backendMockApps });
    const companyNameReq = httpTesting.expectOne(
      service.backendUrl.replace('user', 'company') +
        'getName/' +
        backendMockApps[0].Company
    );
    companyNameReq.flush({ companyName: 'testCompany' });
    tick();
    const jobTitleReq = httpTesting.expectOne(
      service.backendUrl.replace('user', 'company') +
        'posts/getJobTitle/' +
        backendMockApps[0].Post
    );
    jobTitleReq.flush({ jobTitle: 'testTitle' });
    tick();
    httpTesting.verify();
    expect(service.user()).toEqual(TestUser);
    expect(service.applications()).toEqual(mockApps);
  }));

  it('addSkillTab function works correctly', () => {
    const service = TestBed.inject(UserService);
    service.addSkillTab();
    expect(service.state()).toEqual('Adding Skill');
  });

  it('editProfileTab function works correctly', () => {
    const service = TestBed.inject(UserService);
    service.editProfileTab();
    expect(service.state()).toEqual('Editing Profile');
  });

  it('closeTab function works correctly', () => {
    const service = TestBed.inject(UserService);
    service.addSkillTab();
    service.editProfileTab();
    service.closeTab();
    expect(service.state()).toEqual('None');
  });
});

describe('User Service Unit Test (Logged In)', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
      teardown: { destroyAfterEach: false },
    });
    const TestUser: User = {
      name: 'Test',
      photo: 'test.jpg',
      professionalTitle: 'Software Engineer',
      username: 'test@gmail.com',
      skills: ['Angular', 'Node JS'],
    };
    const backendMockApps = [
      {
        Applicant: 'test@gmail.com',
        Company: 'testCompany@gmail.com',
        Post: '13728737293',
        CV: '',
        State: 'Submitted',
      },
      {
        Applicant: 'test@gmail.com',
        Company: 'testCompany@gmail.com',
        Post: '13728737294',
        CV: '',
        State: 'In Review',
      },
      {
        Applicant: 'test@gmail.com',
        Company: 'testCompany@gmail.com',
        Post: '13728737295',
        CV: '',
        State: 'Accepted',
      },
      {
        Applicant: 'test@gmail.com',
        Company: 'testCompany@gmail.com',
        Post: '13728737296',
        CV: '',
        State: 'Rejected',
      }
    ];
    const sessionID = 'Test123342424';
    const httpTesting = TestBed.inject(HttpTestingController);
    const service = TestBed.inject(UserService);
    service.login(TestUser, sessionID);
    const userReq = httpTesting.expectOne(
      service.backendUrl + 'getApplications?email=' + TestUser.username
    );
    userReq.flush({ Apps: backendMockApps });
    const allCompanyNameRequests = httpTesting.match(service.backendUrl.replace('user', 'company') + 'getName/' + backendMockApps[0].Company);
    for (const companyNameReq of allCompanyNameRequests) {
      companyNameReq.flush({ companyName: 'testCompany' });
      tick();
    }
    const allJobTitleRequests = httpTesting.match((req)=>req.url.includes(service.backendUrl.replace('user', 'company') + 'posts/getJobTitle/'));
    for (const jobTitleReq of allJobTitleRequests) {
      jobTitleReq.flush({ companyName: 'testCompany' });
      tick();
    }
  }));

  afterEach(()=>{
    const httpTesting=TestBed.inject(HttpTestingController);
    httpTesting.verify();
  });

  it('Signout Function works correctly', () => {
    const service = TestBed.inject(UserService);
    service.signout();
    expect(service.user()).toEqual({
      name: '',
      professionalTitle: '',
      photo: '',
      skills: [],
      username: '',
    });
    expect(service.applications()).toEqual([]);
  });

  it('getNum... functions work correctly',()=>{
    const service=TestBed.inject(UserService);
    expect(service.getNumAppSubmitted()).toEqual(1);
    expect(service.getNumAppInReview()).toEqual(1);
    expect(service.getNumAppAccepted()).toEqual(1);
    expect(service.getNumAppRejected()).toEqual(1);
  });

  it('Edit Profile Picture works correctly',()=>{
    const mockOriginalData: EditProfileData={
      Name: 'test',
      ProfessionalTitle: 'testTitle',
      Photo: '',
      Password: ''
    };
    const mockEditedData: EditProfileData={
      Name: 'test',
      ProfessionalTitle: 'testTitle',
      Photo: '',
      Password: '',
      PhotoFile: new File([''],'test.jpg')
    };
    const httpTesting=TestBed.inject(HttpTestingController);
    const service=TestBed.inject(UserService);
    service.editProfile(mockEditedData,mockOriginalData);
    const photoReq=httpTesting.expectOne(service.backendUrl+'editProfilePhoto');
    expect(photoReq.request.headers.has('SessionID')).toBeTrue();
    photoReq.flush(null);
    httpTesting.expectNone(service.backendUrl+'editProfile');
    expect(service.user().photo).toEqual('test.jpg');
  });

  it('Edit Profile works correctly (Data is changed)',()=>{
    const mockOriginalData: EditProfileData={
      Name: 'test',
      ProfessionalTitle: 'testTitle',
      Photo: '',
      Password: ''
    };
    const mockEditedData: EditProfileData={
      Name: 'test1',
      ProfessionalTitle: 'testTitle',
      Photo: '',
      Password: '',
    };
    const httpTesting=TestBed.inject(HttpTestingController);
    const service=TestBed.inject(UserService);
    service.editProfile(mockEditedData,mockOriginalData);
    httpTesting.expectNone(service.backendUrl+'editProfilePhoto');
    const editProfileReq=httpTesting.expectOne(service.backendUrl+'editProfile');
    expect(editProfileReq.request.headers.has('SessionID')).toBeTrue();
    editProfileReq.flush(null);
    expect(service.user().name).toEqual(mockEditedData.Name);
  });
  
  it('Edit Profile works correctly (Password is changed)',()=>{
    const mockOriginalData: EditProfileData={
      Name: 'test',
      ProfessionalTitle: 'testTitle',
      Photo: '',
      Password: ''
    };
    const mockEditedData: EditProfileData={
      Name: 'test',
      ProfessionalTitle: 'testTitle',
      Photo: '',
      Password: 'ljdk;afadhs',
    };
    const httpTesting=TestBed.inject(HttpTestingController);
    const service=TestBed.inject(UserService);
    service.editProfile(mockEditedData,mockOriginalData);
    httpTesting.expectNone(service.backendUrl+'editProfilePhoto');
    const editProfileReq=httpTesting.expectOne(service.backendUrl+'editProfile');
    expect(editProfileReq.request.headers.has('SessionID')).toBeTrue();
    editProfileReq.flush(null);
    expect(service.user().name).toEqual(mockEditedData.Name);
    expect(service.user().professionalTitle).toEqual(mockEditedData.ProfessionalTitle);
  });

  it('WithdrawApp function works correctly', ()=>{
    const httpTesting=TestBed.inject(HttpTestingController);
    const service=TestBed.inject(UserService);
    service.withdrawApp('13728737296');
    const req=httpTesting.expectOne(service.backendUrl+'removeApplication');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.has('SessionID')).toBeTrue();
    req.flush(null);
    expect(service.applications().find((app)=>app.post==='13728737296')).toBeFalsy();
  });

  it('addSkill function works correctly', ()=>{
    const httpTesting=TestBed.inject(HttpTestingController);
    const service=TestBed.inject(UserService);
    service.addSkill('testSkill');
    const req=httpTesting.expectOne(service.backendUrl+'addSkill');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.has('SessionID')).toBeTrue();
    req.flush(null);
    expect(service.user().skills.find((skill)=>skill==='testSkill')).toBeTruthy();
  });

  it('removeSkill function works correctly', ()=>{
    const httpTesting=TestBed.inject(HttpTestingController);
    const service=TestBed.inject(UserService);
    service.removeSkill('Node JS');
    const req=httpTesting.expectOne(service.backendUrl+'removeSkill');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.has('SessionID')).toBeTrue();
    req.flush(null);
    expect(service.user().skills.find((skill)=>skill==='Node JS')).toBeFalsy();
  });
});