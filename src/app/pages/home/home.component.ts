import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import jwt_decode from "jwt-decode";
import { SonidosService } from 'src/app/services/sonidos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService:AuthService, public sonido:SonidosService) { }
  usuarioMail:any;
  currentUser:any;

  ngOnInit(): void {

  }

}
