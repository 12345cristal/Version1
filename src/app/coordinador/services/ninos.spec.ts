import { TestBed } from '@angular/core/testing';

import { Ninos } from './ninos';

describe('Ninos', () => {
  let service: Ninos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ninos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
