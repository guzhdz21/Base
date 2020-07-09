import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AccionesService {

  constructor(private loadingCtrl: LoadingController) { }

  async presentLoading(mensaje: string, duracion: number) {
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      duration: duracion
    });
    loading.present();
    await loading.onDidDismiss();
  }
}
