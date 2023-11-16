import { BehaviorSubject } from 'rxjs';

export abstract class AuthService {
  Authenticated: Boolean;
  Token: string;
  Authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  abstract GetValidToken(): Promise<string>;
  abstract Logout(): Promise<void>;
  abstract ResetPassword(password, token: any): Promise<void>
}
