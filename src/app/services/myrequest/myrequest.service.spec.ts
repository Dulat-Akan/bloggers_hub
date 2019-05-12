import { TestBed } from '@angular/core/testing';

import { MyrequestService } from './myrequest.service';

describe('MyrequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyrequestService = TestBed.get(MyrequestService);
    expect(service).toBeTruthy();
  });
});
