import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseaDetailsComponent } from './coursea-details.component';

describe('CourseaDetailsComponent', () => {
  let component: CourseaDetailsComponent;
  let fixture: ComponentFixture<CourseaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseaDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
