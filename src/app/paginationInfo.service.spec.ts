import { TestBed, inject } from '@angular/core/testing';

import { PaginationInfoService } from './paginationInfo.service';

describe('PaginationInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginationInfoService]
    });
  });

  it('should be created', inject([PaginationInfoService], (service: PaginationInfoService) => {
    expect(service).toBeTruthy();
  }));
});
