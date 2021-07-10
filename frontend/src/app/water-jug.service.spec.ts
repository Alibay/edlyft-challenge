import { TestBed } from '@angular/core/testing';

import { WaterJugService } from './water-jug.service';

describe('WaterJugService', () => {
  let service: WaterJugService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterJugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
