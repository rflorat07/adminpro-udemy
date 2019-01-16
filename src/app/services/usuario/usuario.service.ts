import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// Model
import { Usuario } from '../../models/usuario.model';

// Config
import { URL_SERVICIOS } from '../../config/config';

// rxjs
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


// SweetAlert
import swal from 'sweetalert';

// Services
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {

  token: string;
  usuario: Usuario;
  menu: any[] = [];

  constructor(
    public router: Router,
    public http: HttpClient,
    public _subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken' + '?token=' + this.token;

    return this.http.get(url).pipe(
      map((resp: any) => {
        this.token = resp.token;
        localStorage.setItem('token', this.token);
        return true;
      }),
      catchError((error: any) => {
        this.router.navigate(['/login']);
        swal('No se pudo renovar token', 'No fue posible renovar el token', 'error');
        return throwError(error);
      })
    );
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.menu = JSON.parse(localStorage.getItem('menu'));
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.menu = [];
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.menu = menu;
    this.token = token;
    this.usuario = usuario;
  }

  logout() {
    this.token = '';
    this.menu = [];
    this.usuario = null;

    localStorage.removeItem('menu');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token }).pipe(map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
      return true;
    }));
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      }),
      catchError((error: any) => {
        swal('Error en el login', error.error.mensaje, 'error');
        return throwError(error);
      })
    );
  }

  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }),
      catchError((error: any) => {
        swal(error.error.mensaje, error.error.errors.message, 'error');
        return throwError(error);
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {

        if (usuario._id === this.usuario._id) {
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
        }

        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      }),
      catchError((error: any) => {
        swal(error.error.mensaje, error.error.errors.message, 'error');
        return throwError(error);
      }));
  }


  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id).then((resp: any) => {
      this.usuario.img = resp.usuario.img;
      swal('Imagen Actualizada', this.usuario.nombre, 'success');
      this.guardarStorage(id, this.token, this.usuario, this.menu);

    })
      .catch((resp) => {
        console.log(resp);
      });
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.usuarios));
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete(url).pipe(map((resp) => {
      swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
      return true;
    }));
  }

}
