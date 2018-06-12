import { TestBed, inject } from '@angular/core/testing';

import { ChromecastService } from './chromecast.service';

describe('ChromecastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChromecastService]
    });
  });

  it('should be created', inject([ChromecastService], (service: ChromecastService) => {
    expect(service).toBeTruthy();
  }));
});
