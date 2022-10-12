import { AuthService } from './../../../services/auth.service';
import { PokemonPreguntadosService } from './../../../services/pokemon-preguntados.service';
import { Component, OnInit } from '@angular/core';
import { SonidosService } from 'src/app/services/sonidos.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  constructor(private pokemonSvc : PokemonPreguntadosService, private service:AuthService, public sonidos : SonidosService ) {  }

  pokemones : any[]=[];
  pokemon_ganador=""
  jugando=false;
  perdio=false;
  puntaje=0;
  pregunta="hola "
  srcImg=""
  rsp1="";
  rsp2="";
  rsp3="";
  rsp4="";
  mostrar=true;

  poke1=null;
  poke2=null;
  poke3=null;
  poke4=null;
  ngOnInit(): void {
    this.pokemonSvc.ObtenerPaises()
    setTimeout(() => {
      this.pokemones=this.pokemonSvc.pokemones
    }, 1000);
  }

  jugarDeNuevo()
  {
    this.puntaje=0
    this.jugar()
  }

  jugar()
  {
    this.mostrar=false
    let numeros : number[]=this.generarRandom();
    this.poke1=this.pokemonSvc.pokemones[numeros[0]];
    this.poke2=this.pokemonSvc.pokemones[numeros[1]];
    this.poke3=this.pokemonSvc.pokemones[numeros[2]];
    this.poke4=this.pokemonSvc.pokemones[numeros[3]];

    this.srcImg=this.obtenerImg(this.poke1)
    this.pokemon_ganador = this.poke1.name

    let posibles_respuestas = [
      this.poke1.name,
      this.poke2.name,
      this.poke3.name,
      this.poke4.name,
    ];
    posibles_respuestas.sort(() => Math.random() - 0.5);

    this.rsp1 = posibles_respuestas[0]
    this.rsp2 = posibles_respuestas[1]
    this.rsp3 = posibles_respuestas[2]
    this.rsp4 = posibles_respuestas[3]

    console.log(this.poke1)
    this.jugando=true
    this.perdio=false;
  }

  generarRandom():number[]
  {
    let numeros : number[]=[];

    for(var i =0; i<4;i++)
    {
      numeros[i]= Math.floor(Math.random() * 120)
      while(numeros.includes(i))
      {
        numeros[i]= Math.floor(Math.random() * 120)
      }
    }
    return numeros;
  }

  obtenerImg(pokemon : any) :string
  {
    const pokemonIndex = pokemon.url.split('/')[ pokemon.url.split('/').length - 2];
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+pokemonIndex+".png"
  }

  oprimir_btn(num_boton : number)
  { 
    switch(num_boton)
    {
      case 0:
        if(this.rsp1==this.pokemon_ganador)
        {
          this.sonidos.Moneda()
          this.puntaje++;
          this.jugar()
        }
        else
        {
          this.sonidos.Perder()
          this.perder();
          this.perdio=true
          this.jugando=false
        }
        break;

      case 1:
        if(this.rsp2==this.pokemon_ganador)
        {
          this.sonidos.Moneda()
          this.puntaje++;
          this.jugar()
        }
        else
        {
          this.sonidos.Perder()
          this.perder();
          this.perdio=true
          this.jugando=false
        }
        break;

      case 2:
        if(this.rsp3==this.pokemon_ganador)
        {
          this.sonidos.Moneda()
          this.puntaje++;
          this.jugar()
        }
        else
        {
          this.sonidos.Perder()
          this.perder();
          this.perdio=true
          this.jugando=false
        }
        break;

      case 3:
        if(this.rsp4==this.pokemon_ganador)
        {
          this.sonidos.Moneda()
          this.puntaje++;
          this.jugar()
        }
        else
        {
          this.sonidos.Perder()
          this.perder();
          this.perdio=true
          this.jugando=false
        }
        break;
    }

  }

  perder()
  {
    if(this.service.UsuarioActivo.MayorPPreguntados < this.puntaje)
    {
      this.service.cambiarScore('P', this.puntaje)
    }
  }
}
