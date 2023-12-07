import { Component, inject } from '@angular/core';
import { Player } from '../../api/models/player';
import { RideService } from '../../services/ride.service';

@Component({
  selector: 'app-in-game-player-list',
  templateUrl: './in-game-player-list.component.html',
  styleUrls: ['./in-game-player-list.component.scss']
})
export class InGamePlayerListComponent {
  public players: Player[] = [];
  public interactivePlayerIds: string[] = [];

  public rideService: RideService = inject(RideService);

  constructor() {
    this.rideService.ride$.subscribe(ride => {
      if (!ride || !ride.game) {
        return;
      }
      this.players = ride.game.players;
      this.interactivePlayerIds = ride.game.interactivePlayers.map(player => player.userId);
    });
  }
}
