import { RegistrationData } from './generated-api/models/RegistrationData';
import { Observable } from 'rxjs';
import { AuthResult } from './generated-api/models/auth-result';
import { LoginCredentials } from './generated-api/models/login-credentials';


export abstract class APlutoAuthApi {
  abstract authRegisterPost$Json(param: { body: RegistrationData }): Observable<AuthResult>;
  abstract authLoginPost$Json(param: { body: LoginCredentials }) : Observable<AuthResult>;
  abstract authResetPasswordPost$Json(param: { body: { password: string; token: string } }): Observable<AuthResult>;
  abstract authRefreshTokenPost$Json(param: { body: any }): Observable<AuthResult>
  abstract authCreatePasswordResetTokenEmailQueryParamsPost(param: { queryParams: string; email: any }): Observable<unknown>;
}


