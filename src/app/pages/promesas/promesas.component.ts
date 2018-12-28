import { Component, OnInit } from '@angular/core';
import { resolve } from 'url';
import { reject } from 'q';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then(
      (mesaje) => console.log('Termino!', mesaje)
    ).catch(error => console.error('Error en la promesa', error));

  }

  ngOnInit() {
  }

  contarTres(): Promise<Boolean> {

    return new Promise((resolve, reject) => {

      let contador = 0;

      const intervalo = setInterval(() => {

        contador += 1;
        console.log(contador);

        if (contador === 3) {
          resolve(true);
          // reject('Solo un error');
          clearInterval(intervalo);
        }

      }, 1000);
    });

  }

}
