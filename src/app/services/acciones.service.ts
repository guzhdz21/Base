import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AccionesService {

  constructor(private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) { }

  async presentLoading(mensaje: string, duracion: number) {
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      duration: duracion
    });
    loading.present();
    await loading.onDidDismiss();
  }

  async presentToast( message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      mode: "ios",
      color: "secondary",
    });
    toast.present();
  }

  async presentAlertPersonalizada( botones: any[], header: string, message: string) {
      
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [] = botones,
      mode: "md",
      backdropDismiss: false
    });
    alert.present();
    await alert.onDidDismiss();
  }

  async presentAlertConfirmacionContraseña(header: string, message: string, botones: any[]) {
      
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      inputs: [ {
          name: 'contraseñaConfirmacion',
          type: 'password',
          value: null
        }
      ],
      buttons: [] = botones,
      mode: "md",
      backdropDismiss: false
    });
    alert.present();
    await alert.onDidDismiss();
  }

  async presentAlertGenerica(header: string, message: string) {
      
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: (bla) => {}
        }
      ],
      mode: "md",
      backdropDismiss: false
    });
    alert.present();
    await alert.onDidDismiss();
    return;
  }
}
