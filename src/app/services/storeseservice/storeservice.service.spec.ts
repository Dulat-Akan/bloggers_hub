import { TestBed } from '@angular/core/testing';

import { StoreserviceService } from './storeservice.service';

describe('StoreserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreserviceService = TestBed.get(StoreserviceService);
    expect(service).toBeTruthy();
  });
});
