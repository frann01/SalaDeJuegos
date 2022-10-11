import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonPreguntadosService {

  constructor() { }
  pokemones:any[]=[];

  ObtenerPaises()
  {
    fetch("https://pokeapi.co/api/v2/pokemon").
    then(res => res.json()).then(res => 
      {
        res.results.forEach( (pokemones: any) => {
          this.pokemones.push(pokemones);
        });


        fetch(res.next).
        then(res => res.json()).then(res => 
        {
          res.results.forEach( (pokemones: any) => {
            this.pokemones.push(pokemones);
          });
          fetch(res.next).
          then(res => res.json()).then(res => 
            {
              res.results.forEach( (pokemones: any) => {
                this.pokemones.push(pokemones);
              });

              fetch(res.next).
              then(res => res.json()).then(res => 
                {
                  res.results.forEach( (pokemones: any) => {
                    this.pokemones.push(pokemones);
                  });
                  console.log(this.pokemones)
                  fetch(res.next).
                  then(res => res.json()).then(res => 
                    {
                      res.results.forEach( (pokemones: any) => {
                        this.pokemones.push(pokemones);
                      });
                  console.log(this.pokemones)
                  fetch(res.next).
                  then(res => res.json()).then(res => 
                    {
                      res.results.forEach( (pokemones: any) => {
                        this.pokemones.push(pokemones);
                      });
                      console.log(this.pokemones)
                    })
                })
                })
              
            })
          
        })
      })
  }
}
