import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';

// Services
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

// Sweet Alert
declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  desde: number = 0;
  usuarios: Usuario[] = [];
  cargando: boolean = true;
  totalRegistros: number = 0;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(() => this.cargarUsuarios());
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this.totalRegistros = resp.total;

      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros || desde < 0) { return; }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino).subscribe((usuario: Usuario[]) => {
      this.usuarios = usuario;
      this.cargando = false;
    },
      ((error: any) => {
        this.cargando = false;
        console.log('Error al buscar usuarios', error);
      })
    );
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe((borrado: boolean) => {
          this.desde = 0;
          this.cargarUsuarios();
        });
      }

    });

  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }

}
