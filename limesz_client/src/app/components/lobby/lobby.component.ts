import {Component, inject} from '@angular/core';
import {RideService} from "../../services/ride.service";
import {LobbyService as LobbyApi} from "../../api/services";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {

  private rideService = inject(RideService);
  private lobbyApi = inject(LobbyApi);
  public players: string[] = [];
  public lobbyId: string = '';

  constructor() {
    this.rideService.ride$.subscribe((ride) => {
      this.players = Object.keys(ride?.players??[]);
      this.lobbyId = ride?.id??'';
    });
  }

  public leave(){
    console.log("Leave");
    firstValueFrom(this.lobbyApi.leaveLobby({connectionToken: this.rideService.connectionToken}))
  }

}
