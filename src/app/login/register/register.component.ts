import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// SweetAlert
import swal from 'sweetalert';
import { UsuarioService } from '../../services/services.index';

// Model
import { Usuario } from 'src/app/models/usuario.model';


// Plugins
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../login.component.css']
})

export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2') });

    this.forma.setValue({
      nombre: 'Test',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      return {
        sonIguales: true
      };
    };
  }

  registrarUsuario() {

    // if (this.forma.invalid) {
    //   return;
    // }

    if (!this.forma.value.condiciones) {
      swal('Importante', 'Deve de aceptar las condiciones', 'warning');
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
    );

    this._usuarioService.crearUsuario(usuario).subscribe(resp => this.router.navigate(['/login']));

  }

}
