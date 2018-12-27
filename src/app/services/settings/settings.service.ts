import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    tema: 'default',
    temaUrl: 'assets/css/colors/default.css'
  };

  constructor(
    @Inject(DOCUMENT) private _document) {

    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    } else {
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema(theme: string) {

    const url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url);

    this.ajustes.tema = theme;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();
  }

}

interface Ajustes {
  tema: string;
  temaUrl: string;
}
