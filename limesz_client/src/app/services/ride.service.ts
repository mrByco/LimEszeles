import {inject, Injectable} from "@angular/core";
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import {Router} from "@angular/router";
import { PlAuthService } from 'pluto/src/lib/api-providers/default-services/pl-auth.service';
import { UserService } from './user.service';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import * as uuid from 'uuid';
import { LoginPageComponent } from '../../../projects/pluto/src/lib/generic_module/generic/auth-page/login-page/login-page.component';
import { Ride } from '../api/models/ride';
import { Player } from '../api/models/player';
import { Deck } from '../api/models/deck';
import { LobbyApi } from '../api/services';
import { AlertService, PlAlertService, SidebarService } from 'projects/pluto/src/public-api';
import { AuthService } from 'pluto/src/lib/api-providers/auth-service';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  public connectionToken = "";
  public ride$: BehaviorSubject<Ride | undefined> = new BehaviorSubject<Ride | undefined>(undefined);

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private lobbyApi = inject(LobbyApi);
  private alertService = inject(AlertService);
  private modalService = inject(SidebarService);

  private connection: HubConnection | undefined;

  private router = inject(Router);
  public get decks(): Deck[] {
    return this.ride$.value.game.decks;
  }

  public get isMyTurn(): boolean {
    if (!this.ride$.value) {
      return false;
    }
    return this.ride$.value.game.interactivePlayers.some(p => p.userId == this.userService.userId);
  }

  public get meAsPlayer(): Player {
    if (!this.ride$.value || !this.ride$.value.game || !this.ride$.value.game.players) {
      return undefined;
    }
    return this.ride$.value.game.players.find(p => p.userId == this.userService.userId);
  }

  constructor() {
    this.userService.currentUser$.subscribe((user) => {
      if (!user)
        return;
    });
    this.initListener();
  }

  async initListener() {
    this.modalService.show(LoginPageComponent, {title: "Login"});

    this.connectionToken = localStorage.getItem("connectionToken")??uuid.v4();
    localStorage.setItem("connectionToken", this.connectionToken)

    this.connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Information)
      .withUrl(environment.backendUrl + "/ridehub")
      .build();

    await this.connection.start().catch((err) => console.log(err));
    this.connection.onclose((err) => {
      this.alertService.error(err.message, "Remote connection lost")
    });

    this.connection.on("rideChanged", (ride) => {
      ride = ride??undefined;
      console.log("Hey the ride has changed", ride);
      this.ride$.next(ride);
    });


    this.connection.send("InitToken", this.connectionToken);
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

  async createLobby() {
    await firstValueFrom(this.lobbyApi.createLobby({ userName: this.userService.userName, userId: this.userService.userId, connectionToken: this.connectionToken }))
  }

  public setListenerNoRide() {
    this.ride$.next(undefined);

    this.router.navigate(['/']);
  }

  public async leave(){
    console.log("Leave");
    await firstValueFrom(this.lobbyApi.leaveLobby({connectionToken: this.connectionToken}))
  }


}
