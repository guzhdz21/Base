import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Input() tipo: string;
  opciones = [];
  nombre: string = "";
  usuario: Usuario;

  constructor(private storage: StorageService,
              private router: Router,) { }

  async ngOnInit() {
    await this.cargarUsuario();
  }

  redirigir(nombre: string, irA: string) {
    if(nombre == "Cerrar Sesion") {
      this.storage.eliminarUsuario();
    }
    this.router.navigate([irA]);
  }

  async cargarUsuario() {
    this.usuario = await this.storage.cargarUsuario();
    this.nombre = this.usuario.nombre;
    switch(this.tipo) {

      case 'guardia': {
        this.opciones = [
          {
            icono: 'log-out-outline',
            nombre: 'Cerrar Sesion',
            irA: '/login'
          },
        ];
      }

    }
  }
}
