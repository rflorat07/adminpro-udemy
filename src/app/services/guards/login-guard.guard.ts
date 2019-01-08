import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService) { }

  canActivate() {
    if (this._usuarioService.estaLogueado()) {
      console.log('Paso el guard');
      return true;
    } else {
      console.log('Bloqueada por guard');
      this.router.navigate(['/login']);
      return false;
    }
  }

}
