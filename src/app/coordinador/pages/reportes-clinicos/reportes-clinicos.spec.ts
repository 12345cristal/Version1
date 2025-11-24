import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesClinicos } from './reportes-clinicos';

describe('ReportesClinicos', () => {
  let component: ReportesClinicos;
  let fixture: ComponentFixture<ReportesClinicos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesClinicos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesClinicos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
