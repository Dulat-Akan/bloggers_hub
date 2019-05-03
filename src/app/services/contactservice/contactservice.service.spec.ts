import { TestBed } from '@angular/core/testing';

import { ContactserviceService } from './contactservice.service';

describe('ContactserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactserviceService = TestBed.get(ContactserviceService);
    expect(service).toBeTruthy();
  });
});
