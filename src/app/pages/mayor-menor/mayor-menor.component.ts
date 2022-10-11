import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SonidosService } from 'src/app/services/sonidos.service';


@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {

  constructor( private service:AuthService, private sonidos : SonidosService) { }

  numeroActual:any;
  numeroSiguiente:any;
  puntaje=0;
  jugando=false;
  perdio=false;
  srcActual:any;
  srcSiguiente:any;

  ngOnInit(): void {
    this.generarNumeroActual();
  }

  jugar()
  {
    this.perdio = false;
    this.puntaje =0;
    this.generarNumeroActual();
    console.log(this.numeroActual);
    this.jugando=true;
  }

  async Mayor()
  {
    await this.generarNumeroSiguiente();
    
    while(this.numeroSiguiente == this.numeroActual)
    {
      await this.generarNumeroSiguiente();
    }
    console.log(this.numeroActual + ' | ' + this.numeroSiguiente);
    if(this.numeroActual<this.numeroSiguiente)
    {
      this.sonidos.Moneda()
      this.puntaje++;
      this.numeroActual= this.numeroSiguiente;
      this.srcActual=this.srcSiguiente
      
    }
    else
    {
      this.sonidos.Perder()
      this.perdio = true;
      console.log(this.numeroSiguiente);
      this.jugando=false;
      this.perder()
    }
  }

  async Menor()
  {
    await this.generarNumeroSiguiente();
    while(this.numeroSiguiente == this.numeroActual)
    {
      await this.generarNumeroSiguiente();
    }
    console.log(this.numeroActual + ' | ' + this.numeroSiguiente);
    if(this.numeroActual>this.numeroSiguiente)
    {
      this.sonidos.Moneda()
      this.puntaje++;
      this.numeroActual = this.numeroSiguiente;
      this.srcActual=this.srcSiguiente
      
    }
    else
    {
      this.sonidos.Perder()
      this.perdio = true;
      console.log(this.numeroSiguiente);
      this.jugando=false;
      this.perder()
    }
  }

  async generarNumeroActual()
  {
    await fetch("https://www.deckofcardsapi.com/api/deck/new/draw/?count=1").
    then(res => res.json())
    .then(res => 
      {
        console.log()
        this.srcActual = res.cards[0].image
        console.log("API",res);
        if(res.cards[0].value == 'QUEEN')
        {
          this.numeroActual = res.cards[0].value=12
        }
        else if(res.cards[0].value == 'JACK')
        {
          this.numeroActual = res.cards[0].value=11
        }
        else if(res.cards[0].value == 'KING')
        {
          this.numeroActual = res.cards[0].value=13
        }
        else if(res.cards[0].value == 'ACE')
        {
          this.numeroActual = res.cards[0].value=14
        }
        else
        {
          this.numeroActual = res.cards[0].value
        }
        
      })
  }

  async generarNumeroSiguiente()
  {
    await fetch("https://www.deckofcardsapi.com/api/deck/new/draw/?count=1").
    then(res => res.json())
    .then(res => 
      {
        this.srcSiguiente = res.cards[0].image
        if(res.cards[0].value == 'QUEEN')
        {
          this.numeroSiguiente = res.cards[0].value=12
        }
        else if(res.cards[0].value == 'JACK')
        {
          this.numeroSiguiente = res.cards[0].value=11
        }
        else if(res.cards[0].value == 'KING')
        {
          this.numeroSiguiente = res.cards[0].value=13
        }
        else if(res.cards[0].value == 'ACE')
        {
          this.numeroSiguiente = res.cards[0].value=14
        }
        else
        {
          this.numeroSiguiente = res.cards[0].value
        }
      })
  }

  perder()
  {
    if(this.service.UsuarioActivo.MayorPMayorMenor < this.puntaje)
    {
      this.service.cambiarScore('M', this.puntaje)
    }
  }

}
