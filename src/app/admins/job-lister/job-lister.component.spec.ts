import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListerComponent } from './job-lister.component';

describe('JobListerComponent', () => {
  let component: JobListerComponent;
  let fixture: ComponentFixture<JobListerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobListerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobListerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
