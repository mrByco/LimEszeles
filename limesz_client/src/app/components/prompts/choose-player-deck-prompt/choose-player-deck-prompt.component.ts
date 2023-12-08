import { Component, inject } from '@angular/core';
import { IPromptDisplay } from '../prompt-display';
import { RideService } from '../../../services/ride.service';
import { Player } from '../../../api/models/player';

@Component({
  selector: 'app-choose-player-deck-prompt',
  templateUrl: './choose-player-deck-prompt.component.html',
  styleUrls: ['./choose-player-deck-prompt.component.scss']
})
export class ChoosePlayerDeckPromptComponent implements IPromptDisplay {

  onResult = (result: any) => { };
  setArgs(args: string[]): void {
    // Not used
  }

  private rideService = inject(RideService);
  public players: Player[] = [];

  constructor() {
    this.rideService.ride$.subscribe(ride => {
      if (!ride || !ride.game) {
        return;
      }
      this.players = ride.game.players;
    });
  }

  answer(player: Player) {
    this.onResult({playerId: player.userId});
  }
}
