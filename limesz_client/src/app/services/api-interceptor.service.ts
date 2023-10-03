import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { concat, concatAll, concatMap, filter, from, map, merge, Observable, tap } from 'rxjs';
import { ApiUrl } from '../app.module';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { AuthService as AuthApi } from '../api/services';

@Injectable({
  providedIn: 'root',
})
export class ApiInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(ApiUrl)) {
      return next.handle(req);
    }
    if (req.url.endsWith(AuthApi.AuthRefreshTokenPostPath)) {
      return next.handle(req);
    }

    const tokenizedReq = req.clone({
      headers: req.headers.set('Access-Control-Allow-Origin', '* '),
    });
    let token = this.authService.Token;
    if (!token && this.authService.Authenticated) {
      return from(this.authService.GetValidToken()).pipe(concatMap((x: any) => this.ProcessWithToken(x, req, next)));
    }
    if (token) {
      return this.ProcessWithToken(token, req, next);
    }
    return next.handle(tokenizedReq).pipe(tap(() => { }, (e) => this.handleError(e)));
  }

  private ProcessWithToken(token: string, req: HttpRequest<any>, next: HttpHandler) {
    const tokenizedReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });

    return next.handle(tokenizedReq).pipe(tap(() => { }, (e) => this.handleError(e)));

  }

  private handleError(err: any) {
    if (err instanceof HttpErrorResponse) {
      if (err.status == 403) {
        // Unsiccesful login
        return;
      }
      if (err.status == 0) {
        AlertService.instance?.error("Ellenőrizd az interneted", "Nem lehet kapcsolódni a kiszolgálóhoz");
        return;
      }
      if (err.status !== 401) {
        AlertService.instance?.error("Ismeretlen hiba");
        return;
      }
      if (err.status === 401) {
        AlertService.instance?.error("Nincs jogosultságod ehhez");
      }
    }

  }
}
