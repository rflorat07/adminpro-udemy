import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Models
import { Hospital } from '../../models/hospital.model';

// Config
import { URL_SERVICIOS } from '../../config/config';

// SweetAlert
import swal from 'sweetalert';

// Services
import { UsuarioService } from '../usuario/usuario.service';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

// rxjs
import { map } from 'rxjs/operators';

@Injectable()
export class HospitalService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public _subirArchivoService: SubirArchivoService) { }

  cargarHospitales(desde: number = 0) {
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url);
  }

  buscarHospital(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.hospitales));
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;
    return this.http.put(url, hospital).pipe(map((resp: any) => {
      swal('Hospital actualizado', hospital.nombre, 'success');
      return resp.hospital;
    }));
  }

  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url).pipe(map((resp: any) => resp.hospital));
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete(url).pipe(map((resp: any) => {
      swal('Hospital Borrado', 'Eliminado correctamente', 'success');
    }));
  }

  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + '/hospital/' + '?token=' + this._usuarioService.token;
    return this.http.post(url, { nombre }).pipe(map((resp: any) => resp.hospital));
   }

}
