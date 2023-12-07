import {Component, inject} from '@angular/core';
import {RideService} from "../../../services/ride.service";
import {RideApi, LobbyApi} from "../../../api/services";
import { firstValueFrom } from 'rxjs';
import { Player } from '../../../api/models/player';
import { UserService } from '../../../services/user.service';
import { ClipboardService } from 'ngx-clipboard';
import { CardSetService } from '../../../services/card-set-service';
import { CardSet } from '../../../api/models/card-set';
import { LoadingService } from 'pluto/src/lib/api-providers/default-services/loading.service';

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
  private clipboardService = inject(ClipboardService);
  public cardSetService = inject(CardSetService);
  public loadingService = inject(LoadingService)
  currentCardSet: CardSet | undefined = undefined;

  constructor() {
    this.rideService.ride$.subscribe((ride) => {
      if (!ride || !ride.settings) {
        return;
      }

      this.players = Object.values(ride?.users??[]).map((user) => { return {id: user.id, name: user.username} });
      this.lobbyId = ride?.id??'';

      this.currentCardSet = this.cardSetService.cardSets.find(c => c.id == ride.settings.cardSetId);

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

  copyJoinCode() {
    this.clipboardService.copy(this.rideService.ride$.value.id)
  }

  setCardSet(id: string) {
    this.loadingService
      .waitFirstValueFrom(
        this.lobbyApi.setCardSetInRide({cardSetId: id, connectionToken: this.rideService.connectionToken}
        )
      );
  }
}
