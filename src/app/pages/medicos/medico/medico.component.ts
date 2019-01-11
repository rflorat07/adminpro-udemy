import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Models
import { Medico } from '../../../models/medico.model';
import { Hospital } from '../../../models/hospital.model';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';

// Services
import { HospitalService } from '../../../services/hospital/hospital.service';
import { MedicoService } from '../../../services/medico/medico.service';



@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  hospital: Hospital = new Hospital('');
  medico: Medico = new Medico('', '', '', '');

  constructor(
    public router: Router,
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {

      let id = params['id'];
      if (id !== 'nuevo') { this.cargarMedico(id); }

    });
  }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe((resp: any) => {
      this.medico.img = resp.medico.img;
    });
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id).subscribe((medico) => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  guardarMedico(f: NgForm) {

    if (f.invalid) { return; }

    this._medicoService.guardarMedico(this.medico).subscribe((medico: any) => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales().subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
    });
  }

  cambioHospital(id: string) {
    this._hospitalService.obtenerHospital(id).subscribe((hospital: any) => this.hospital = hospital);

  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
