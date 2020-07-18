import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { FireService } from '../../services/fire.service';
import { AccionesService } from '../../services/acciones.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage implements OnInit {

  numero: number;
  nacimiento: Date;
  dateTime: Date;
  usuarios: Usuario[];
  nacimientoV: boolean = true;

  textoError: string;
  error: boolean = false;

  backButtonSub: Subscription;

  constructor(private fireService: FireService,
              private accionesService: AccionesService,
              private router: Router,
              private plt: Platform) { 
  }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.fireService.getAllUsuarios().then(res => {
      res.subscribe(val => {
        this.usuarios = val;
      })
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

  async recuperar() {
    this.error = false;
    for(var user of this.usuarios) {
      if(this.numero == user.numero) {
        if(this.nacimiento.toUTCString() == user.nacimiento.toDate().toUTCString()) {
          await this.accionesService.presentLoading("Recuperando...", 1000)
          await this.accionesService.presentAlertGenerica("Recuperacion", "Tu contraseña es: " + 
          user.contraseña + ", asegurate de guardarla o memorizarla");
          this.router.navigate(["/login"]);
          return;
        }
        this.textoError = "El numero de empleado y la fecha de nacimiento no concuerdan, revisalos bien e intenta de nuevo";
        this.error = true;
        this.dateTime = null;
        this.nacimiento = null;
        return;
      }
    }

    this.error = true;
    this.textoError = "El numero de empleado no esta registrado";
    this.numero = null;
    this.dateTime = null;
    this.nacimiento = null;
  }

  async ionViewDidEnter() {
    this.backButtonSub = this.plt.backButton.subscribeWithPriority( 10000, async () => {
      this.router.navigate(["/login"]);
    });
  }
}
