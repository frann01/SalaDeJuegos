import { Injectable } from '@angular/core';
import {Howl, Howler} from 'howler';

@Injectable({
  providedIn: 'root'
})
export class SonidosService {

  constructor() { }

  moneda = new Howl({
    src: ['../../assets/sonidos/moneda.mp3']
  });

  victoria = new Howl({
    src: ['../../assets/sonidos/victoria.mp3']
  });

  perdida = new Howl({
    src: ['../../../assets/sonidos/perdida.mp3']
  });

  error = new Howl({
    src: ['../../../assets/sonidos/error.mp3']
  });

  mensaje = new Howl({
    src: ['../../../assets/sonidos/mensaje.mp3']
  });

  click = new Howl({
    src: ['../../../assets/sonidos/click.mp3']
  });

  Moneda()
  {
    this.moneda.play();
  }

  Ganar()
  {
    this.victoria.play();
  }

  Perder()
  {
    this.perdida.play();
  }

  Error()
  {
    this.error.play()
  }

  Click()
  {
    this.click.play()
  }

  Mensaje()
  {
    this.mensaje.play()
  }
}
