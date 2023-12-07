import { Component, inject } from '@angular/core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { RideService } from '../../services/ride.service';
import { LoadingService } from 'pluto/src/lib/api-providers/default-services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss'],
})
export class GameScreenComponent {

  protected readonly faArrowRightFromBracket = faArrowRightFromBracket;
  protected readonly rideService: RideService = inject(RideService);
  protected readonly router = inject(Router);

  constructor() {
    this.rideService.ride$.subscribe(ride => {
      if (!ride || !ride.game) {
        this.router.navigate(['/menu']);
      }
    });
  }

}
