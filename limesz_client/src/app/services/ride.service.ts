import {inject, Injectable} from "@angular/core";
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import {Router} from "@angular/router";
import { AuthService } from './auth.service';
import { Ride } from '../ride';
import { UserService } from './user.service';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import * as uuid from 'uuid';
import { LobbyService as LobbyApi } from '../api/services/lobby.service';
import { AlertService } from './alert.service';
import { ModalService } from './modal.service';
import { LoginPageComponent } from '../generic/auth-page/login-page/login-page.component';
import { SidebarService } from './sidebar-service';

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

  constructor() {
    this.userService.currentUser$.subscribe((user) => {
      if (!user) {
        return;
      }

    });

    /*this.ride$.next({
      "id": "Y694U",
      "state": "lobby",
      "players": {
        "Anonymous_lv3hq3q847ut81gubtxp": {
          "id": "Anonymous_lv3hq3q847ut81gubtxp",
          "name": "CrimsonWitch"
        },
        "Anonymous_lv3hq3q847ut81gub34234": {
          "id": "Anonymous_lv3hq3q847ut81gub34234",
          "name": "CrimsonWitch"
        },
        "Anonymous_lv3hq3q847ut81gub4545": {
          "id": "Anonymous_lv3hq3q847ut81gub4545",
          "name": "CrimsonWitch"
        },
        "Anonymous_lv3hq3q847ut81gub": {
          "id": "Anonymous_lv3hq3q847ut81gub",
          "name": "CrimsonWitch"
        },
      }
    })*/

    this.initListener();
  }

  async initListener() {

    this.modalService.show(LoginPageComponent, {title: "Login"});


    console.log("Init listener");

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

  public setListenerNoRide() {
    this.ride$.next(undefined);

    this.router.navigate(['/']);
  }

  public async leave(){
    console.log("Leave");
    await firstValueFrom(this.lobbyApi.leaveLobby({connectionToken: this.connectionToken}))
  }


}
