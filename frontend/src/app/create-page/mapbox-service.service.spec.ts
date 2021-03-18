import { TestBed } from '@angular/core/testing';

import { MapboxServiceService } from './mapbox-service.service';

describe('MapboxServiceService', () => {
  let service: MapboxServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapboxServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
