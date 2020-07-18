import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Usuario } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { FireService } from '../../services/fire.service';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {

  UsuarioLocal: Usuario;
  backButtonSub: Subscription;

  constructor(private storage: StorageService,
              private router: Router,
              private fireService: FireService,
              private plt: Platform) { }

  async ngOnInit() {
    this.UsuarioLocal = await this.storage.cargarUsuario();
    await this.checarUsuario();
  }

  async checarUsuario() {
    await this.fireService.getAllUsuarios().then(res => {
      res.subscribe(val => {
        if(this.UsuarioLocal != null) {
          for(var user of val) {
            if(user.numero == this.UsuarioLocal.numero && user.contraseña == this.UsuarioLocal.contraseña) {
              this.UsuarioLocal = user;
              this.storage.guardarUsuario(this.UsuarioLocal);
              this.storage.guardarNacimiento(user.nacimiento.toDate().toISOString());
              // @ts-ignore
              this.storage.guardarId(user.id);
              this.seleccionarHome(this.UsuarioLocal.tipo);
              return;
            }
          }
        }
        this.router.navigate(["/login"]);
        return;
      }) 
    });
  }
  
  seleccionarHome(tipo: string) {
    switch (tipo) {
      case 'Elemento seguridad': {
        console.log("entre");
        this.router.navigate(["/home-guardia"]);
      }
    }
  }

  async ionViewDidEnter() {
    this.backButtonSub = this.plt.backButton.subscribeWithPriority( 10000, async () => {});
  }
}
