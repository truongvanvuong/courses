import { TestBed } from '@angular/core/testing';

import { CourseaService } from './coursea.service';

describe('CourseaService', () => {
  let service: CourseaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
