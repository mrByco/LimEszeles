/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class LobbyService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation joinLobby
   */
  static readonly JoinLobbyPath = '/Lobby/join/{lobbyId}/{userName}/{userId}/{connectionToken}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `joinLobby()` instead.
   *
   * This method doesn't expect any request body.
   */
  joinLobby$Response(params: {
    lobbyId: string;
    userName: string;
    userId: string;
    connectionToken: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LobbyService.JoinLobbyPath, 'get');
    if (params) {
      rb.path('lobbyId', params.lobbyId, {});
      rb.path('userName', params.userName, {});
      rb.path('userId', params.userId, {});
      rb.path('connectionToken', params.connectionToken, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `joinLobby$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  joinLobby(params: {
    lobbyId: string;
    userName: string;
    userId: string;
    connectionToken: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.joinLobby$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation leaveLobby
   */
  static readonly LeaveLobbyPath = '/Lobby/leave/{connectionToken}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `leaveLobby()` instead.
   *
   * This method doesn't expect any request body.
   */
  leaveLobby$Response(params: {
    connectionToken: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LobbyService.LeaveLobbyPath, 'get');
    if (params) {
      rb.path('connectionToken', params.connectionToken, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `leaveLobby$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  leaveLobby(params: {
    connectionToken: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.leaveLobby$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation createLobby
   */
  static readonly CreateLobbyPath = '/Lobby/create/{userName}/{connectionToken}/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createLobby()` instead.
   *
   * This method doesn't expect any request body.
   */
  createLobby$Response(params: {
    userName: string;
    connectionToken: string;
    userId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LobbyService.CreateLobbyPath, 'get');
    if (params) {
      rb.path('userName', params.userName, {});
      rb.path('connectionToken', params.connectionToken, {});
      rb.path('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createLobby$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createLobby(params: {
    userName: string;
    connectionToken: string;
    userId: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.createLobby$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
