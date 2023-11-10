import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ThemeService } from '../../../../api-providers/default-services/theme.service';

@Component({
  selector: 'app-auth-page-layout',
  templateUrl: './auth-page-layout.component.html',
  styleUrls: ['./auth-page-layout.component.scss']
})
export class AuthPageLayoutComponent {
  private redirectAfterLogin?: string;

  constructor(public themeService: ThemeService, private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.queryParams.subscribe(p => {
      this.redirectAfterLogin = p.redirect;
    });
  }

  async redirect(options: { ignoreInvitLink: boolean } = { ignoreInvitLink: false }) {
    let queryParams = await firstValueFrom(this.activatedRoute.queryParams);

    if (queryParams.inviteCode && !options.ignoreInvitLink) {
      let queryParams = await firstValueFrom(this.activatedRoute.queryParams)
      this.router.navigate(['/invite'], { queryParams: queryParams });
      return;
    }
    this.router.navigate([this.redirectAfterLogin ?? "/"]);
  }

  public async navigateWithKeepQueryParams(route: string[], overrideParams: any = {}) {
    let queryParams = await firstValueFrom(this.activatedRoute.queryParams);
    this.router.navigate(route, { queryParams: { ...queryParams, ...overrideParams } });
  }


}
