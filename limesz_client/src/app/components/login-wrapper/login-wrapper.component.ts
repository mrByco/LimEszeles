// login-wrapper.component.ts
import {Component, inject} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../api/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-wrapper',
  templateUrl: './login-wrapper.component.html',
  styleUrls: ['./login-wrapper.component.scss'],
})
export class LoginWrapper {
  email: string = '';
  password: string = '';
  user: User | null = null;
  loading = true;

  constructor(private authService: AuthService, private userService: UserService) {
    this.userService.currentUser$.subscribe(user => {
      this.user = user;
      this.loading = false;
    });
  }

  async loginWithEmailPassword() {
    await this.authService.Login(this.email, this.password);
  }

  loginWithGoogle() {
    // not implemented

    console.error('Not implemented');
  }

  loginAnonymously() {
    this.authService.Logout();
  }
}
