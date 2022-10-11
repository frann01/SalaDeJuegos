import { Component, OnInit } from '@angular/core';
import { ResultadosService } from 'src/app/services/resultados.service';
@Component({
  selector: 'app-resultados-encuesta',
  templateUrl: './resultados-encuesta.component.html',
  styleUrls: ['./resultados-encuesta.component.css']
})
export class ResultadosEncuestaComponent implements OnInit {

  constructor(public resulatdosSrv : ResultadosService) { }

  ngOnInit(): void {
    this.resulatdosSrv.cargarResultadosEncuesta()
  }

}
