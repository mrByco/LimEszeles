import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthPageLayoutComponent } from '../auth-page-layout/auth-page-layout.component';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { APlutoAuthApi } from '../../../../api-providers/a-pluto-auth-api';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss']
})
export class RequestPasswordResetComponent {
  passwordResetForm: UntypedFormGroup;
  @ViewChild(AuthPageLayoutComponent) authPageLayout!: AuthPageLayoutComponent;
  emailSent = false;

  constructor(fb: FormBuilder, private authService: APlutoAuthApi, private activatedRoute: ActivatedRoute) {
    this.passwordResetForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async passwordReset() {
    try {

      let queryParamsString = "";
      let queryParams = await firstValueFrom(this.activatedRoute.queryParams);

      for (let key in queryParams) {
        let value = queryParams[key];
        if (queryParamsString != "") queryParamsString += "&";
        else queryParamsString += "?";
        queryParamsString += `${key}=${value}`;
      };

      await firstValueFrom(this.authService.authCreatePasswordResetTokenEmailQueryParamsPost({ email: this.passwordResetForm.value.email, queryParams: queryParamsString }));
      this.emailSent = true;
    }
    catch (e) {
      console.error(e);
    };
  }

}
