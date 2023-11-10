/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UserCheckPaymentUserIdUserIdGet$Plain$Params {
  userId: string;
}

export function userCheckPaymentUserIdUserIdGet$Plain(http: HttpClient, rootUrl: string, params: UserCheckPaymentUserIdUserIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, userCheckPaymentUserIdUserIdGet$Plain.PATH, 'get');
  if (params) {
    rb.path('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

userCheckPaymentUserIdUserIdGet$Plain.PATH = '/User/check-payment-user-id/{userId}';
