import { Component, OnInit } from '@angular/core';
import { FireService } from '../../services/fire.service';
import { Usuario } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { AccionesService } from '../../services/acciones.service';
import { RecuperarPasswordPage } from '../recuperar-password/recuperar-password.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  visible: string = "eye-off";
  passwordV: string = "password";

  numero: number;
  password: string;
  usuarios: Usuario[];
  usuario: Usuario;
  idUsuario: string;

  logInvalido: boolean = false;

  constructor(private fireService: FireService,
              private router: Router,
              private accionesService: AccionesService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.fireService.getAllUsuarios().subscribe(res => {
      this.usuarios = res;
    })
  }

  passwordVisible() {
    if(this.visible == "eye") {
      this.visible = "eye-off";
      this.passwordV = "password";
    } else {
      this.visible = "eye";
      this.passwordV = "text";
    }
  }

  async login() {
    await this.accionesService.presentLoading("Cargando...", 800);

    for(var user of this.usuarios) {
      if(user.numero == this.numero && user.contraseña == this.password) {
        this.usuario = user;
        this.idUsuario = user.id;
        await this.accionesService.presentLoading("Entrando...", 900);
        console.log('bienvenido ' + this.idUsuario);
        this.logInvalido = false;
        this.router.navigate(["/home"]);
        return;
      }
    }

    this.logInvalido = true;
    this.password = "";
  }

  async restablecer() {
    const modal = await this.modalCtrl.create({
      component: RecuperarPasswordPage
    });
    await modal.present();
  }
}
