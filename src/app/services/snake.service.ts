import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SonidosService } from './sonidos.service';
@Injectable({
  providedIn: 'root'
})
export class SnakeService {

  constructor(public auth : AuthService, private sonidos:SonidosService) { }

  puntos:number = 0;
  juganto=false;
  perdio=false;

  aumentarPuntaje()
  {
    this.puntos = this.puntos+1
    this.sonidos.Moneda()
  }

  perder()
  {
    this.perdio=true;
    this.sonidos.Perder()
    if(this.auth.UsuarioActivo.MayorPPropio < this.puntos)
    {
      this.auth.cambiarScore('S', this.puntos)
    }
  }
}
