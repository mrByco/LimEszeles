/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createLobby } from '../fn/lobby/create-lobby';
import { CreateLobby$Params } from '../fn/lobby/create-lobby';
import { joinLobby } from '../fn/lobby/join-lobby';
import { JoinLobby$Params } from '../fn/lobby/join-lobby';
import { leaveLobby } from '../fn/lobby/leave-lobby';
import { LeaveLobby$Params } from '../fn/lobby/leave-lobby';
import { startGame } from '../fn/lobby/start-game';
import { StartGame$Params } from '../fn/lobby/start-game';

@Injectable({ providedIn: 'root' })
export class LobbyApi extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `joinLobby()` */
  static readonly JoinLobbyPath = '/Lobby/join/{lobbyId}/{userName}/{userId}/{connectionToken}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `joinLobby()` instead.
   *
   * This method doesn't expect any request body.
   */
  joinLobby$Response(params: JoinLobby$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return joinLobby(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `joinLobby$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  joinLobby(params: JoinLobby$Params, context?: HttpContext): Observable<void> {
    return this.joinLobby$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `leaveLobby()` */
  static readonly LeaveLobbyPath = '/Lobby/leave/{connectionToken}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `leaveLobby()` instead.
   *
   * This method doesn't expect any request body.
   */
  leaveLobby$Response(params: LeaveLobby$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return leaveLobby(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `leaveLobby$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  leaveLobby(params: LeaveLobby$Params, context?: HttpContext): Observable<void> {
    return this.leaveLobby$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `createLobby()` */
  static readonly CreateLobbyPath = '/Lobby/create/{userName}/{connectionToken}/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createLobby()` instead.
   *
   * This method doesn't expect any request body.
   */
  createLobby$Response(params: CreateLobby$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return createLobby(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createLobby$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createLobby(params: CreateLobby$Params, context?: HttpContext): Observable<void> {
    return this.createLobby$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `startGame()` */
  static readonly StartGamePath = '/Lobby/start-game/{connectionToken}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `startGame()` instead.
   *
   * This method doesn't expect any request body.
   */
  startGame$Response(params: StartGame$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return startGame(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `startGame$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  startGame(params: StartGame$Params, context?: HttpContext): Observable<void> {
    return this.startGame$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
