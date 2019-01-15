import { Component, OnInit } from '@angular/core';

// Models
import { Hospital } from '../../models/hospital.model';

// Services
import { HospitalService } from '../../services/services.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  desde: number = 0;
  hospitales: Hospital[] = [];
  cargando: boolean = true;
  totalRegistros: number = 0;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(() => this.cargarHospitales());
  }

  actualizarImagen(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales(this.desde).subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
      this.totalRegistros = resp.total;

      this.cargando = false;

    }, (error) => this.cargando = false);
  }

  buscarHospital(termino: string) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this._hospitalService.buscarHospital(termino).subscribe((hospitales: Hospital[]) => {

      this.hospitales = hospitales;
      this.cargando = false;
    },
      ((error: any) => {
        this.cargando = false;
        console.log('Error al buscar hospitales', error);
      })
    );
  }

  borrarHospital(hospital: Hospital) {
    this._hospitalService.borrarHospital(hospital._id).subscribe(() => {
      this.desde = 0;
      this.cargarHospitales();
    });

  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  cambiarDesde(valor: number) {

    let desde = this.desde + valor;

    if (desde >= this.totalRegistros || desde < 0) { return; }

    this.desde += valor;
    this.cargarHospitales();
  }

  crearHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }

      this._hospitalService.crearHospital(valor).subscribe(() => this.cargarHospitales());

    });
  }

}
