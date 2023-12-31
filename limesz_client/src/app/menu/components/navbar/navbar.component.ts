import { Component, inject } from '@angular/core';
import { RideService } from '../../../services/ride.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public rideService = inject(RideService);

}
