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
export class ActionsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation playCard
   */
  static readonly PlayCardPath = '/Actions/play/{userId}/{cardId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `playCard()` instead.
   *
   * This method doesn't expect any request body.
   */
  playCard$Response(params: {
    userId: string;
    cardId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ActionsService.PlayCardPath, 'get');
    if (params) {
      rb.path('userId', params.userId, {});
      rb.path('cardId', params.cardId, {});
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
   * To access the full response (for headers, for example), `playCard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  playCard(params: {
    userId: string;
    cardId: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.playCard$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation pullFromDeck
   */
  static readonly PullFromDeckPath = '/Actions/pull/{userId}/{deckName}/{count}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pullFromDeck()` instead.
   *
   * This method doesn't expect any request body.
   */
  pullFromDeck$Response(params: {
    userId: string;
    deckName: string;
    count: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ActionsService.PullFromDeckPath, 'get');
    if (params) {
      rb.path('userId', params.userId, {});
      rb.path('deckName', params.deckName, {});
      rb.path('count', params.count, {});
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
   * To access the full response (for headers, for example), `pullFromDeck$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pullFromDeck(params: {
    userId: string;
    deckName: string;
    count: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.pullFromDeck$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
