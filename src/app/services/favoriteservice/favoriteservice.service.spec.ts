import { TestBed } from '@angular/core/testing';

import { FavoriteserviceService } from './favoriteservice.service';

describe('FavoriteserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavoriteserviceService = TestBed.get(FavoriteserviceService);
    expect(service).toBeTruthy();
  });
});
