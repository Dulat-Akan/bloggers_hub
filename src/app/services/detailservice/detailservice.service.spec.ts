import { TestBed } from '@angular/core/testing';

import { DetailserviceService } from './detailservice.service';

describe('DetailserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailserviceService = TestBed.get(DetailserviceService);
    expect(service).toBeTruthy();
  });
});
