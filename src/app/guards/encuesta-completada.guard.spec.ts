import { TestBed } from '@angular/core/testing';

import { EncuestaCompletadaGuard } from './encuesta-completada.guard';

describe('EncuestaCompletadaGuard', () => {
  let guard: EncuestaCompletadaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EncuestaCompletadaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
