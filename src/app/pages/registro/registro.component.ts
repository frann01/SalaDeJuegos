import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from 'src/app/compartida/usuario';
import { AuthService } from '../../services/auth.service';
import { ParseFlags } from '@angular/compiler';
import { async, timeout } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user : User = new User();
  listadoDeUsuarios : string[]=[];
  registrado = false;
  vacio = false;
  largoContrasena=false;
  foto:any;

  constructor(private authService:AuthService, private router: Router,private toastr: ToastrService) {
    
  }

  ngOnInit(): void {
  }

  email="";
  clave="";
  copiaClave="";
  nombre_usuario="";


  async Registrar()
  {
    if(this.email !="" && this.clave !="" && this.copiaClave != "" && this.foto != null && this.nombre_usuario !="")
    { 
      if(this.clave.length >=6)
      {
        if(this.clave == this.copiaClave)
        {
          if(await this.ChequearEmail(this.email)==false)
          {
            console.log("registrando");
            this.toastr.success('', 'Registrando')
            this.user.email=this.email;
            this.user.password = this.clave
            this.user.nombre_usuario = this.nombre_usuario
            this.user.foto = this.foto

              const user = await this.authService.onRegister(this.user)
              if(user)
                {
                  this.email="";
                  this.clave="";
                  this.copiaClave="";
                  this.nombre_usuario="";
                  console.log('Exito! Usuario Registrado')
                  this.toastr.success('Usuario Registrado', 'Exito')
                  setTimeout(async () => {
                    const user = await this.authService.onLogin(this.user)
                    if(user)
                    {
                      console.info("usuario encontrado: ", user);
                      this.toastr.success("Ingreso exitoso!", 'Exito');
                      this.router.navigate(['']);
                    }
                    else
                    {
                      this.toastr.error("Hubo un error", 'Error')
                    }
                
                  }, 3000);
                }

          }
          else
          {
            this.toastr.error("La direccion de correo ya esta en uso!", 'Error')
          }
          
        }
        else
        {
          this.toastr.error("Las contraseñas deben coincidir!", 'Error')
        }
      }
      else
      {
        this.toastr.error("Contraseña debe tener mas de 6 digitos!", 'Error')
      }
    }
    else
    {
      this.toastr.error("Debe llenar todos los campos!", 'Error')
    }
  }

  async ChequearEmail(email:string) : Promise<boolean>
  {
    let flag=false;
    await this.authService.afAuth.fetchSignInMethodsForEmail(this.email).then((result) => {
      console.log(result);
      if(result.length!=0)
      {
        flag = true;
      }
    });
    console.log(flag);
    return flag;
  }

  elegirFoto(event:any)
  {
    this.foto = event.target.files[0];
    console.log(this.foto)
  }

}
