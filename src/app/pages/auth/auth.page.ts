import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/bd.models';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { UtilsService } from 'src/app/servicios/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    clave: new FormControl('',[Validators.required]),
  })

  firebaseAuth = inject(FirebaseService)
  utils = inject(UtilsService);
  ngOnInit() {
  }

  async submit(){
    if ( this.form.valid) {

      const isLoading = await this.utils.cargando();
      await isLoading.present();

      this.firebaseAuth.iniciarSesion(this.form.value as Usuario).then(res => {
        console.log(res);

      }).catch(error => {
        console.log(error);
        this.utils.presentToast({
          message: 'Correo o Contraseña incorrectas. Vuelva a intentarlo',
          duration: 2000,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline',
        });

      }).finally(() => {
        isLoading.dismiss();
      })
    }
  }

}
