import {Component, inject} from '@angular/core';
import {RideService} from "../../services/ride.service";
import {LobbyService as LobbyApi} from "../../api/services";
import { firstValueFrom } from 'rxjs';
import { Player } from '../../api/models/player';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {

  private rideService = inject(RideService);
  private lobbyApi = inject(LobbyApi);
  public players: Player[] = [];
  public lobbyId: string = '';
  public myId: string = inject(UserService).userId;

  constructor() {
    this.rideService.ride$.subscribe((ride) => {
      this.players = Object.values(ride?.players??[]);
      this.lobbyId = ride?.id??'';
      console.log(this.players, this.myId);
    });
    console.log(this.players, this.myId);
  }

  public leave(){
    console.log("Leave");
    firstValueFrom(this.lobbyApi.leaveLobby({connectionToken: this.rideService.connectionToken}))
  }

  public start() {
    firstValueFrom(this.lobbyApi.star({connectionToken: this.rideService.connectionToken}))
  }
}
