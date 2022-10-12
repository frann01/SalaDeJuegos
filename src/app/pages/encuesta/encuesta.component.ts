import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  public forma!: FormGroup;
  constructor( private AuthSrv : AuthService,private afs : AngularFirestore,private fb: FormBuilder,private toastr: ToastrService,private router: Router) 
  {
    this.forma = this.fb.group({
      'nombre': ['', [Validators.required, this.spacesValidator]],
      'apellido': ['', [Validators.required, this.spacesValidator]],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99),Validators.pattern("^[0-9]*$")]],
      'telefono': ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      'sexo': ['', Validators.required],
      'recomendar': ['', Validators.required],
      'juegoFav': ['', Validators.required],
      'slider': ['', Validators.required],
      'compartir': ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  pais:any=null;
  nombre:string='';
  apellido:string='';
  fecha_nacimiento:string='';
  sexo:string='';
  respuesta:any={};
  pais_nombre='';
  juegoFav:any;
  experiencia:any = "Buena";

  private spacesValidator(control: AbstractControl): null | object {
    const palabra = <string>control.value;
    const spaces = palabra.includes(' ');

    return spaces
      ? { containsSpaces: true }
      : null; 
  }

  agregarRespuesta()
  {
    if(this.forma.invalid || !this.forma.controls.compartir.value)
    {
      this.toastr.error("Debe compeltar todos los campos con el formato correcto!", 'Error')
    }
    else
    {
      let id = this.afs.createId();
      console.info(id);
      this.respuesta =
      {
        nombre: this.forma.get('nombre')!.value,
        apellido:this.forma.get('apellido')!.value,
        edad:this.forma.get('edad')!.value,
        sexo:this.forma.get('sexo')!.value,
        recomienda:this.forma.get('recomendar')!.value,
        juegoFav:this.forma.get('juegoFav')!.value,
        experiencia: this.experiencia,
        telefono: this.forma.get('telefono')!.value,
        fecha: this.formatDate(new Date())
      }
      console.log(this.respuesta)
      
      this.afs.collection('/RespuestasEncuesta').add(this.respuesta).then(()=>
      {
        this.AuthSrv.completoEncuesta()
        this.toastr.success("Respuesta guardada, Muchas gracias por responder!", 'Exito');
        this.router.navigate(['']);
      })
    }
    
  }

  formatDate = (date: any) => {
    return date.toLocaleString()
  }

  valorSlide()
  {
    console.log(this.forma.get('slider')!.value)
    switch(this.forma.get('slider')!.value)
    {
      case 0:
        this.experiencia = "Mala"
        break;

        case 1:
          this.experiencia = "Decente"
        break;

        case 2:
          this.experiencia = "Buena"
        break;

        case 3:
          this.experiencia = "Muy Buena"
        break;
    }
  }

}
