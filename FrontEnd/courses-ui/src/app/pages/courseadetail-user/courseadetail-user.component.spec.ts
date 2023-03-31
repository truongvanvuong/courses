import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseadetailUserComponent } from './courseadetail-user.component';

describe('CourseadetailUserComponent', () => {
  let component: CourseadetailUserComponent;
  let fixture: ComponentFixture<CourseadetailUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseadetailUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseadetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
