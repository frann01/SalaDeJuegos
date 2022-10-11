import { Propio1Component } from './pages/propio1/propio1.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { AhorcadoComponent } from './pages/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './pages/mayor-menor/mayor-menor.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { PreguntadosComponent } from './pages/preguntados/preguntados/preguntados.component';
import { DatosUsuarioComponent } from './datos-usuario/datos-usuario.component';
import { LoginGuard } from './guards/login.guard';
import { ChatGuard } from './guards/chat.guard';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { ResultadosEncuestaComponent } from './pages/resultados-encuesta/resultados-encuesta.component';
import { AdminGuard } from './guards/admin.guard';
import { EncuestaCompletadaGuard } from './guards/encuesta-completada.guard';
import { PuntajesComponent } from './pages/puntajes/puntajes.component';



const routes: Routes = [{path:"login", component:LoginComponent},
{path:"puntajes", component:PuntajesComponent},
{path:"usuario", component:DatosUsuarioComponent, canActivate:[LoginGuard]},
{path:"encuesta", component:EncuestaComponent, canActivate:[LoginGuard, EncuestaCompletadaGuard]},
{path:"resultados/encuesta", component:ResultadosEncuestaComponent, canActivate:[LoginGuard, AdminGuard]},
{path:"", component:HomeComponent},
{path:"registrar", component:RegistroComponent},
{path:"acercaDe", component:AcercaDeComponent},
{path:"ahorcado", component:AhorcadoComponent},
{path:"mayor-menor", component:MayorMenorComponent},
{path:"chat", component:ChatPageComponent, canActivate:[LoginGuard]},
{path:"preguntados", component:PreguntadosComponent},
{path:"snake", component:Propio1Component}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
