import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

// Services
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  canActivate(): Promise<boolean> | boolean {

    let token = this._usuarioService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));
    let expirado = this.expirado(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenueva(payload.exp);
  }


  verificaRenueva(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {

      let ahora = new Date();
      let tokenExp = new Date(fechaExp * 1000);

      ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000));

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this._usuarioService.renuevaToken().subscribe(() => {
          resolve(true);
        }, () => {
          reject(false);
          this.router.navigate(['/login']);
        });
      }
    });
  }

  expirado(fechaExp: number) {

    let ahora = new Date().getTime() / 1000;

    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }

  }
}
