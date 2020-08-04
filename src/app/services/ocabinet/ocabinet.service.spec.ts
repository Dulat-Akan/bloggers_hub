import { TestBed } from '@angular/core/testing';

import { OcabinetService } from './ocabinet.service';

describe('OcabinetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OcabinetService = TestBed.get(OcabinetService);
    expect(service).toBeTruthy();
  });
});
