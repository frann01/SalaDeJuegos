import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from 'src/app/compartida/usuario';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
  }

  email="";
  clave="";
  user : User = new User();

  async Ingresar()
  {
    if(this.clave !="" && this.email !="")
    {
        this.user.email=this.email;
        this.user.password = this.clave;
        
          try
          {
            const user = await this.authService.onLogin(this.user)
            if(user)
            {
              console.info("usuario encontrado: ", user);
              this.toastr.success("Ingreso exitoso!", 'Exito');
              this.router.navigate(['']);
            }
            else
            {
              this.toastr.error("Usuario y/o contraseña incorrectos", 'Error')
            }
          }
          catch(error)
          {
            this.toastr.error("Usuario y/o contraseña incorrectos", 'Error')
          }
          
    }
    else
    {
      this.toastr.error("Ingrese todos los datos", 'Error')
    }
  }

  Perfil1()
  {
    this.email="franszellner@gmail.com";
    this.clave = '123456';
  }

  async Perfil2()
  {
    this.email="usuario@gmail.com";
    this.clave = '123456';
  }

  
}
