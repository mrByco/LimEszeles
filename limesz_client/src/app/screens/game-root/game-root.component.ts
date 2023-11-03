import { Component, inject } from '@angular/core';
import { RideService } from '../../services/ride.service';


@Component({
  selector: 'app-game-root',
  templateUrl: './game-root.component.html',
  styleUrls: ['./game-root.component.scss']
})
export class GameRootComponent {
  public rideService = inject(RideService);
}
