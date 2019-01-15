import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// Config
import { URL_SERVICIOS } from '../../config/config';

// Models
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  medicos: Medico[] = [];
  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];

  constructor(
    public http: HttpClient,
    public activatedRoute: ActivatedRoute,
  ) {
    activatedRoute.params.subscribe((params: any) => {
      let termino = params['termino'];
      this.buscar(termino);
    });
  }

  ngOnInit() {
  }

  buscar(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url).subscribe((resp: any) => {
      this.medicos = resp.medicos;
      this.usuarios = resp.usuarios;
      this.hospitales = resp.hospitales;
    });
  }

}
