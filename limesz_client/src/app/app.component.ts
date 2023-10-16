import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from './services/alert.service';
import { ThemeService } from './services/theme.service';
import { LoadingService } from './services/loading.service';
import { RideService } from './services/ride.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  public loadingService = inject(LoadingService);
  public rideService: RideService = inject(RideService);
  public userService: UserService = inject(UserService);

  constructor(themeService: ThemeService, alertService: AlertService, activatedRoute: ActivatedRoute) {
    this.loadingService.addTask(new Promise((resolve: any) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }));
  }
  onActivate(event: any) {
    // window.scroll(0,0);
    console.log("onActivate");

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
  }
}
