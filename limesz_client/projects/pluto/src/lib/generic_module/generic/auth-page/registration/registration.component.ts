import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, RequiredValidator, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PlAuthService } from '../../../../api-providers/default-services/pl-auth.service';
import { AuthPageLayoutComponent } from '../auth-page-layout/auth-page-layout.component';
import { RegistrationData } from '../../../../api-providers/generated-api/models/RegistrationData';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registerFormGroup!: UntypedFormGroup;
  inviteCode?: string = undefined;
  @ViewChild(AuthPageLayoutComponent) authPageLayout!: AuthPageLayoutComponent;
  hidePassword = true;
  hidePasswordAgain = true;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private authService: PlAuthService, private router: Router) {
    this.buildFormGroup();
    this.readAndApplyQueryParams(activatedRoute);
  }


  private async readAndApplyQueryParams(activatedRoute: ActivatedRoute) {
    let params = await firstValueFrom(activatedRoute.queryParams);
    if (params.inviteCode) {
      this.inviteCode = params.inviteCode;
      this.buildFormGroup();
      console.log(params.invitCode)
    }
  }

  private buildFormGroup() {
    this.registerFormGroup = this.fb.group({
      inviteCode: [{ value: this.inviteCode ?? '', disabled: true }],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      termsAccepted: [false, [Validators.requiredTrue]],
      passwords: this.fb.group({
        password: ['', [Validators.required]],
        passwordAgain: ['', [Validators.required]]
      }, { validator: this.passwordConfirming }),
    });
  }

  passwordConfirming(c: AbstractControl): any {
    if (c.get('password')!.value !== c.get('passwordAgain')!.value) {
      return { invalid: true };
    }
  }

  async register() {
    let registerData: RegistrationData = {
      email: this.registerFormGroup.value.email,
      username: this.registerFormGroup.value.name,
      password: this.registerFormGroup.value.passwords.password,
    };

    let success = false;
    if (!this.inviteCode)
      success = await this.authService.Register(registerData);
    else
      success = await this.authService.RegisterInvit(registerData, this.inviteCode);

    if (!success) return;
    this.authPageLayout.redirect();

  }

  passwordsMatch(): boolean {
    if (this.registerFormGroup.get('passwords')?.dirty && this.registerFormGroup.get('passwords')?.touched)
      return this.registerFormGroup.get('passwords')!.errors?.invalid ? false : true;
    return true;
  }
}
