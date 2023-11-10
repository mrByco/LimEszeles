/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { answerPrompt } from '../fn/actions/answer-prompt';
import { AnswerPrompt$Params } from '../fn/actions/answer-prompt';
import { playCard } from '../fn/actions/play-card';
import { PlayCard$Params } from '../fn/actions/play-card';
import { pullFromDeck } from '../fn/actions/pull-from-deck';
import { PullFromDeck$Params } from '../fn/actions/pull-from-deck';

@Injectable({ providedIn: 'root' })
export class ActionsApi extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `playCard()` */
  static readonly PlayCardPath = '/Actions/play/{userId}/{cardId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `playCard()` instead.
   *
   * This method doesn't expect any request body.
   */
  playCard$Response(params: PlayCard$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return playCard(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `playCard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  playCard(params: PlayCard$Params, context?: HttpContext): Observable<void> {
    return this.playCard$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `pullFromDeck()` */
  static readonly PullFromDeckPath = '/Actions/pull/{userId}/{deckName}/{count}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pullFromDeck()` instead.
   *
   * This method doesn't expect any request body.
   */
  pullFromDeck$Response(params: PullFromDeck$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return pullFromDeck(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `pullFromDeck$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pullFromDeck(params: PullFromDeck$Params, context?: HttpContext): Observable<void> {
    return this.pullFromDeck$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `answerPrompt()` */
  static readonly AnswerPromptPath = '/Actions/answer-prompt/{userId}/{showToken}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `answerPrompt()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  answerPrompt$Response(params: AnswerPrompt$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return answerPrompt(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `answerPrompt$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  answerPrompt(params: AnswerPrompt$Params, context?: HttpContext): Observable<void> {
    return this.answerPrompt$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
