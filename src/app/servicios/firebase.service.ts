import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { Usuario } from '../models/bd.models';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);

  iniciarSesion(usuario: Usuario){
    return signInWithEmailAndPassword(getAuth(), usuario.email, usuario.clave);
  }

  registrar(usuario: Usuario){
    return createUserWithEmailAndPassword(getAuth(), usuario.email, usuario.clave);
  }

  actualizarUsuario(displayName: string){
    return updateProfile(getAuth().currentUser, { displayName });
  }
}
