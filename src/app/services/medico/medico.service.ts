import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

// Models
import { Medico } from '../../models/medico.model';

// Config
import { URL_SERVICIOS } from '../../config/config';

// Services
import { UsuarioService } from '../usuario/usuario.service';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public _subirArchivoService: SubirArchivoService) { }

  cargarMedicos(desde: number = 0) {
    let url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get(url);
  }

  cargarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url).pipe(map((resp: any) => resp.medico));
  }

  buscarMedico(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.medicos));
  }

  obtenerMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url).pipe(map((resp: any) => resp.medico));
  }

  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete(url).pipe(map((resp: any) => {
      swal('Médico Borrado', 'Eliminado correctamente', 'success');
    }));
  }

  guardarMedico(medico: Medico) {

    if (medico._id) {
      // Actualizando
      let url = URL_SERVICIOS + '/medico/' + medico._id + '?token=' + this._usuarioService.token;

      return this.http.put(url, medico).pipe(map((resp: any) => {
        swal('Médico actualizado', medico.nombre, 'success');
        return resp.medico;
      }));

    } else {
      // Creando
      let url = URL_SERVICIOS + '/medico/' + '?token=' + this._usuarioService.token;

      return this.http.post(url, medico).pipe(map((resp: any) => {
        swal('Médico Creado', medico.nombre, 'success');
        return resp.medico;
      }));
    }


  }

}
