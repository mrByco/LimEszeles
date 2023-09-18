import {inject, Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Lobby, Ride} from "../../models/game";
import firebase from "firebase/compat";
import {
  addDoc,
  collection,
  Firestore,
  query,
  where,
  docSnapshots,
  onSnapshot,
  doc,
  getDocs
} from "@angular/fire/firestore";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RideService {

  public ride$: BehaviorSubject<Ride | undefined> = new BehaviorSubject<Ride | undefined>(undefined);
  private rideRef: any;
  private rideUnsubscribe: firebase.Unsubscribe | undefined;
  private authService = inject(AuthService);
  private firestore = inject(Firestore);
  private collection = collection(this.firestore, "games");
  private router = inject(Router);

  constructor() {
    this.authService.user$.subscribe((user) => {
      if (!user) {
        return;
      }

      this.initListener();
    });
  }

  initListener() {
    console.log("initListener", this.authService.user$.value?.uid);
    let q = query(this.collection, where("players." + this.authService.user$.value?.uid, "!=", null));
    onSnapshot(q, (snapshot) => {
      if (snapshot.size == 0) {
        console.log("No lobby found");
        this.setListenerNoRide();
        return;
      }

      if (snapshot.size > 1) {
        console.error("More than one lobby found");
      }
      let lobby = snapshot.docs[0].data() as Lobby;
      console.log("Lobby found", lobby);
      this.startListenToLobbyChanges(lobby.id);

    });
  }

  public async startListenToLobbyChanges(id: string) {
    let lobbyHasChanged = id != this.ride$.value?.id;
    if (!this.authService.user$.value){
      return;
    }

    if (this.rideUnsubscribe) {
      this.rideUnsubscribe();
    }


    return new Promise( async (resolve, reject) => {
      this.rideRef = doc(this.firestore, `games/${id}`);
      this.rideUnsubscribe = onSnapshot(doc(this.firestore, `games/${id}`), (snapshot) => {
        this.ride$.next(snapshot.data() as Lobby);
        if (lobbyHasChanged){
          this.router.navigate(['/lobby']);
        }
        resolve(snapshot.data() as Lobby);
      });
    });
  }

  public setListenerNoRide() {
    this.rideUnsubscribe?.();
    this.ride$.next(undefined);
    this.rideRef = undefined;
    this.router.navigate(['/']);
  }

}
