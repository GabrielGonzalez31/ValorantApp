import { inject, Injectable } from '@angular/core';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  isLoading = inject(LoadingController);
  toastControl = inject(ToastController);

  cargando (){
    return this.isLoading.create({spinner: 'crescent'});
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastControl.create(opts);
    toast.present();
  }

}
