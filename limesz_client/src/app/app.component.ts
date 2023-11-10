import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RideService } from './services/ride.service';
import { UserService } from './services/user.service';
import { PromptService } from './services/prompt-service';
import { APlutoAlertService, LoadingService, ThemeService } from 'projects/pluto/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  public loadingService = inject(LoadingService);
  public rideService: RideService = inject(RideService);
  public userService: UserService = inject(UserService);
  public promptService = inject(PromptService);
  private alertService = inject(APlutoAlertService);

  public shownNotifications: string[] = [];

  constructor(themeService: ThemeService, activatedRoute: ActivatedRoute) {
    this.loadingService.addTask(new Promise((resolve: any) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }));

    this.rideService.ride$.subscribe(ride => {
      if (!ride) {
        return;
      }
      let notShownNotifications = ride.game.inGameNotifications.filter(n => !this.shownNotifications.includes(n.id));
      for (let notification of notShownNotifications) {
        this.alertService.success(notification.title, notification.description);
        this.shownNotifications.push(notification.id);
      }
    });
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
