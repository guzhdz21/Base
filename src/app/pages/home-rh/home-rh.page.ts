import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { FireService } from '../../services/fire.service';
import { ModalController, Platform, NavController } from '@ionic/angular';
import { AccionesService } from '../../services/acciones.service';
import { Usuario, Seguridad, Cliente, Servicio } from '../../interfaces/interfaces';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home-rh',
  templateUrl: './home-rh.page.html',
  styleUrls: ['./home-rh.page.scss'],
})
export class HomeRHPage implements OnInit {

    //Variables visuales generales
    asistenciaS: boolean = true;
    reportarS: boolean = false;
    asignacionesS: boolean = false;
    titulo: string = "Informacion General";
    icono: string = "document-text";
  
    //Variables visuales de asistencia
    textoBoton: string = "";
    nacimiento: string = new Date().toISOString();
    servicioText: string = "";
    supervisor: string = "";
    horasS: number = null;
  
    //Variables del boton asistencia
    asistenciaRegistrada: boolean = false;
    tiempo: boolean = false;
    timer;
    timerSub;
  
    //Variables de los datos del usuario
    usuarioLocal: Usuario = null;
    usuario : Usuario = {
      contraseña: null,
      nacimiento: null,
      nombre: null,
      numero: null,
      tipo: null,
    }
    seguridad: Seguridad;
    cliente: Cliente;
    servicio: Servicio;
    id: string = null;
  
    //Variables de funcionalidad
    backButtonSub: Subscription;
    autentificacion;
    autenSub;
    correcto: boolean = true;
  
    usuarioFake: Usuario = {
      contraseña: null,
      nacimiento: null,
      nombre: null,
      numero: null,
      tipo: null,
    }
  
    user: Usuario;
  
    constructor(private storageService: StorageService,
                private fireService: FireService,
                private modalCtrl: ModalController,
                private plt: Platform,
                private navCtrl: NavController,
                private accionesService: AccionesService) { }
  
    async ngOnInit() {
      await this.obtenerUsuarioLocal();
      await this.obtenerNacimiento();
  
      this.timer = interval(10000);
      this.timerSub = this.timer.subscribe(x => {
        if(this.tiempo == true) {
          this.timerSub.unsubscribe();
        } else {
          this.checarTiempo();
        }
      });
  
      this.autentificacion = interval(5000);
      this.autenSub = await this.autentificacion.subscribe(x => {
        this.cargarUsuarioComparar();
      });
    }
  
    async obtenerUsuarioLocal() {
      await this.storageService.cargarUsuario().then(res => {
        this.usuarioLocal = res;
        this.storageService.cargarId().then(res2 => {
          this.id = res2;
          this.obtenerUsuario(res2);
        })
      });
    }
  
    async obtenerUsuario(id: string) {
      await this.fireService.getUsuario(id).then(res => {
        res.subscribe(val => {
          this.usuario = val;
          this.obtenerSeguridad(val);
        });
      });
    }
  
    async obtenerSeguridad(usuario: Usuario) {
      await this.fireService.getAllSeguridad().then(res => {
        res.subscribe(val => {
          for(var seg of val) {
            if(usuario.numero == seg.numero) {
              this.seguridad = seg;
              this.servicioText = "";
              this.servicioText += seg.servicio.cliente + " - ";
              this.horasS = seg.servicio.tipo;
              this.obtenerSupervisor(seg);
              this.obtenerClientes(seg);
              this.checarTiempoInicial(seg);
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
  
    async obtenerClientes(seguridad: Seguridad) {
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
  
    checarTiempoInicial(seguridad: Seguridad) {
      var tiempo = new Date();
      var hora = tiempo.getHours();
      var minutos = tiempo.getMinutes();
      var horaA = this.seguridad.servicio.horario.hora + 1;
  
      if(horaA == 25) {
        horaA = 0;
        if(horaA >= hora) {
          if(seguridad.servicio.horario.minutos < minutos) {
            this.tiempo = true;
            this.textoBoton = "Ya no puedes registrar asistencia ya que la tolerancia a sido exedida"
          }
        }
        return;
      }
  
      if(horaA <= hora) {
        if(seguridad.servicio.horario.minutos < minutos) {
          this.tiempo = true;
          this.textoBoton = "Ya no puedes registrar asistencia ya que la tolerancia a sido exedida"
        }
        return;
      }
    }
  
    checarTiempo() {
      if(this.seguridad) {
        var tiempo = new Date();
        var hora = tiempo.getHours();
        var minutos = tiempo.getMinutes();
        var horaA = this.seguridad.servicio.horario.hora + 1;
  
        if(horaA == 25) {
          horaA = 0;
          if(horaA >= hora) {
            if(this.seguridad.servicio.horario.minutos < minutos) {
              this.tiempo = true;
              this.textoBoton = "Ya no puedes registrar asistencia ya que la tolerancia a sido exedida"
            }
          }
          return;
        }

        if(horaA <= hora) {
          if(this.seguridad.servicio.horario.minutos < minutos) {
            this.tiempo = true;
            this.textoBoton = "Ya no puedes registrar asistencia ya que la tolerancia a sido exedida"
          }
          return;
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
      this.textoBoton = "Ya has registrado tu aistencia de hoy";
    }

    async cargarUsuarioComparar() {
      if(this.usuarioLocal != null && this.id != null) {
        this.fireService.getUsuario(this.id).then(res => {
          res.subscribe(val => {
            this.user = val;
          });
        });
        this.autentificar();
      }
      return;
    }
  
    async autentificar() {
      if(this.user && this.usuarioLocal != null) {
        if(this.user.numero != this.usuarioLocal.numero 
          || this.usuarioLocal.contraseña != this.user.contraseña 
          || this.user.tipo != "Elemento seguridad") {
          await this.autenSub.unsubscribe();
          await this.timerSub.unsubscribe();
          await this.procesoSalida();
          await this.navCtrl.navigateRoot("/login");
        }
      }
      return;
    }
  
    async procesoSalida() {
      await this.accionesService.presentAlertGenerica("Alerta de Seguridad", "Algunos de tus datos indispenables" 
          + " (contraseña, numero, etc..) han sido modificados, por seguridad tendras que volver a ingresar a tu cuenta");
      await this.storageService.guardarId(null);
      await this.storageService.guardarUsuario(this.usuarioFake);
      await this.storageService.guardarNacimiento(null);
      return;
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
  
    async ionViewDidEnter() {
      this.backButtonSub = this.plt.backButton.subscribeWithPriority( 10000, async () => {
        navigator["app"].exitApp();
      });
    }

}
