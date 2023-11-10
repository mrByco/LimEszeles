/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AuthResult } from '../../models/auth-result';
import { RegistrationData } from '../../models/registration-data';

export interface AuthRegisterPost$Plain$Params {
      body?: RegistrationData
}

export function authRegisterPost$Plain(http: HttpClient, rootUrl: string, params?: AuthRegisterPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthResult>> {
  const rb = new RequestBuilder(rootUrl, authRegisterPost$Plain.PATH, 'post');
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

authRegisterPost$Plain.PATH = '/Auth/register';
