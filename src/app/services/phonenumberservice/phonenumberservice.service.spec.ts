import { TestBed } from '@angular/core/testing';

import { PhonenumberserviceService } from './phonenumberservice.service';

describe('PhonenumberserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhonenumberserviceService = TestBed.get(PhonenumberserviceService);
    expect(service).toBeTruthy();
  });
});
