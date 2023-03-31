import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingaccountComponent } from './settingaccount.component';

describe('SettingaccountComponent', () => {
  let component: SettingaccountComponent;
  let fixture: ComponentFixture<SettingaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingaccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
