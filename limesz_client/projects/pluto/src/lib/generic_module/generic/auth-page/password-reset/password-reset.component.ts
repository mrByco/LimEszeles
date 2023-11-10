import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthPageLayoutComponent } from '../auth-page-layout/auth-page-layout.component';
import { APlutoAuthService } from '../../../../api-providers/a-pluto-auth-service';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {
  newPasswordForm: UntypedFormGroup;
  @ViewChild(AuthPageLayoutComponent) authPageLayout!: AuthPageLayoutComponent;

  passwordsSame = false;

  constructor(fb: FormBuilder, private authService: APlutoAuthService, private activatedRoute: ActivatedRoute) {
    this.newPasswordForm = fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.newPasswordForm.valueChanges.subscribe(() => {
      this.passwordsSame = this.newPasswordForm.value.password == this.newPasswordForm.value.passwordConfirm;
    });

  }

  async makeNewPassword() {
    try {
      let token = this.activatedRoute.snapshot.params.token;
      await this.authService.ResetPassword(this.newPasswordForm.value.password, token);
      this.authPageLayout.redirect();
    }
    catch (e) {
      console.error(e);
    };
  }

}
