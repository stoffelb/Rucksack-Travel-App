import { TestBed } from '@angular/core/testing';

import { ApplyFilterEventService } from './apply-filter-event.service';

describe('ApplyFilterEventService', () => {
  let service: ApplyFilterEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyFilterEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
