//Angular Testing Package Imports
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

//App Imports
import { EditProfileComponent } from './edit-profile.component';
import { UserService } from '../users.service';

describe('Edit Profile Component Unit Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
      imports: [EditProfileComponent],
    });
  });

  it('Component is created successfully', () => {
    let fixture = TestBed.createComponent(EditProfileComponent);
    let editProfileComponent = fixture.debugElement.componentInstance;
    expect(editProfileComponent).toBeTruthy();
  });

  it('originalData & editedData should intialize as user data', () => {
    let fixture = TestBed.createComponent(EditProfileComponent);
    let editProfileComponent = fixture.debugElement.componentInstance;
    expect(editProfileComponent.editedData).toEqual({
      Photo: '',
      Name: '',
      ProfessionalTitle: '',
      Password: '',
    });
  });

  it('image path is correct', () => {
    let service = TestBed.inject(UserService);
    let fixture = TestBed.createComponent(EditProfileComponent);
    let editProfileComponent = fixture.debugElement.componentInstance;

    expect(editProfileComponent.imgPath).toEqual(
      service.backendUrl + 'image?email='
    );
  });

  it("editProfile function calls the service if data is valid", () => {
    let fixture = TestBed.createComponent(EditProfileComponent);
    let service = fixture.debugElement.injector.get(UserService);
    let editProfileComponent = fixture.debugElement.componentInstance;

    service.editProfileTab();

    editProfileComponent.confirmPassword='Zy@12345';
    fixture.detectChanges();
    editProfileComponent.editedData= {
      Name: 'test',
      ProfessionalTitle: '',
      Photo: '',
      Password: 'Zy@12345'
    };
    fixture.detectChanges();
    editProfileComponent.editProfile();
    expect(service.state()).toEqual('None');
  });

  it("editProfile function doesn't call the service if data is invalid", () => {
    let fixture = TestBed.createComponent(EditProfileComponent);
    let service = fixture.debugElement.injector.get(UserService);
    let editProfileComponent = fixture.debugElement.componentInstance;

    service.editProfileTab();

    editProfileComponent.editedData= {
      Name: 'test',
      ProfessionalTitle: 'testTitle',
      Photo: '',
      Password: 'ABc'
    };
    fixture.detectChanges();
    editProfileComponent.editProfile();

    expect(service.state()).toEqual('Editing Profile');
  });

  it('closeDialog function works correctly',()=>{
    let fixture = TestBed.createComponent(EditProfileComponent);
    let service = fixture.debugElement.injector.get(UserService);
    let editProfileComponent = fixture.debugElement.componentInstance;
    service.editProfileTab();

    editProfileComponent.closeDialog();
    expect(service.state()).toEqual('None');
  });
});