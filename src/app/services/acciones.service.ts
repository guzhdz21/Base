import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AccionesService {

  constructor(private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) { }

  async presentLoading(mensaje: string, duracion: number) {
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      duration: duracion
    });
    loading.present();
    await loading.onDidDismiss();
  }

  async presentAlertGenerica( header: string, message: string) {
      
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
  }
}
