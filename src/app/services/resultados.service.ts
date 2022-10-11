import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  private itemsCollection?: AngularFirestoreCollection<any>;
  public resultadosEncuesta: any[] = [];
  public userLog: any = {};
  elements: any;

  constructor(private authService: AuthService,private afs: AngularFirestore) { }

  cargarResultadosEncuesta() {

    this.itemsCollection = this.afs.collection<any>('RespuestasEncuesta', ref => ref.orderBy('fecha', 'desc').limit(20));
    return this.itemsCollection.valueChanges().subscribe(respuestas =>
      {
        this.resultadosEncuesta=[];
        respuestas.forEach(respuesta => {
          this.resultadosEncuesta.unshift(respuesta);
        });

      })
  }

}
