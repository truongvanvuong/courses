import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatelessonComponent } from './updatelesson.component';

describe('UpdatelessonComponent', () => {
  let component: UpdatelessonComponent;
  let fixture: ComponentFixture<UpdatelessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatelessonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatelessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
