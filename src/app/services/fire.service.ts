import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  private usuariosColletion: AngularFirestoreCollection<Usuario>;
  private usuarios: Observable<Usuario[]>; 

  constructor(db: AngularFirestore) { 
    this.usuariosColletion = db.collection<Usuario>('usuarios');

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

  getAllUsuarios() {
    return this.usuarios;
  }

  getUsuario(id: string) {
    return this.usuariosColletion.doc<Usuario>(id).valueChanges();
  }

  updateUsuario(usuario: Usuario, id: string) {
    return this.usuariosColletion.doc(id).update(usuario);
  }

  addUsuario(usuario: Usuario) {
    return this.usuariosColletion.add(usuario);
  }

  removeUsuario(id: string) {
    return this.usuariosColletion.doc(id).delete()
  }

}
