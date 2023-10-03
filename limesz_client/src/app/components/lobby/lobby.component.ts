import {Component, inject} from '@angular/core';
import {RideService} from "../../services/ride.service";
import {LobbyService} from "../../services/lobby.service";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {

  private rideService = inject(RideService);
  private lobbyService = inject(LobbyService);
  public players: string[] = [];
  public lobbyId: string = '';

  constructor() {
    this.rideService.ride$.subscribe((ride) => {
      this.players = Object.keys(ride?.players??[]);
      this.lobbyId = ride?.id??'';
    });
  }

  public leave(){
    this.lobbyService.leaveLobby();
  }

}
