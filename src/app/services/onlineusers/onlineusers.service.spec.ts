import { TestBed } from '@angular/core/testing';

import { OnlineusersService } from './onlineusers.service';

describe('OnlineusersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlineusersService = TestBed.get(OnlineusersService);
    expect(service).toBeTruthy();
  });
});
