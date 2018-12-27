import { Component, OnInit } from '@angular/core';

// Services
import { SettingsService } from '../../services/services.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _ajustes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(theme: string, link: any) {
    this.aplicarCheck(link);
    this._ajustes.aplicarTema(theme);
  }

  aplicarCheck(link: any) {

    const selectores: any = document.getElementsByClassName('selector');

    for (const ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');

  }

  colocarCheck() {
    const theme = this._ajustes.ajustes.tema;
    const selectores: any = document.getElementsByClassName('selector');

    for (const ref of selectores) {
      if (ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
