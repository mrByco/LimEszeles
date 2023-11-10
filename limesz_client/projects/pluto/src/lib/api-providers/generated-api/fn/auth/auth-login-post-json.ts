/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AuthResult } from '../../models/auth-result';
import { LoginCredentials } from '../../models/login-credentials';

export interface AuthLoginPost$Json$Params {
      body?: LoginCredentials
}

export function authLoginPost$Json(http: HttpClient, rootUrl: string, params?: AuthLoginPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthResult>> {
  const rb = new RequestBuilder(rootUrl, authLoginPost$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AuthResult>;
    })
  );
}

authLoginPost$Json.PATH = '/Auth/login';
