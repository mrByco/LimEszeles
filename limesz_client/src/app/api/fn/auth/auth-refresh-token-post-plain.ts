/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AuthResult } from '../../models/auth-result';
import { RefreshTokenRequest } from '../../models/refresh-token-request';

export interface AuthRefreshTokenPost$Plain$Params {
      body?: RefreshTokenRequest
}

export function authRefreshTokenPost$Plain(http: HttpClient, rootUrl: string, params?: AuthRefreshTokenPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthResult>> {
  const rb = new RequestBuilder(rootUrl, authRefreshTokenPost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AuthResult>;
    })
  );
}

authRefreshTokenPost$Plain.PATH = '/Auth/refresh-token';
