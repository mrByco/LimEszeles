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
  public players: Player[] = [];
  public lobbyId: string = '';
  public myId: string = inject(UserService).userId;
  private readonly lobbyApi = inject(LobbyApi);

  constructor() {
    this.rideService.ride$.subscribe((ride) => {
      this.players = Object.values(ride?.users??[]).map((user) => { return {id: user.id, name: user.username} });
      this.lobbyId = ride?.id??'';
      console.log(this.players, this.myId);
    });
    console.log(this.players, this.myId);
  }

  public start() {
    firstValueFrom(this.lobbyApi.startGame({connectionToken: this.rideService.connectionToken}))
  }

  leave() {
    this.rideService.leave();
  }
}
