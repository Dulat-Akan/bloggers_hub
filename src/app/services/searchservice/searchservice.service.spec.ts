import { TestBed } from '@angular/core/testing';

import { SearchserviceService } from './searchservice.service';

describe('SearchserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchserviceService = TestBed.get(SearchserviceService);
    expect(service).toBeTruthy();
  });
});
