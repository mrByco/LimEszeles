/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface CreateLobby$Params {
  userName: string;
  connectionToken: string;
  userId: string;
}

export function createLobby(http: HttpClient, rootUrl: string, params: CreateLobby$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, createLobby.PATH, 'get');
  if (params) {
    rb.path('userName', params.userName, {});
    rb.path('connectionToken', params.connectionToken, {});
    rb.path('userId', params.userId, {});
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

createLobby.PATH = '/Lobby/create/{userName}/{connectionToken}/{userId}';
