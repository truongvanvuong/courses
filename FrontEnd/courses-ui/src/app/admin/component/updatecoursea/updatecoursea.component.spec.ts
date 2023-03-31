import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecourseaComponent } from './updatecoursea.component';

describe('UpdatecourseaComponent', () => {
  let component: UpdatecourseaComponent;
  let fixture: ComponentFixture<UpdatecourseaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatecourseaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatecourseaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
