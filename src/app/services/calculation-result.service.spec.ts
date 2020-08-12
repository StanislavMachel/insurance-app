import { TestBed } from '@angular/core/testing';

import { CalculationResultService } from './calculation-result.service';

describe('CalculationResultService', () => {
  let service: CalculationResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculationResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
