import { Component, inject, Input } from '@angular/core';
import { ActionsService as ActionsApi } from '../../api/services/actions.service';
import { RideService } from '../../services/ride.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-my-cards',
  templateUrl: './my-cards.component.html',
  styleUrls: ['./my-cards.component.scss']
})
export class MyCardsComponent {

  @Input()
  cards: any[] = [];
  private actionsApi: ActionsApi = inject(ActionsApi);
  protected rideService: RideService = inject(RideService);

  protected readonly Math = Math;

  playCard(card: any) {
    if (!this.rideService.isMyTurn) {
      return;
    }
    console.log('playCard', card);
    firstValueFrom(this.actionsApi.playCard({ cardId: card.id, userId: this.rideService.meAsPlayer.userId }));

  }
}
