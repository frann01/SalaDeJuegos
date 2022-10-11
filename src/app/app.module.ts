import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { environment } from "./../environments/environment";
import { AhorcadoComponent } from './pages/ahorcado/ahorcado.component';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { MayorMenorComponent } from './pages/mayor-menor/mayor-menor.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { PreguntadosComponent } from './pages/preguntados/preguntados/preguntados.component';
import { Propio1Component } from './pages/propio1/propio1.component';
import { DatosUsuarioComponent } from './datos-usuario/datos-usuario.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { ResultadosEncuestaComponent } from './pages/resultados-encuesta/resultados-encuesta.component';
import { PuntajesComponent } from './pages/puntajes/puntajes.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistroComponent,
    AcercaDeComponent,
    AhorcadoComponent,
    MayorMenorComponent,
    ChatPageComponent,
    PreguntadosComponent,
    Propio1Component,
    DatosUsuarioComponent,
    EncuestaComponent,
    ResultadosEncuestaComponent,
    PuntajesComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
     AngularFireAuthModule,
     provideFirestore(() => getFirestore()),
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
