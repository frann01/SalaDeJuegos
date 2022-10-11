import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.component.html',
  styleUrls: ['./puntajes.component.css']
})
export class PuntajesComponent implements OnInit {

  constructor(public authSrv : AuthService) { }

  TopPuntajePreguntados:any= {};
  TopPuntajeSnake:any= {};
  TopPuntajeMayor:any= {};
  TopVictoriasAhorcado:any= {};


  async ngOnInit() {
    this.authSrv.ObtenerTopPreguntados()
     this.authSrv.ObtenerTopAhorcado()
     this.authSrv.ObtenerTopMayor()
     this.authSrv.ObtenerTopSnake()
  }

  

}
