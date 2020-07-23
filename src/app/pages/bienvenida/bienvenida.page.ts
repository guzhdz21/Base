import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Usuario } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { FireService } from '../../services/fire.service';
import { Subscription, interval } from 'rxjs';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {

  UsuarioLocal: Usuario;
  usuarios: Usuario[];
  usuario: Usuario;
  backButtonSub: Subscription;

  timer;
  timerSub;

  constructor(private storage: StorageService,
              private router: Router,
              private fireService: FireService,
              private plt: Platform) { }

  async ngOnInit() {
    await this.storage.cargarUsuario().then(res => {
      this.UsuarioLocal = res;
      this.fireService.getAllUsuarios().then(res2 => {
        res2.subscribe(val => {
          if(res) {
            for(var user of val) {
              if(user.numero == res.numero && user.contraseña == res.contraseña) {
                this.usuario = user;
                return;
              }
            }
          }
        });
      });
    });

    this.timer = interval(1000);
    this.timerSub = this.timer.subscribe(x => {
      if(this.usuario) {
        if(this.usuario.numero == this.UsuarioLocal.numero && this.usuario.contraseña == this.UsuarioLocal.contraseña) {
          this.UsuarioLocal = this.usuario;
          this.storage.guardarNacimiento(this.usuario.nacimiento.toDate().toISOString());
          // @ts-ignore
          this.storage.guardarId(this.usuario.id);
          this.seleccionarHome(this.usuario.tipo);
          this.timerSub.unsubscribe();
          return;
        }
      } else {
        this.router.navigate(["/login"]);
        this.timerSub.unsubscribe();
      }
    });
  }
  
  seleccionarHome(tipo: string) {
    switch (tipo) {
      case 'Elemento seguridad': {
        this.router.navigate(["/home-guardia"]);
        break;
      }
      case 'Recursos humanos': {
        this.router.navigate(["/home-rh"]);
        break;
      }
    }
    return;
  }

  async ionViewDidEnter() {
    this.backButtonSub = this.plt.backButton.subscribeWithPriority( 10000, async () => {});
  }
}
