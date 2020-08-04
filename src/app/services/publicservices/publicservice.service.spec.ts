import { TestBed } from '@angular/core/testing';

import { PublicserviceService } from './publicservice.service';

describe('PublicserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicserviceService = TestBed.get(PublicserviceService);
    expect(service).toBeTruthy();
  });
});
