/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface JoinLobby$Params {
  lobbyId: string;
  userName: string;
  userId: string;
  connectionToken: string;
}

export function joinLobby(http: HttpClient, rootUrl: string, params: JoinLobby$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, joinLobby.PATH, 'get');
  if (params) {
    rb.path('lobbyId', params.lobbyId, {});
    rb.path('userName', params.userName, {});
    rb.path('userId', params.userId, {});
    rb.path('connectionToken', params.connectionToken, {});
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

joinLobby.PATH = '/Lobby/join/{lobbyId}/{userName}/{userId}/{connectionToken}';
