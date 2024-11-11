import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/bd.models';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { UtilsService } from 'src/app/servicios/utils.service';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  form = new FormGroup({
    nombre: new FormControl('',[Validators.required, Validators.minLength(4)]),
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

      this.firebaseAuth.registrar(this.form.value as Usuario).then(async res => {

        await this.firebaseAuth.actualizarUsuario(this.form.value.nombre);
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
