// auth.service.ts
import {inject, Injectable} from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  signInAnonymously
} from "@angular/fire/auth";
import {BehaviorSubject} from "rxjs";
import firebase from "firebase/compat";
import User = firebase.User;
import {Firestore} from "@angular/fire/firestore";
import {Player} from "../../models/game";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private auth: Auth = inject(Auth);
  public user$ = new BehaviorSubject<User | null>(null);
  private firestore: Firestore = inject(Firestore);

  constructor() {
    this.auth.onAuthStateChanged((user) => {
      console.log('Auth state changed', user);

      this.user$.next(user as any);
    });
  }

  getMeAsPlayer(): Player {
    let user = this.user$.value;
    if (!user){
      throw new Error("User not logged in");
    }
    return {
      id: user.uid,
      name: user.displayName??user.uid,
    }
  }

  loginWithEmailPassword(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  logout() {
    return signOut(this.auth);
  }

  loginAnonymously() {
    return signInAnonymously(this.auth);
  }
}
