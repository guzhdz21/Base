import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { firestore } from 'firebase/app';
import { FireService } from '../../services/fire.service';
import Timestamp = firestore.Timestamp;

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage implements OnInit {

  numero: number;
  nacimiento: Date;
  usuarios: Usuario[];
  nacimientoV: boolean = true;

  constructor(private fireService: FireService) { 
  }

  ngOnInit() {
    this.fireService.getAllUsuarios().subscribe(res => {
      this.usuarios = res;
    });
  }

  nacimientoChange(event) {
    var n = new Date(event.detail.value);
    var dia = n.getDate();
    var mes = n.getMonth();
    var año = n.getFullYear();
    this.nacimiento = new Date(año, mes, dia, 0, 0 , 0, 0);
    this.nacimientoV = false;
  }

  recuperar() {
    if(this.usuarios[0].nacimiento.toDate().toUTCString() == this.nacimiento.toUTCString()) {
      console.log("recuperada");
    } else {
      console.log("no coincide");
    }
  }
}
