import { TestBed, inject } from '@angular/core/testing';

import { RuleApiService } from './rule-api.service';

describe('RuleApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RuleApiService]
    });
  });

  it('should be created', inject([RuleApiService], (service: RuleApiService) => {
    expect(service).toBeTruthy();
  }));
});
