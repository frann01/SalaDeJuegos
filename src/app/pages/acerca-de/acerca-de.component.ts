import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  constructor() {
    this.ObtenerDatos()
   }

  ngOnInit(): void {
    
  }

  usuario:any;
  ObtenerDatos(): Promise<any[]>
  {
    return fetch("https://api.github.com/users/frann01").
    then(res => res.json())
    .then(res => 
      {
        this.usuario=res
        return res;
      })
  }

}
