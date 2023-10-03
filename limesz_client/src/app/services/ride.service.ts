import {inject, Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Lobby, Ride} from "../../../../game/src/models/game";
import {AuthService} from "../../../../game/src/app/services/auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RideService {

  public ride$: BehaviorSubject<Ride | undefined> = new BehaviorSubject<Ride | undefined>(undefined);
  private rideRef: any;

  private authService = inject(AuthService);

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
  }

  public async startListenToLobbyChanges(id: string) {
    let lobbyHasChanged = id != this.ride$.value?.id;
    if (!this.authService.user$.value){
      return;
    }



    return new Promise( async (resolve, reject) => {
      resolve({});
    });
  }

  public setListenerNoRide() {
    this.ride$.next(undefined);
    this.rideRef = undefined;
    this.router.navigate(['/']);
  }

}
