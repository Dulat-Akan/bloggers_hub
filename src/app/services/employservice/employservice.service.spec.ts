import { TestBed } from '@angular/core/testing';

import { EmployserviceService } from './employservice.service';

describe('EmployserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployserviceService = TestBed.get(EmployserviceService);
    expect(service).toBeTruthy();
  });
});
