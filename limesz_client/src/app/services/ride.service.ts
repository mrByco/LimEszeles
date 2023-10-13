import {inject, Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import { AuthService } from './auth.service';
import { Ride } from '../ride';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  public ride$: BehaviorSubject<Ride | undefined> = new BehaviorSubject<Ride | undefined>(undefined);
  private rideRef: any;

  private authService = inject(AuthService);
  private userService = inject(UserService);

  private router = inject(Router);

  constructor() {
    this.userService.currentUser$.subscribe((user) => {
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
    if (!this.userService.currentUser$.value){
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
