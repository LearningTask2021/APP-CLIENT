import { TestBed } from '@angular/core/testing';

import { GetInfoService } from './get-info.service';

describe('GetInfoService', () => {
  let service: GetInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
