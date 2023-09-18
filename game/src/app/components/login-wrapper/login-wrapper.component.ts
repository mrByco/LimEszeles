// login-wrapper.component.ts
import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Auth} from "@angular/fire/auth";
import firebase from "firebase/compat";
import User = firebase.User;

@Component({
  selector: 'app-login-wrapper',
  templateUrl: './login-wrapper.component.html',
  styleUrls: ['./login-wrapper.component.scss'],
})
export class LoginWrapper {
  email: string = '';
  password: string = '';
  user: User | null = null;
  loading = true;

  constructor(private authService: AuthService) {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.loading = false;
    });
  }

  loginWithEmailPassword() {
    this.authService.loginWithEmailPassword(this.email, this.password)
      .then((userCredential: any) => {
        // Handle successful login
      })
      .catch((error: any) => {
        // Handle login error
      });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle()
      .then((userCredential: any) => {
        // Handle successful login
      })
      .catch((error: any) => {
        // Handle login error
      });
  }

  loginAnonymously() {
    this.authService.loginAnonymously()
      .then((userCredential: any) => {
        console.log(userCredential);
        // Handle successful login
      })
      .catch((error: any) => {
        // Handle login error
      });
  }
}
