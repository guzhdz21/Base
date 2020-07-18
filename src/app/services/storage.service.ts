import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  usuarioLocal: Usuario = null;
  nacimiento: string = null;
  id: string = null;

  constructor(private storage: Storage) { }

  guardarUsuario(usuario: Usuario) {
    this.usuarioLocal = usuario;
    this.storage.set('Usuario', this.usuarioLocal);
  }

  async cargarUsuario() {
    const user = await this.storage.get('Usuario');
    this.usuarioLocal = user;
    return this.usuarioLocal;
  }

  async eliminarUsuario() {
    this.storage.set('Usuario', null);
  }

  guardarNacimiento(fecha: string) {
    this.nacimiento = fecha;
    this.storage.set('Nacimiento', fecha);
  }

  async cargarNacimiento() {
    const fecha = await this.storage.get('Nacimiento');
    this.nacimiento = fecha;
    return this.nacimiento;
  }

  async eliminarNacimiento() {
    this.storage.set('Nacimiento', null);
  }

  guardarId(id: string) {
    this.id = id;
    this.storage.set('Id', id);
  }

  async cargarId() {
    const id = await this.storage.get('Id');
    this.id = id;
    return this.id;
  }

  async eliminarId() {
    this.storage.set('Id', null);
  }
}
