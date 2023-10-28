import { Component, inject, Input } from '@angular/core';
import { Deck } from 'src/app/api/models';
import { RideService } from '../../services/ride.service';
import { ActionsService as ActionsApi } from '../../api/services/actions.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent {
  @Input() deck: Deck;
  protected rideService: RideService = inject(RideService);
  private actionsApi: ActionsApi = inject(ActionsApi);

  pull() {
    if (!this.rideService.isMyTurn) {
      return;
    }
    firstValueFrom(this.actionsApi.pullFromDeck({ deckName: this.deck.name, userId: this.rideService.meAsPlayer.userId, count: 1 }));

  }
}
