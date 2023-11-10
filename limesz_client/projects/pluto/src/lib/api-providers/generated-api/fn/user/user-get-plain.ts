/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserProfileDto } from '../../models/user-profile-dto';

export interface UserGet$Plain$Params {
}

export function userGet$Plain(http: HttpClient, rootUrl: string, params?: UserGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserProfileDto>> {
  const rb = new RequestBuilder(rootUrl, userGet$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserProfileDto>;
    })
  );
}

userGet$Plain.PATH = '/User';
