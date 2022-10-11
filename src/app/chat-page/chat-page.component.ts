import { Mensaje } from './../services/mensaje';
import { Component, OnInit } from '@angular/core';
import { ChatSeviceService } from 'src/app/services/chat-sevice.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { SonidosService } from 'src/app/services/sonidos.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  constructor(public chatService: ChatSeviceService,public authService:AuthService, private sonidos : SonidosService) { }
  Mensaje='';
  usuario='Fran';
  usuarioMail:any;
  currentUser:any;

  async ngOnInit() {
    await  this.chatService.cargarMensajes();
  }

  
  enviar()
  {
    var nuevoMensaje=
    {
      texto:this.Mensaje,
      usuario: this.authService.UsuarioActivo.nombre_usuario,
      foto:this.authService.UsuarioActivo.foto
    }
    this.sonidos.Mensaje()
    this.chatService.agregarMensaje(nuevoMensaje)
    this.Mensaje=''
  }
}
