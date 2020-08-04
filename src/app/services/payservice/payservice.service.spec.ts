import { TestBed } from '@angular/core/testing';

import { PayserviceService } from './payservice.service';

describe('PayserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayserviceService = TestBed.get(PayserviceService);
    expect(service).toBeTruthy();
  });
});
