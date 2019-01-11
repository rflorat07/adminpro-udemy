import { Component, OnInit } from '@angular/core';

// Models
import { Medico } from 'src/app/models/medico.model';

// Services
import { MedicoService } from '../../services/medico/medico.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  desde: number = 0;
  medicos: Medico[] = [];
  cargando: boolean = true;
  totalRegistros: number = 0;

  constructor(
    private _medicoService: MedicoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
    this._modalUploadService.notificacion.subscribe(() => this.cargarMedicos());
  }

  cargarMedicos() {

    this.cargando = true;

    this._medicoService.cargarMedicos(this.desde).subscribe((resp: any) => {

      this.medicos = resp.medicos;
      this.totalRegistros = resp.total;

      this.cargando = false;

    }, (error) => this.cargando = false);
  }

  actualizarImagen(id: string) {
    this._modalUploadService.mostrarModal('medicos', id);
  }

  buscarMedico(termino: string) {

    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;
    this._medicoService.buscarMedico(termino).subscribe((medicos: Medico[]) => {

      this.medicos = medicos;
      this.cargando = false;
    },
      ((error: any) => {
        this.cargando = false;
        console.log('Error al buscar médicos', error);
      })
    );
  }

  borrarMedico(medico: Medico) {
    this._medicoService.borrarMedico(medico._id).subscribe(() => {
      this.desde = 0;
      this.cargarMedicos();
    });

  }

  cambiarDesde(valor: number) {

    let desde = this.desde + valor;

    if (desde >= this.totalRegistros || desde < 0) { return; }

    this.desde += valor;
    this.cargarMedicos();
  }

}
