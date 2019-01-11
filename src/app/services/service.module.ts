import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuard,
  SubirArchivoService,
  HospitalService,
  MedicoService
} from './services.index';

import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoginGuard,
    MedicoService,
    SharedService,
    SidebarService,
    UsuarioService,
    HospitalService,
    SettingsService,
    ModalUploadService,
    SubirArchivoService
  ]
})
export class ServiceModule { }
