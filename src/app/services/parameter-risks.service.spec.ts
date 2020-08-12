import { TestBed } from '@angular/core/testing';

import { ParameterRisksService } from './parameter-risks.service';

describe('ParameterRisksService', () => {
  let service: ParameterRisksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParameterRisksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
