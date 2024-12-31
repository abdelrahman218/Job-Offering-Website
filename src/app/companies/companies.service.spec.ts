import { TestBed } from '@angular/core/testing';
import { CompaniesService } from './companies.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Company, posts, Application } from '../app.model';

describe('CompaniesService with Validations', () => {
  let service: CompaniesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompaniesService],
    });

    service = TestBed.inject(CompaniesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should add a valid company', () => {
    const formData = new FormData();

    formData.append('name', "TechCorp");
    formData.append('Email', 'hr@techcorp.com');
    formData.append('Password', 'StrongPass123!');
    formData.append('logo', 'logo.png');
    formData.append('location', 'Cairo');
    formData.append('description', 'A Tech Company');


    service.registerCompany(formData).subscribe((response) => {
      expect(response).toEqual(formData);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(formData);
  });

  it('should reject invalid company email', () => {
    const formData = new FormData();

    formData.append('name', "TechCorp");
    formData.append('Email', 'hr@techcorp.com');
    formData.append('Password', 'StrongPass123!');
    formData.append('logo', 'logo.png');
    formData.append('location', 'Cairo');
    formData.append('description', 'A Tech Company');

    service.registerCompany(formData).subscribe(
      () => fail('Expected an error for invalid email'),
      (error) => expect(error).toBeTruthy()
    );

    const req = httpMock.expectOne(`${service.apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Validation failed' }, { status: 400, statusText: 'Bad Request' });
  });

  it('should load posts with valid job categories and workplace types', () => {
    const mockPosts: posts[] = [
      {
        id: 1,
        jobTitle: 'Software Developer',
        careerLevel: 'Junior Level/Fresh Grad',
        jobCategory: 'Full-Time',
        workplace: 'Remote',
        jobDescription: 'Develop software solutions',
        jobRequirements: '1-2 years experience in development',
        companyEmail: 'hr@gmail.com',
        tags: ['JavaScript', 'Remote Work'],
        companyName: "techCorp",
        location: "Cairo"
      },
    ];

    service.loadJobPosts();
    const req = httpMock.expectOne(`${service.apiUrl}/getPosts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);

    service.jobPosts$.subscribe((posts) => {
      expect(posts).toEqual(mockPosts);
    });
  });

  it('should log in with valid company credentials', () => {
    const credentials = { Email: 'hr@techcorp.com', Password: 'StrongPass123!' };
    const mockResponse = { UserType: 'Company', Email: 'hr@techcorp.com' };

    service.login(credentials).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(localStorage.getItem('userType')).toBe('Company');
    });

    const req = httpMock.expectOne(`${service.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should reject login with invalid credentials', () => {
    const credentials = { Email: 'invalid@techcorp.com', Password: 'WeakPass' };

    service.login(credentials).subscribe(
      () => fail('Expected login to fail for invalid credentials'),
      (error) => expect(error).toBeTruthy()
    );

    const req = httpMock.expectOne(`${service.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Invalid credentials' }, { status: 401, statusText: 'Unauthorized' });
  });
    it('should get posts by companyEmail', () => {
      const mockPosts: posts[] = [
        { id: 1, jobTitle: 'Developer', careerLevel: 'Junior', jobCategory: 'Full-Time', workplace: 'Remote', jobDescription: 'Code stuff', jobRequirements: 'Knowledge of JavaScript', companyEmail: 'test@company.com', tags: [], companyName: 'TestCo', location: 'Cairo' },
      ];

      service.getPosts('test@company.com');

      const req = httpMock.expectOne(`${service.apiUrl}/getPostsByCompanyEmail/test@company.com`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPosts);

      expect(service.jobPostsSubject.getValue()).toEqual(mockPosts);
    });

    it('should log an error for missing companyEmail in getPosts', () => {
      const consoleSpy = spyOn(console, 'error');
      service.getPosts('');
      expect(consoleSpy).toHaveBeenCalledWith('No company email found');
    });

    it('should remove localStorage items on logout', () => {
      spyOn(localStorage, 'removeItem');
      service.logout();
      expect(localStorage.removeItem).toHaveBeenCalledWith('company');
      expect(localStorage.removeItem).toHaveBeenCalledWith('userType');
    });

    it('should delete a post by id', () => {
      const initialPosts: posts[] = [
        { id: 1, jobTitle: 'Developer', careerLevel: 'Junior', jobCategory: 'Full-Time', workplace: 'Remote', jobDescription: 'Code stuff', jobRequirements: 'Knowledge of JavaScript', companyEmail: 'test@company.com', tags: [], companyName: 'TestCo', location: 'Cairo' },
      ];
      service.jobPostsSubject.next(initialPosts);

      service.deletePost(1);

      const req = httpMock.expectOne(`${service.apiUrl}/deletePost/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);

      expect(service.jobPostsSubject.getValue()).toEqual([]);
    });

    it('should get a job title by post ID', async () => {
      const mockResponse = { jobTitle: 'Developer' };

      const result = service.getJobTitle(1);
      const req = httpMock.expectOne(`${service.apiUrl}/posts/getJobTitle/1`);
      req.flush(mockResponse);

      const jobTitle = await result;
      expect(jobTitle).toBe('Developer');
    });

    it('should get applications by post ID', () => {
      const mockApplications: Application[] = [
        { Post: 1, Applicant: 'John Doe', CV: "Cv", State: 'In Review', Company: "Tech Corp" },
      ];

      service.getApplicationsByPost(1).subscribe((applications) => {
        expect(applications).toEqual(mockApplications);
      });

      const req = httpMock.expectOne(`${service.apiUrl}/applications/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockApplications);
    });

    it('should update the application state', () => {
      const applicationUpdate = { applicationStatus: 'Accepted' };

      service.updateApplicationState(applicationUpdate, 1).subscribe(() => {
        // Assertions for success.
        expect(true).toBeTruthy();
      });

      const req = httpMock.expectOne(`${service.apiUrl}/applications/updateState/1`);
      expect(req.request.method).toBe('PUT');
      req.flush(null);
    });

    it('should return a CV download URL', () => {
      const filename = 'resume.pdf';
      const expectedUrl = `${service.apiUrl}/downloadCV/resume.pdf`;
      const result = service.viewCV(filename);
      expect(result).toBe(expectedUrl);
    });

    it('should edit profile with valid data', () => {
      const mockResponse = { message: 'Profile updated', Company: { name: 'UpdatedCo' } };
      const formData = new FormData();
      formData.append('name', 'UpdatedCo');

      service.editProfile(formData, 'test@company.com').subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${service.apiUrl}/editProfile/test@company.com`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockResponse);
    });
  });
