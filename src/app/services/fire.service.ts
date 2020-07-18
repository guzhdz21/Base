import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario, Seguridad, Cliente, Asistencia } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  private usuariosColletion: AngularFirestoreCollection<Usuario>;
  private usuarios: Observable<Usuario[]>;

  private seguridadColletion: AngularFirestoreCollection<Seguridad>;
  private seguridad: Observable<Seguridad[]>;

  private clientesColletion: AngularFirestoreCollection<Cliente>;
  private clientes: Observable<Cliente[]>;

  private asistenciasColletion: AngularFirestoreCollection<Asistencia>;
  private asistencias: Observable<Asistencia[]>;

  constructor(private db: AngularFirestore) {
  }

  fireUsuario() {
    this.usuariosColletion = this.db.collection<Usuario>('usuarios');
    this.usuarios = this.usuariosColletion.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  async getAllUsuarios() {
    await this.fireUsuario();
    return this.usuarios;
  }

  async getUsuario(id: string) {
    await this.fireUsuario();
    return this.usuariosColletion.doc<Usuario>(id).valueChanges();
  }

  async updateUsuario(usuario: Usuario, id: string) {
    await this.fireUsuario();
    return this.usuariosColletion.doc(id).update(usuario);
  }

  async addUsuario(usuario: Usuario) {
    await this.fireUsuario();
    return this.usuariosColletion.add(usuario);
  }

  async removeUsuario(id: string) {
    await this.fireUsuario();
    return this.usuariosColletion.doc(id).delete()
  }

  fireSeguridad() {
    this.seguridadColletion = this.db.collection<Seguridad>('seguridad');

    this.seguridad = this.seguridadColletion.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  async getAllSeguridad() {
    await this.fireSeguridad();
    return this.seguridad;
  }

  async getSegridad(id: string) {
    await this.fireSeguridad();
    return this.seguridadColletion.doc<Seguridad>(id).valueChanges();
  }

  async updateSeguridad(seguridad: Seguridad, id: string) {
    await this.fireSeguridad();
    return this.seguridadColletion.doc(id).update(seguridad);
  }

  async addSeguridad(seguridad: Seguridad) {
    await this.fireSeguridad();
    return this.seguridadColletion.add(seguridad);
  }

  async removeSeguridad(id: string) {
    await this.fireSeguridad();
    return this.usuariosColletion.doc(id).delete()
  }

  fireCliente() {
    this.clientesColletion = this.db.collection<Cliente>('cliente');

    this.clientes = this.clientesColletion.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  async getAllClientes() {
    await this.fireCliente();
    return this.clientes;
  }

  async getClientes(id: string) {
    await this.fireCliente();
    return this.clientesColletion.doc<Cliente>(id).valueChanges();
  }

  async updateClientes(cliente: Cliente, id: string) {
    await this.fireCliente();
    return this.clientesColletion.doc(id).update(cliente);
  }

  async addClientes(cliente: Cliente) {
    await this.fireCliente();
    return this.clientesColletion.add(cliente);
  }

  async removeClientes(id: string) {
    await this.fireCliente();
    return this.clientesColletion.doc(id).delete()
  }

  fireAsistencias() {
    this.asistenciasColletion = this.db.collection<Asistencia>('asistencias');

    this.asistencias = this.asistenciasColletion.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  async getAllAsistencias() {
    await this.fireAsistencias();
    return this.asistencias;
  }

  async addAsistencias(asistencia: Asistencia) {
    await this.fireAsistencias();
    return this.asistenciasColletion.add(asistencia);
  }

}
