import { TestBed } from '@angular/core/testing';

import { ReportesClinicos } from './reportes-clinicos';

describe('ReportesClinicos', () => {
  let service: ReportesClinicos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportesClinicos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
