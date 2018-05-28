import { TestBed, inject } from '@angular/core/testing';

import { KodiService } from './kodi.service';

describe('KodiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KodiService]
    });
  });

  it('should be created', inject([KodiService], (service: KodiService) => {
    expect(service).toBeTruthy();
  }));
});
