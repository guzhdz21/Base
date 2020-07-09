import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertasInfoService {

  constructor(private alertCtrl: AlertController) { }

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
