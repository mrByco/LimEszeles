import { Component, inject } from '@angular/core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { RideService } from '../../services/ride.service';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent {

  protected readonly faArrowRightFromBracket = faArrowRightFromBracket;
  private readonly rideService: RideService = inject(RideService);

  exit() {
    this.rideService.leave();
  }
}
