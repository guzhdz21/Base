import { Component, OnInit } from '@angular/core';
import { Usuario, Seguridad, Cliente, Servicio } from '../../interfaces/interfaces';
import { StorageService } from '../../services/storage.service';
import { FireService } from '../../services/fire.service';
import { ModalController, Platform } from '@ionic/angular';
import { RegAsistenciaPage } from '../reg-asistencia/reg-asistencia.page';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-guardia',
  templateUrl: './home-guardia.page.html',
  styleUrls: ['./home-guardia.page.scss'],
})
export class HomeGuardiaPage implements OnInit {

  asistenciaS: boolean = true;
  reportarS: boolean = false;
  asignacionesS: boolean = false;
  titulo: string = "Informacion General";
  icono: string = "document-text"
  nacimiento: string = new Date().toISOString();
  servicioText: string = "";
  supervisor: string = "";

  asistenciaRegistrada: boolean = false;

  usuario: Usuario = {
    contraseña: null,
    nacimiento: null,
    nombre: null,
    numero: null,
    tipo: null,
  }
  seguridad: Seguridad;

  cliente: Cliente;

  servicio: Servicio;

  backButtonSub: Subscription;


  constructor(private storageService: StorageService,
              private fireService: FireService,
              private modalCtrl: ModalController,
              private plt: Platform) { }

  async ngOnInit() {
    await this.obtenerUsuario();
    await this.obtenerNacimiento();
  }

  async obtenerUsuario() {
    await this.storageService.cargarUsuario().then(res => {
      this.usuario = res;
      this.obtenerSeguridad(res);
    });
  }

  async obtenerSeguridad(usuario: Usuario) {
    await this.fireService.getAllSeguridad().then(res => {
      res.subscribe(val => {
        for(var seg of val) {
          if(usuario.numero == seg.numero) {
            this.seguridad = seg;
            this.servicioText += seg.servicio.cliente + " - ";
            this.obtenerSupervisor(seg);
            this.obtnerClientes(seg);
            break;
          }
        }
      });
    });
  }

  async obtenerSupervisor(seguridad: Seguridad) {
    await this.fireService.getAllUsuarios().then(res => {
      res.subscribe(val => {
        for(var usuario of val) {
          if(usuario.numero == seguridad.supervisor) {
            this.supervisor = usuario.nombre;
            break;
          }
        }
      });
    });
  }

  async obtnerClientes(seguridad: Seguridad) {
    await this.fireService.getAllClientes().then(res => {
      res.subscribe(val => {
        for(var cli of val) {
          if(seguridad.servicio.cliente == cli.nombre) {
            for(var ser of cli.servicios) {
              if(this.seguridad.servicio.servicio == ser.numero) {
                this.cliente = cli;
                this.servicio = ser;
                this.servicioText += ser.nombre
                break;
              }
            }
            break;
          }
        }
      });
    });
  }

  async obtenerNacimiento() {
    this.nacimiento = await this.storageService.cargarNacimiento();
  }

  segment(event) {
    switch (event.detail.value) {

      case 'Asistencia': {
        this.asistenciaS = true;
        this.reportarS = false;
        this.asignacionesS = false;
        this.titulo = "Informacion General";
        this.icono = "document-text";
        break;
      }

      case 'Reportar': {
        this.asistenciaS = false;
        this.reportarS = true;
        this.asignacionesS = false;
        this.titulo = "Reportar Incidente";
        this.icono = "megaphone"
        break;
      }

      case 'Asignaciones': {
        this.asistenciaS = false;
        this.reportarS = true;
        this.asignacionesS = false;
        this.titulo = "Asignaciones de la Semana";
        this.icono = "calendar"
        break;
      }

    }
  }

  async abrirRegistroAsistencia() {
    const modal = await this.modalCtrl.create({
      component: RegAsistenciaPage,
      componentProps: {
        servicioText: this.servicioText,
        hora: this.seguridad.servicio.horario.hora,
        minutos: this.seguridad.servicio.horario.minutos,
        servicio: this.seguridad.servicio,
        numero: this.usuario.numero
      }
    });
    await modal.present();
    const {data}  = await modal.onDidDismiss();
    this.asistenciaRegistrada = data.registrado;
  }

  async ionViewDidEnter() {
    this.backButtonSub = this.plt.backButton.subscribeWithPriority( 10000, async () => {
      navigator["app"].exitApp();
    });
  }
}
