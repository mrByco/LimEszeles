/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface AuthCreatePasswordResetTokenEmailQueryParamsPost$Params {
  email: string;
  queryParams: string;
}

export function authCreatePasswordResetTokenEmailQueryParamsPost(http: HttpClient, rootUrl: string, params: AuthCreatePasswordResetTokenEmailQueryParamsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, authCreatePasswordResetTokenEmailQueryParamsPost.PATH, 'post');
  if (params) {
    rb.path('email', params.email, {});
    rb.path('queryParams', params.queryParams, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

authCreatePasswordResetTokenEmailQueryParamsPost.PATH = '/Auth/create-password-reset-token/{email}/{queryParams}';
