import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyrouteComponent } from './studyroute.component';

describe('StudyrouteComponent', () => {
  let component: StudyrouteComponent;
  let fixture: ComponentFixture<StudyrouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyrouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
