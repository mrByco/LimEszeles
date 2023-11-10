import { Component, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PlAuthService } from '../../../../api-providers/default-services/pl-auth.service';
import { AuthPageLayoutComponent } from '../auth-page-layout/auth-page-layout.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm: UntypedFormGroup;
  @ViewChild(AuthPageLayoutComponent) authPageLayout!: AuthPageLayoutComponent;
  hidePassword = true;

  constructor(private authService: PlAuthService, private router: Router, private activatedRoute: ActivatedRoute, fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login = async () => {
    let success = await this.authService.Login(this.loginForm.value.email, this.loginForm.value.password);
    if (!success) return;
    this.authPageLayout.redirect();
  }

}
