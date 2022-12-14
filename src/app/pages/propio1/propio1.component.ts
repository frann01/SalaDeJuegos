import { Component, HostListener, OnInit } from '@angular/core';
import  Game  from './scripts/game'
import { SnakeService } from "src/app/services/snake.service";
import { SonidosService } from 'src/app/services/sonidos.service';
@Component({
  selector: 'app-propio1',
  templateUrl: './propio1.component.html',
  styleUrls: ['./propio1.component.css']
})
export class Propio1Component implements OnInit {

  constructor(public SnakeSrv : SnakeService,public sonido : SonidosService) { }
  puntaje=0
  ngOnInit(): void {
    
    this.SnakeSrv.perdio  = false;
    this.SnakeSrv.juganto=false;
    const canvas: HTMLCanvasElement = document.getElementById('arena') as HTMLCanvasElement;
  }

  Jugar()
    {
      this.sonido.Click()
      this.SnakeSrv.puntos=0;
      this.SnakeSrv.perdio = false
      this.SnakeSrv.juganto = true
      setTimeout(() => {
        const canvas: HTMLCanvasElement = document.getElementById('arena') as HTMLCanvasElement;
      const game = new Game(canvas, {}, this.SnakeSrv);
      const score: HTMLElement = document.getElementById('score') as HTMLElement;
      game.start();
      }, 50);
      
    }


}

