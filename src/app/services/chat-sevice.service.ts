import { Injectable } from '@angular/core';
import { Mensaje } from './mensaje';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatSeviceService {

  private itemsCollection?: AngularFirestoreCollection<any>;
  public mensajes: any[] = [];
  public userLog: any = {};
  elements: any;

  constructor(private authService: AuthService,private afs: AngularFirestore) {
    this.userLog.name = 'Fran';
    this.userLog.email ='franszellner@gmail.com';
    }

  cargarMensajes() {

    this.itemsCollection = this.afs.collection<Mensaje>('mensajes', ref => ref.orderBy('fecha', 'desc').limit(20));
    return this.itemsCollection.valueChanges().subscribe(mensajes =>
      {
        this.mensajes=[];
        mensajes.forEach(mensaje => {
          this.mensajes.unshift(mensaje);
        });

      })
  }

  agregarMensaje(message: any) {
    let newMessage: Mensaje = {
      usuario: message.usuario,
      texto: message.texto,
      fecha: this.formatDate(new Date()),
      foto: message.foto
    };

    return this.afs.collection('mensajes').add(newMessage);
  }

  formatDate = (date: any) => {
    return date.toLocaleString()
  }
}
