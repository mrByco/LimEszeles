import { Component, inject } from '@angular/core';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {

  protected rideService = inject(RideService);

  protected data: {
    name: string;
    cards: number;
    won: number | undefined;
  }[] = [];

  constructor() {

    this.rideService.ride$.subscribe(ride => {
      if (!ride || !ride.game) {
        return;
      }

      this.data = [];
      for (const stat of ride.stats.userStats) {

        const user = ride.game.players.find(player => player.userId === stat.userId);
        const cards = user.cards.length;
        if (!user) {
          continue;
        }

        this.data.push({
          name: user.name,
          cards: cards,
          won: stat.won,
        });
      }

    });
  }

}
