import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Platform, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { FireService } from '../../services/fire.service';
import { Asistencia, Hora, ServicioA } from '../../interfaces/interfaces';

@Component({
  selector: 'app-reg-asistencia',
  templateUrl: './reg-asistencia.page.html',
  styleUrls: ['./reg-asistencia.page.scss'],
})
export class RegAsistenciaPage implements OnInit {

  @Input() servicioText: string;
  @Input() hora: number;
  @Input() minutos: number;
  @Input() servicio: ServicioA;
  @Input() numero: number;

  horario: string = "";

  imagen1: any;
  imagen2: any;
  fotouni: boolean = true;
  fotolugar: boolean = true;
  imagenP: string;
  imagenL: string;

  backButtonSub: Subscription;
  constructor(private plt: Platform,
              private modalCtrl: ModalController,
              private router: Router,
              private camera: Camera,
              private fireService: FireService) { }

  ngOnInit() {
    this.obtenerHora();
  }

  obtenerHora() {
    var date = new Date();
    date.setHours(this.hora);
    date.setMinutes(this.minutos);
    date.setSeconds(0);
    this.horario = date.toUTCString();
  }

  tomarFoto1() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 1024,
      targetWidth: 1024,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }).then(res => {
      this.imagen1 = "data:image/jpeg;base64," + res;
      this.imagenP = res;
      this.fotouni = false;
    }).catch(error => {
      console.log(error);
    });
  }

  tomarFoto2() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 1024,
      targetWidth: 1024,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }).then(res => {
      this.imagen2 = "data:image/jpeg;base64," + res;
      this.fotolugar = false;
      this.imagenL = res;
    }).catch(error => {
      console.log(error);
    });
  }

  async registrar() {
    var fecha = new Date();
    var año = fecha.getFullYear();
    var mes = fecha.getMonth();
    var dia = fecha.getDate();
    var fecha2 = new Date(año, mes, dia, 0, 0, 0, 0);

    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var horario: Hora = {
      hora: hora,
      minutos: minutos
    }

    var retardo = false;
    var horaRetardo = this.servicio.horario.hora;
    var minutosRetardo = this.servicio.horario.minutos + 20;
    if(minutosRetardo > 59) {
      horaRetardo += 1;
      minutosRetardo -= 60;
      if(horaRetardo == 25) {
        horaRetardo = 0;
      }
    }
    if(horario.hora == horaRetardo && horario.minutos > minutosRetardo) {
      retardo = true;
    }

    var asistencia: Asistencia = {
      // @ts-ignore
      dia: fecha2,
      fotos: {
        imagenP: this.imagenP,
        iamgenL: this.imagenL
      },
      horario: horario,
      numero: this.numero,
      servicio: this.servicio,
      retardo: retardo
    }
    await this.fireService.addAsistencias(asistencia);
    this.modalCtrl.dismiss( {
      registrado: true
    });
  }

  async ionViewDidEnter() {
    this.backButtonSub = this.plt.backButton.subscribeWithPriority( 10000, async () => {
      this.modalCtrl.dismiss({
        registrado: false
      });
      this.router.navigate(["/home-guardia"]);
    });
  }

  regresar() {
    this.modalCtrl.dismiss({
      registrado: false
    });
    this.router.navigate(["/home-guardia"]);
  }
}
