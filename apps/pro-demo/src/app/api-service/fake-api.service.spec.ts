import { TestBed, inject } from '@angular/core/testing';

import { FakeApiService } from './fake-api.service';

describe('FakeApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeApiService]
    });
  });

  it('should be created', inject([FakeApiService], (service: FakeApiService) => {
    expect(service).toBeTruthy();
  }));
});
