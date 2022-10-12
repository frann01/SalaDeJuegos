
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SonidosService } from 'src/app/services/sonidos.service';

const palabras = [
  'TEST',
  'CASA',
  'PERRO',
  'GATO',
  'COCHE',
  'MOTO',
  'CABALLO',
  'LUNA',
  'ESTRELLA',
  'SOL',
  'CIELO',
  'MAR',
  'RIO',
  'CASCADA',
  'NIEVE',
  'LLUVIA',
  'NUBE',
  'VIENTO',
  'FUEGO',
  'AGUA',
  'TIERRA',
  'ARBOLES',
  'PLANTAS',
  'ANIMALES',
  'HOMBRE',
  'MUJER',
  'NIÑO',
  'NIÑA',
  'COCINA',
  'COMEDOR',
  'SALA',
  'BAÑO',
  'DORMITORIO',
  'PASILLO',
  'COCHERA',
  'JARDIN',
  'PATIO',
  'PISCINA',
  'CASA',
  'EDIFICIO',
  'PISO',
  'CALLE',
  'AVENIDA',
  'PLAZA',
  'PARQUE',
  'BOSQUE',
  'MONTAÑA',
  'VALLE',
  'COMPUTADORA',
  'TELEVISION',
  'CELULAR',
  'TELEFONO',
  'TABLET',
  'RELOJ',
  'CAMARA',
  'LAPTOP',
  'IMPRESORA',
  'TECLADO',
  'PARLANTE',
];

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  constructor(private service:AuthService, private sonidos : SonidosService) { }

  A:boolean=false;
  B:boolean=false;
  C:boolean=false;
  D:boolean=false;
  E:boolean=false;
  F:boolean=false;
  G:boolean=false;
  H:boolean=false;
  I:boolean=false;
  J:boolean=false;
  K:boolean=false;
  L:boolean=false;
  M:boolean=false;
  N:boolean=false;
  ENIE:boolean=false;
  O:boolean=false;
  P:boolean=false;
  Q:boolean=false;
  R:boolean=false;
  S:boolean=false;
  T:boolean=false;
  U:boolean=false;
  V:boolean=false;
  W:boolean=false;
  X:boolean=false;
  Y:boolean=false;
  Z:boolean=false;

  palabra = '';
  escondida = '';
  errores = 0;
  gano = false;
  mostrarTeclado=true;
  perdio = false;
  src_img_ahorcado = "assets/ahorcado/ahorcado0.png"

  ngOnInit(): void 
  {
    this.comenzar()
  }

  comenzar()
  {
    this.src_img_ahorcado = "assets/ahorcado/ahorcado0.png"
    this.errores=0
    this.gano=false;
    this.mostrarTeclado=true;
    this.perdio = false;
    let numeroRandom = Math.floor(Math.random() * palabras.length);
    this.palabra = palabras[numeroRandom];
    this.escondida = '_ '.repeat(this.palabra.length);
  }

  tacharLetra(letra:string)
  {
    switch(letra)
    {
      case 'A':
        this.A = true;
        break;

        case 'B':
          this.B = true;
        break;


        case 'C':
          this.C = true;
        break;


        case 'D':
          this.D = true;
        break;

        case 'E':
          this.E = true;
        break;

        case 'F':
          this.F = true;
        break;

        case 'G':
          this.G = true;
        break;

        case 'H':
          this.H = true;
        break;

        case 'I':
          this.I = true;
        break;

        case 'J':
          this.J = true;
        break;

        case 'K':
          this.K = true;
        break;

        case 'L':
          this.L = true;
        break;

        case 'M':
          this.M = true;
        break;

        case 'N':
          this.N = true;
        break;

        case 'Ñ':
          this.ENIE = true;
        break;

        case 'O':
          this.O = true;
        break;

        case 'P':
          this.P = true;
        break;

        case 'Q':
          this.Q = true;
        break;

        case 'R':
          this.R = true;
        break;

        case 'S':
          this.S = true;
        break;

        case 'T':
          this.T = true;
        break;

        case 'U':
          this.U = true;
        break;

        case 'V':
          this.V = true;
        break;

        case 'W':
          this.W = true;
        break;

        case 'X':
          this.X = true;
        break;

        case 'Y':
          this.Y = true;
        break;

        case 'Z':
          this.Z = true;
        break;
    }
  }

  letraElegida(option: string) 
  {
    this.tacharLetra(option)
   
    if (this.palabra.indexOf(option) === -1) {
      this.sonidos.Error()
      this.errores++;
    }

    switch(this.errores)
    {
      case 1:
        this.src_img_ahorcado = "assets/ahorcado/ahorcado1.png"
        break;

      case 2:
        this.src_img_ahorcado = "assets/ahorcado/ahorcado2.png"
        break;

      case 3:
        this.src_img_ahorcado = "assets/ahorcado/ahorcado3.png"
        break;

      case 4:
        this.src_img_ahorcado = "assets/ahorcado/ahorcado4.png"
        break;

      case 5:
        this.src_img_ahorcado = "assets/ahorcado/ahorcado5.png"
        break;

      case 6:
        this.src_img_ahorcado = "assets/ahorcado/ahorcado6.png"
        break;
    }

    const arrayEscondida = this.escondida.split(' ');
    for (let i = 0; i < this.palabra.length; i++) {
      if (this.palabra[i] === option) {
        arrayEscondida[i] = option;
        this.sonidos.Moneda()
      }
    }
    this.escondida = arrayEscondida.join(' ');
    this.Chequear();  
  }

  Chequear() 
  {

    const palabraFormada = this.escondida.split(' ');
    const palabraAChequear = palabraFormada.join('');

    if (palabraAChequear === this.palabra) {
      this.sonidos.Ganar()
      this.gano = true;
      this.mostrarTeclado=false
      this.src_img_ahorcado = "assets/ahorcado/ahorcadoGano.png"
      this.service.cambiarScore('A', 1)
    }

    if (this.errores >= 7) {
      this.sonidos.Perder()
      this.perdio = true;
      this.mostrarTeclado=false
      this.src_img_ahorcado = "assets/ahorcado/ahorcadoPerdio.png"
    }
  }

  habilitarBotones()
  {
    this.A = false;
    this.B = false;
    this.C = false;
    this.D = false;
    this.E = false;
    this.F = false;
    this.G = false;
    this.H = false;
    this.I = false;
    this.J = false;
    this.K = false;
    this.L = false;
    this.M = false;
    this.N = false;
    this.ENIE = false;
    this.O = false;
    this.P = false;
    this.Q = false;
    this.R = false;
    this.S = false;
    this.T = false;
    this.U = false;
    this.V = false;
    this.W = false;
    this.X = false;
    this.Y = false;
    this.Z= false;
  }

  JugarDeVuelta() 
  {
    this.sonidos.Click()
    this.habilitarBotones()
    this.comenzar()
  }

}
