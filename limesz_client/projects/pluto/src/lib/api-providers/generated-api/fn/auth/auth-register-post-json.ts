/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AuthResult } from '../../models/auth-result';
import { RegistrationData } from '../../models/registration-data';

export interface AuthRegisterPost$Json$Params {
      body?: RegistrationData
}

export function authRegisterPost$Json(http: HttpClient, rootUrl: string, params?: AuthRegisterPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthResult>> {
  const rb = new RequestBuilder(rootUrl, authRegisterPost$Json.PATH, 'post');
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

authRegisterPost$Json.PATH = '/Auth/register';
