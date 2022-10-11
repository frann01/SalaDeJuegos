import { TestBed } from '@angular/core/testing';

import { PokemonPreguntadosService } from './pokemon-preguntados.service';

describe('PokemonPreguntadosService', () => {
  let service: PokemonPreguntadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonPreguntadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
