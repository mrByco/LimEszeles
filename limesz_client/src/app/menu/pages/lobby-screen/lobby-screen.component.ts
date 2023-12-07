import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RideService } from '../../../services/ride.service';

@Component({
  selector: 'app-lobby-screen',
  templateUrl: './lobby-screen.component.html',
  styleUrls: ['./lobby-screen.component.scss']
})
export class LobbyScreenComponent {
  private rideService = inject(RideService)
  private router = inject(Router)

  constructor() {
    this.rideService.ride$.subscribe(ride => {
      console.log(ride)
      if (!ride) {
        this.router.navigate(['/'])
      }
    });
  }

}
