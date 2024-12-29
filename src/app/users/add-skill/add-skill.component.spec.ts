//Angular Testing Package Imports
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

//App Imports
import { UserService } from '../users.service';
import { AddSkillComponent } from './add-skill.component';

describe('Edit Profile Component Unit Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
      imports: [AddSkillComponent],
    });
  });

  it('Component is created successfully', () => {
    let fixture = TestBed.createComponent(AddSkillComponent);
    let addSkillComponent = fixture.debugElement.componentInstance;
    expect(addSkillComponent).toBeTruthy();
  });

  it('addSkill function call service when Skill is valid', () => {
    let fixture = TestBed.createComponent(AddSkillComponent);
    let service = fixture.debugElement.injector.get(UserService);
    let addSkillComponent = fixture.debugElement.componentInstance;
    service.addSkillTab();
    addSkillComponent.skill='testSkill';
    fixture.detectChanges();
    addSkillComponent.addSkill();
    fixture.detectChanges();
    expect(addSkillComponent.isRequired()).toBeFalse();
    expect(service.state()).toEqual('None');
  });

  it("addSkill function doesn't call service when Skill is invalid", () => {
    let fixture = TestBed.createComponent(AddSkillComponent);
    let service = fixture.debugElement.injector.get(UserService);
    let addSkillComponent = fixture.debugElement.componentInstance;
    service.addSkillTab();
    addSkillComponent.addSkill();
    fixture.detectChanges();
    expect(addSkillComponent.isRequired()).toBeTrue();
    expect(service.state()).toEqual('Adding Skill');
  });

  it('closeDialog function works correctly', () => {
    let fixture = TestBed.createComponent(AddSkillComponent);
    let service = fixture.debugElement.injector.get(UserService);
    let addSkillComponent = fixture.debugElement.componentInstance;
    service.addSkillTab();

    addSkillComponent.closeDialog();
    expect(service.state()).toEqual('None');
  });
});
