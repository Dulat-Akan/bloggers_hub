import { TestBed } from '@angular/core/testing';

import { SetroleserviceService } from './setroleservice.service';

describe('SetroleserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetroleserviceService = TestBed.get(SetroleserviceService);
    expect(service).toBeTruthy();
  });
});
