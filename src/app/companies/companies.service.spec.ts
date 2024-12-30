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
    const formData= new FormData();
    
      formData.append('name',"TechCorp");
      formData.append('Email','hr@techcorp.com');
      formData.append('Password','StrongPass123!');
      formData.append('logo','logo.png');
      formData.append('location','Cairo');
      formData.append('description', 'A Tech Company');
    

    service.registerCompany(formData).subscribe((response) => {
      expect(response).toEqual(formData);
    });
    
    const req = httpMock.expectOne(`${service.apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(formData);
  });

  it('should reject invalid company email', () => {
      const formData= new FormData();
    
      formData.append('name',"TechCorp");
      formData.append('Email','hr@techcorp.com');
      formData.append('Password','StrongPass123!');
      formData.append('logo','logo.png');
      formData.append('location','Cairo');
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
        companyName:"techCorp",
        location:"Cairo"
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
});
