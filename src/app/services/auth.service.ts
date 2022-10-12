import { getFirestore } from '@angular/fire/firestore';
import { Usuario } from './../clases/usuario';
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../compartida/usuario'
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})


export class AuthService implements OnDestroy {

  public isLogged: any = false;
  UsuarioActivo:any;
  uidUser="";
  private itemsCollection?: AngularFirestoreCollection<any>;

  private Preguntados?: AngularFirestoreCollection<any>;
  private Snake?: AngularFirestoreCollection<any>;
  private Mayor?: AngularFirestoreCollection<any>;
  private Ahorcado?: AngularFirestoreCollection<any>;

  public Usuarios: any[] = [];

  public PreguntadosP: any[] = [];
  public SnakeP: any[] = [];
  public MayorP: any[] = [];
  public AhorcadoP: any[] = [];

  

  ngOnDestroy() {
    this.afAuth.signOut();
  }

  constructor(private toastr: ToastrService,public afAuth : AngularFireAuth,public afs: AngularFirestore,private router: Router) 
  {
    afAuth.authState.subscribe( user => (this.isLogged = user))
  }

  async cargarUsuarios() {

    this.itemsCollection = this.afs.collection<any>('usuarios');
    return await this.itemsCollection.valueChanges().subscribe(usuarios =>
      {
        this.Usuarios = []
        usuarios.forEach(usuario => {
          this.Usuarios.unshift(usuario);
        });

      })
  }

  async onLogin (user : User)
  {
    var retorno:any;
    retorno = await (await this.afAuth.signInWithEmailAndPassword(user.email, user.password))
    this.uidUser=retorno.user.uid

    if(retorno)
    {
      await (this.afs.collection('usuarios').doc(this.uidUser).get().toPromise().then(doc =>{
        this.afs.collection('usuarios').doc(this.uidUser).valueChanges().subscribe(usuario =>{
          this.agregarLogin(usuario)
          this.UsuarioActivo = usuario
          localStorage.setItem('user', JSON.stringify(user));
        })
      }));
    }
    else
    {
      retorno=null;
    }
    return retorno;
  }

  async onRegister(user : User)
  {
    try
    {

      const storage = getStorage();
      const storageRef = ref(storage, `imagenes/${user.foto.name + this.formatDate(new Date())}`)
      const uploadTask = uploadBytesResumable(storageRef, user.foto)
      uploadTask.on('state_changed', (snapshot)=>
      {

      },
      (error)=>{console.log("Hubo un error en la subida")},
      async ()=>
      {
        await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => 
        {
          await this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then(cred =>{
            this.afs.collection('usuarios').doc(cred.user.uid).set({
              nombre_usuario:user.nombre_usuario,
              MayorPPreguntados:0,
              MayorPMayorMenor:0,
              MayorPAhorcado:0,
              MayorPPropio:0,
              foto: downloadUrl,
              completoEncuesta:false,
              perfil:"usuario"
            })
          })
          })
      })
      return true
    }
    catch(error){console.log("Error en register", error);return false}
  }

  async cambiarScore(juego:any, puntaje:number)
  {
    console.log("cambiando a ",puntaje)
    switch(juego)
    {
      case 'P':
        this.afs.collection('usuarios').doc(this.uidUser).update({MayorPPreguntados:puntaje})
        break;

      case 'M':
        this.afs.collection('usuarios').doc(this.uidUser).update({MayorPMayorMenor:puntaje})
        break;

      case 'S':
        this.afs.collection('usuarios').doc(this.uidUser).update({MayorPPropio:puntaje})
        break;

      case 'A':
        this.afs.collection('usuarios').doc(this.uidUser).update({MayorPAhorcado:this.UsuarioActivo.MayorPAhorcado + puntaje})
        break;
    }
  }

  async completoEncuesta()
  {
    this.afs.collection('usuarios').doc(this.uidUser).update({completoEncuesta:true})
  }

  agregarLogin(user : any)
  {
    var login = 
    {
      usuario:user.nombre_usuario,
      fecha:this.formatDate(new Date())
    }

    this.afs.collection('/Ingresos').add(login)
  }

  formatDate = (date: any) => {
    return date.toLocaleString()
  }

  async RecuperarUsuario()
  {
    var retorno:any = false;
    var user = localStorage.getItem('user');
    if(user)
    {
      var Usuario = JSON.parse(user)
      retorno = await this.afAuth.signInWithEmailAndPassword(Usuario.email, Usuario.password)
      this.uidUser=retorno.user.uid
      if(retorno)
      {
        await (this.afs.collection('usuarios').doc( this.uidUser).get().toPromise().then(doc =>{
          this.afs.collection('usuarios').doc( this.uidUser).valueChanges().subscribe(usuario =>{
            this.agregarLogin(usuario)
            this.UsuarioActivo = usuario
          })
        }));
      }
      else
      {
        retorno=null;
      }
    }
    
    
    return retorno;
  }

  LogOut()
  {
    localStorage.removeItem('user')
    this.afAuth.signOut();
    this.toastr.success("Usuario deslogueado!", 'Exito');
    this.router.navigate(['']);
  }

  ObtenerTopPreguntados()
  {
    this.Preguntados = this.afs.collection('usuarios', ref => ref.orderBy('MayorPPreguntados').limit(5))
    return this.Preguntados.valueChanges().subscribe(puntajes =>
      {
        this.PreguntadosP = []
        puntajes.forEach(puntaje => {
          this.PreguntadosP.unshift(puntaje);
        });

      })
  }

  ObtenerTopSnake()
  {
    this.Snake = this.afs.collection('usuarios', ref => ref.orderBy('MayorPPropio').limit(5))
    return this.Snake.valueChanges().subscribe(puntajes =>
      {
        this.SnakeP = []
        puntajes.forEach(puntaje => {
          this.SnakeP.unshift(puntaje);
        });

      })
  }

  ObtenerTopMayor()
  {
    this.Mayor = this.afs.collection('usuarios', ref => ref.orderBy('MayorPMayorMenor').limit(5))
    return this.Mayor.valueChanges().subscribe(puntajes =>
      {
        this.MayorP = []
        puntajes.forEach(puntaje => {
          this.MayorP.unshift(puntaje);
        });

      })
  }

  ObtenerTopAhorcado()
  {
    this.Ahorcado = this.afs.collection('usuarios', ref => ref.orderBy('MayorPAhorcado').limit(5))
    return this.Ahorcado.valueChanges().subscribe(puntajes =>
      {
        this.AhorcadoP = []
        puntajes.forEach(puntaje => {
          this.AhorcadoP.unshift(puntaje);
        });

      })
  }
}


