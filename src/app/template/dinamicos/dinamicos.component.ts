import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona{
  nombre: string;
  favoritos: Favorito[]
}

interface Favorito{
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent  {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  persona: Persona = {
    nombre: 'Fernando',
    favoritos: [
      {id: 1, nombre: 'Metal Gear'},
      {id: 2, nombre: 'DeathStranding'}
    ]
  } 

  nuevoJuego:string = '';

  nombreValido(){
    return this.miFormulario?.controls['nombre']?.touched &&
           this.miFormulario?.controls['nombre']?.invalid
  }

  agregarJuego(){
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }

    this.persona.favoritos.push({...nuevoFavorito});
    this.nuevoJuego='';
  }
  eliminar(index: number){
    this.persona.favoritos.splice(index, 1)
  }
  guardar() {
    console.log('Formulario posteado')
  }

}
